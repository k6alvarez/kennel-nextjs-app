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

const Training: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Content>
        <h1>Gillette Obedience Training</h1>
        <p>
          Kirk L. Gillette holds a M.A. in Behavioral Psychology from Western
          Michigan University, a diploma from West Virginia Canine College, and
          two certifications from Cornell University Canine Study Program. Mr.
          Gillette, who is a member of the Association for Behavioral Analysis
          and the International Association of Canine Professionals, continues
          to lead the way in conscientious dog training and client education.
        </p>
      </Content>
    </Layout>
  );
};

export default Training;
