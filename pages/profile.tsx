import React from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";

import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import { Promo } from "../components/ui-kit/Promo";
import { Content, GridItem, GridItems } from "../components/ui-kit/Base";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Profile: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Content>
        <h1>My Profile</h1>
      </Content>
    </Layout>
  );
};

export default Profile;
