import prisma from "@/lib/prisma";
import { Content } from "@/components/ui/Content";
import React from "react";
import { auth } from "@/auth";
import { Button, Tag } from "antd";
import { User } from "@prisma/client";

type PostPageProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  try {
    let post = await prisma?.post.findUnique({
      where: { id: params.id },
      include: { author: true },
    });
    let data = post || {
      title: "Post",
      slogan: "View post details",
    };

    return {
      title: `${data.title}`,
      description: `View post details`,
    };
  } catch (e) {
    return {
      title: `Post`,
      description: `View post details`,
    };
  }
};

const PostsPage: React.FC<PostPageProps> = async ({
  params,
}: {
  params: { id: string };
}) => {
  const session = await auth();
  const isAdmin = (session?.user as User)?.permissions.includes("ADMIN");
  const post = await prisma?.post.findUnique({
    where: { id: params.id },
  });
  if (!post) {
    return <Content>Post not found</Content>;
  }

  const postDate = (date: Date) =>
    new Date(date).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  return (
    <Content>
      <h1 className="flex items-center">
        <span className="flex-1 mr-2">{post?.title}</span>
        {isAdmin && (
          <Button href={`/posts/${post.id}/edit`} type="primary">
            Edit Post
          </Button>
        )}
      </h1>
      <p className="flex w-full justify-between">
        <span>Created on {postDate(post.createdAt)}</span>
        <span>Updated on {postDate(post.updatedAt)}</span>
      </p>
      {post.content && (
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      )}
    </Content>
  );
};

export default PostsPage;
