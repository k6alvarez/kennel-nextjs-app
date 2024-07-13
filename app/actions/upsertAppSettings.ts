"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { AppSetting, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

const validateAppSettings = (body: Partial<AppSetting>) => {
  if (!body.name) {
    throw new Error("Name is required.");
  }
};

export const upsertAppSettings = async (prevState: any, formData: FormData) => {
  const session = await auth();
  const isUserAdmin = (session?.user as User)?.permissions.includes("ADMIN");
  if (!session?.user || !isUserAdmin) return false;

  const rawFormData = Object.fromEntries(formData) as unknown as AppSetting;

  const body = {
    name: rawFormData.name,
    slogan: rawFormData.slogan,
  };

  try {
    validateAppSettings(body);
    const firstAppSetting = await prisma?.appSetting.findFirst();
    const updateOptions = firstAppSetting
      ? { id: firstAppSetting.id }
      : {
          name: body.name,
        };

    await prisma?.appSetting.upsert({
      where: updateOptions,
      update: body,
      create: body,
    });

    revalidatePath("/api/app-settings");

    return {
      statusMessage: {
        message: "Setting updated successfully",
        type: "success",
      },
    };
  } catch (error) {
    console.error("🚀 ~ upsertAppSettings ~ error:", error);
    return {
      statusMessage: {
        message: "An error occurred",
        type: "error",
      },
    };
  }
};
