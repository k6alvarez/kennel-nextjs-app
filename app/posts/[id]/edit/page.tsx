import prisma from "@/lib/prisma";
import { Content } from "@/components/ui/Content";
import React from "react";
import { auth } from "@/auth";
import { AddPost } from "@/components/posts/AddPost";
import { EditPost } from "@/components/posts/EditPost";
// export const generateMetadata = async () => {
//   try {
//     let appSettings = await prisma?.appSetting.findFirst();
//     let data = appSettings || {
//       name: "Post",
//       slogan: "View all posts",
//     };

//     return {
//       title: `Post | ${data.name}`,
//       description: `View all blog posts from ${data.name}`,
//     };
//   } catch (e) {
//     return {
//       title: `Post | View all posts`,
//       description: `Post from all users`,
//     };
//   }
// };

const EditPostsPage = async ({ params }: { params: { id: string } }) => {
  const post = await prisma?.post.findUnique({
    where: { id: params.id },
  });
  const session = await auth();

  if (!session) {
    return <Content>Access Denied. Please login to continue.</Content>;
  }

  return (
    <Content>
      <h1>Edit Post</h1>
      {post ? <EditPost post={post} /> : <p>Post not found</p>}
    </Content>
  );
};

export default EditPostsPage;
