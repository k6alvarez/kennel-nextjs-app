import { Post } from "@prisma/client";

export const validatePostData = (body: Partial<Post>) => {
  if (!body.title) {
    throw new Error("Title is required.");
  }
};
