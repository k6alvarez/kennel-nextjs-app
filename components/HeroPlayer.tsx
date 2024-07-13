import React from "react";
import prisma from "@/lib/prisma";
import { ContentPages } from "@prisma/client";

type HeroPlayerProps = {
  page?: ContentPages;
  promoGroup?: string;
  name?: string;
};

export const HeroPlayer = async ({
  page = "HOME",
  promoGroup = "homeBanner",
  name = "homeBanner",
}: HeroPlayerProps) => {
  const bannerImage = await prisma?.promoItem.findFirst({
    where: {
      page,
      promoGroup,
      name,
    },
  });
  return (
    <div className={`bg-cover bg-center relative py-20 min-h-[40vh]`}>
      {bannerImage?.image && (
        <img
          src={bannerImage.image}
          alt={bannerImage.title || "Banner Image"}
          className="object-cover h-[100%] w-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
};
