import prisma from "@/lib/prisma";
import { Content } from "@/components/ui/Content";
import React from "react";
import { auth } from "@/auth";
import { User } from "@prisma/client";
import { AddPost } from "@/components/posts/AddPost";

export const generateMetadata = async () => {
  try {
    let appSettings = await prisma?.appSetting.findFirst();
    let data = appSettings || {
      name: "Posts",
      slogan: "View all posts",
    };

    return {
      title: `Posts | ${data.name}`,
      description: `View all blog posts from ${data.name}`,
    };
  } catch (e) {
    return {
      title: `Posts | View all posts`,
      description: `Posts from all users`,
    };
  }
};

const CreatePostsPage: React.FC = async () => {
  const session = await auth();

  if (!session?.user) {
    return <Content>You must be logged in to create a post.</Content>;
  }

  return (
    <Content>
      <h1>Create New Post</h1>
      {(session?.user as User)?.permissions.includes("ADMIN") && <AddPost />}
    </Content>
  );
};

export default CreatePostsPage;
