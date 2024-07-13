import React from "react";
import prisma from "@/lib/prisma";
import { CardsWrapper } from "../ui/CardsWrapper";
import { Card } from "antd";
import Link from "next/link";
import Image from "next/image";

const PromoLinks: React.FC = async () => {
  const promos = await prisma?.promoItem.findMany({
    where: {
      page: "HOME",
      promoGroup: "callouts",
    },
  });
  return (
    <CardsWrapper classesOverride="grid grid-cols-1 md:grid-cols-2 gap-6">
      {promos.map((promo) => (
        <div key={promo.id}>
          {promo.link ? (
            <Link href={promo.link}>
              <Card
                hoverable
                cover={
                  <img
                    className="object-cover w-full h-48 md:h-64"
                    alt={promo.title ?? "Promo Image"}
                    src={
                      promo.image ??
                      "https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                    }
                  />
                }
              >
                <div className="bg-primary text-white p-4 w-full text-center rounded-b-md">
                  <h3>{promo.title}</h3>
                  <p className="text-base">{promo.description}</p>
                </div>
              </Card>
            </Link>
          ) : (
            <Card
              key={promo.id}
              title={promo.title}
              cover={
                <Image
                  alt={promo.title ?? "Promo Image"}
                  src={promo.image ?? "/placeholder.jpg"}
                  fill={true}
                  sizes="300px"
                />
              }
            >
              <p className="text-base">{promo.description}</p>
            </Card>
          )}
        </div>
      ))}
    </CardsWrapper>
  );
};

export default PromoLinks;
