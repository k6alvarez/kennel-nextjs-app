import { Card } from "antd";
import Link from "next/link";
import React from "react";

interface Props {
  items: any[];
}

export const Cards: React.FC<Props> = ({ items }) => {
  if (!items.length) {
    return <p>No items found</p>;
  }

  return (
    <>
      {items.map((item) => (
        <Card key={item.id}>
          <Link href={`/posts/${item.id}`}>
            <h2 className="text-nowrap">{item.title}</h2>
            <p>
              {new Date(item.createdAt).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </Link>
        </Card>
      ))}
    </>
  );
};
