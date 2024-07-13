import React from "react";
import prisma from "@/lib/prisma";
import { Cards } from "../ui/Cards";
import { CardsWrapper } from "../ui/CardsWrapper";

const UnpublishedPosts: React.FC = async () => {
  const unpublishedPosts = await prisma?.post.findMany({
    where: { published: false },
    orderBy: { createdAt: "desc" },
  });
  return (
    <CardsWrapper>
      <Cards items={unpublishedPosts} />
    </CardsWrapper>
  );
};

export default UnpublishedPosts;
