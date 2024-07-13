import React from "react";
import prisma from "@/lib/prisma";
import { ContentPages, ContentSections, User } from "@prisma/client";
import { auth } from "@/auth";
import { UpsertContentItem } from "../forms/UpsertContentItem";
import Head from "next/head";

interface ContentItemProps {
  page: ContentPages;
  section?: ContentSections;
  name?: string;
  contentStyles?: string;
}

const ContentItem: React.FC<ContentItemProps> = async ({
  page = "HOME",
  section = "MAIN",
  name = "homePromoTitle",
  contentStyles = "",
}) => {
  const session = await auth();
  const isAdmin = (session?.user as User)?.permissions.includes("ADMIN");
  const contentItem = await prisma?.contentItem.findFirst({
    where: {
      page,
      section,
      name,
    },
  });
  return (
    <>
      {contentItem && (
        <div
          className={contentStyles}
          dangerouslySetInnerHTML={{ __html: contentItem.content }}
        ></div>
      )}
      {isAdmin && (
        <UpsertContentItem
          contentItem={contentItem}
          page={page}
          section={section}
          name={name}
        />
      )}
    </>
  );
};

export default ContentItem;
