import React from "react";
import prisma from "@/lib/prisma";
import { Cards } from "../ui/Cards";
import { CardsWrapper } from "../ui/CardsWrapper";

const PublishedPosts: React.FC = async () => {
  const posts = await prisma?.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <CardsWrapper>
      <Cards items={posts as any} />
    </CardsWrapper>
  );
};

export default PublishedPosts;
