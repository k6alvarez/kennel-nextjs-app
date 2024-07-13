"use server";
import { auth } from "@/auth";
import { validatePostData } from "@/components/posts/validatePostsData";
import prisma from "@/lib/prisma";
import { Post, User } from "@prisma/client";

export const createUnpublishedPost = async (
  prevState: any,
  formData: FormData
) => {
  const session = await auth();
  const isUserAdmin = (session?.user as User)?.permissions.includes("ADMIN");
  if (!session?.user || !isUserAdmin) return false;

  const rawFormData = Object.fromEntries(formData) as unknown as Post;

  const body = {
    title: rawFormData.title,
    content: rawFormData.content,
  };

  try {
    validatePostData(body);

    const response = await prisma?.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: (session?.user as User).id,
      },
    });

    if (!response) {
      return {
        statusMessage: {
          message: "An error occurred",
          type: "error",
        },
      };
    }

    return {
      statusMessage: {
        message: `Post created, let's add some content`,
        type: "success",
        redirect: `/posts/${response.id}/edit`,
      },
    };
  } catch (error) {
    console.error("🚀 ~ error:", error);
    return {
      statusMessage: {
        message: "An error occurred",
        type: "error",
      },
    };
  }
};
