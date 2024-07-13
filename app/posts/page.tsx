import prisma from "@/lib/prisma";
import { Content } from "@/components/ui/Content";
import React from "react";
import { auth } from "@/auth";
import { User } from "@prisma/client";
import { Button, Card } from "antd";
import UnpublishedPosts from "@/components/posts/UnpublishedPosts";
import PublishedPosts from "@/components/posts/PublishedPosts";

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

const PostsPage: React.FC = async () => {
  const session = await auth();
  const isAdmin = (session?.user as User)?.permissions.includes("ADMIN");
  return (
    <Content>
      <h1 className="flex">
        <span className="flex-1 mr-2">Posts</span>
        {isAdmin && (
          <Button href={`/posts/new`} type="primary">
            Add Post
          </Button>
        )}
      </h1>
      <PublishedPosts />

      {isAdmin && (
        <>
          <h1 className="flex mt-8">
            <span className="flex-1 mr-2">Unpublished Posts</span>
          </h1>
          <UnpublishedPosts />
        </>
      )}
    </Content>
  );
};

export default PostsPage;
