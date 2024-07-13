"use server";
import { auth } from "@/auth";
import { validatePostData } from "@/components/posts/validatePostsData";
import prisma from "@/lib/prisma";
import { Post, User } from "@prisma/client";

export const editPost = async (prevState: any, formData: FormData) => {
  const session = await auth();
  const isUserAdmin = (session?.user as User)?.permissions.includes("ADMIN");
  if (!session?.user || !isUserAdmin) return false;

  const rawFormData = Object.fromEntries(formData);

  const body = {
    title: rawFormData.title as string,
    content: rawFormData.content as string,
    published: (rawFormData.published === "true") as boolean,
  };

  try {
    validatePostData(body);

    const response = await prisma?.post.update({
      where: { id: prevState.id },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        createdAt: body.published ? new Date() : prevState.createdAt,
      },
    });

    return {
      statusMessage: {
        message: "Post updated successfully",
        type: "success",
        redirect: `/posts/${response.id}`,
      },
    };
  } catch (error) {
    return {
      statusMessage: {
        message: (error as Error).message || "An error occurred.",
        type: "error",
      },
    };
  }
};
