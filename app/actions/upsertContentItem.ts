"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { ContentItem, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

const validateContentItem = (body: Partial<ContentItem>) => {
  if (!body.page) {
    throw new Error("Page is required.");
  }

  if (!body.section) {
    throw new Error("Section is required.");
  }

  if (!body.content) {
    throw new Error("Content is required.");
  }
};

export const upsertContentItem = async (prevState: any, formData: FormData) => {
  const session = await auth();
  const isUserAdmin = (session?.user as User)?.permissions.includes("ADMIN");
  if (!session?.user || !isUserAdmin) return false;

  const rawFormData = Object.fromEntries(formData) as unknown as ContentItem;

  const body = {
    page: rawFormData.page,
    section: rawFormData.section,
    content: rawFormData.content,
    name: rawFormData.name,
  };

  try {
    validateContentItem(body);

    let updatedItem: ContentItem | null = null;
    if (prevState.id) {
      updatedItem = await prisma?.contentItem.update({
        where: { id: prevState.id },
        data: body,
      });
    } else {
      updatedItem = await prisma?.contentItem.create({
        data: body,
      });
    }

    revalidatePath("/");

    return {
      ...updatedItem,
      statusMessage: {
        message: "Content updated successfully",
        type: "success",
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusMessage: {
        message: "An error occurred",
        type: "error",
      },
    };
  }
};
