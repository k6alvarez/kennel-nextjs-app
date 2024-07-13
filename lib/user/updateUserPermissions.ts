import prisma from "@/lib/prisma";
import { Permission } from "@prisma/client";

export const updateUserPermissions = async (
  userId: string,
  permissions: Permission[]
) => {
  try {
    await prisma?.user.update({
      where: {
        id: userId,
      },
      data: {
        permissions: {
          set: permissions,
        },
      },
    });
  } catch (error) {
    console.error("🚀 ~ error:", error);
  }
};
