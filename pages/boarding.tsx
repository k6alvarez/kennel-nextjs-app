import React from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";

import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import { Promo } from "../components/ui-kit/Promo";
import { Content, GridItem, GridItems } from "../components/ui-kit/Base";
import { PromoTitle } from "../components/ui-kit/Promo/styles-promo";

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

const Boarding: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Content>
        <h1>Boarding</h1>
        <p>
          We constructed our modern boarding facility in 1998 to fill a need
          made evident by an overwhelming number of requests from clients who
          attended our obedience training classes. The facility, centrally
          located between Kalamazoo and Battle Creek, provides a serene country
          atmosphere while remaining close, convenient, and easy to access.
        </p>
        <h2>Main Kennel</h2>
        <p>
          All kennel runs contain both inside and outside areas. The inside is
          heated to keep your dog warm in the winter and air-conditioned for the
          hot summer days. The boarding kennel contains three size runs to
          accommodate both large and small breeds. The giant runs are 5 x 6
          inside and 5 x 15 outside. The large runs are 4 x 6 inside and 4 x 15
          outside. The small runs are 3 x 6 inside and 3 x 15 outside. Dogs have
          free access to the inside and outside areas from early morning to late
          evening (weather permitting). The runs are seperated by galvanized
          steel panels on the inside and outside to prevent cross contamination.
          The outside runs are also covered to keep dogs dry when it rains while
          providing access to fresh air and the inside runs include in floor
          radiant heat.
        </p>
      </Content>
      <Promo
        promos={[
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585006907/gk-app/gkplays.jpg",
            title: "",
            description: "",
          },
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585005807/gk-app/gkrun.jpg",
            title: "",
            description: "",
          },
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585005125/gk-app/gk_home_01.jpg",
            title: "",
            description: "",
          },
        ]}
        title="to keep your dog warm in the winter."
        description="Our facility also has two spacious exercise and play areas."
      >
        <span>
          Inside runs include <PromoTitle>Radient Heat</PromoTitle>,
        </span>{" "}
      </Promo>
      <Content>
        <h2>C-Wing: Our Original Kennel (Updated 2020)</h2>
        <p>
          C-Wing is not connected to our main facility. After check-in our staff
          will walk pets over to their run and bring along their belongings.
        </p>
        <p>
          Runs in our C-Wing kennel contain both inside and outside areas. The
          inside is heated to keep your dog warm in the winter and
          air-conditioned for the hot summer days. The boarding kennel contains
          two size runs to accommodate both large and small breeds. The large
          runs are 4 x 4.5 inside and 4 x 15 outside. The small runs are 3 x 4.5
          inside and 3 x 15 outside. Dogs have free access to the inside and
          outside areas from early morning to late evening (weather permitting).
        </p>
        <p>
          Three-foot high four-inch block walls and chain link fencing separate
          each individual inside area. Chain link fencing that sits on a curb to
          prevent cross contamination during cleaning and disinfecting separates
          the outside runs. The outside runs are also covered to keep dogs dry
          when it rains while providing access to fresh air. This kennel is used
          as our overflow kennel.
        </p>
        <h2>More Info</h2>
        <p>
          Our facility also has two spacious exercise and play areas surfaced
          with pea stones. Pea stones are an ideal surface for exercise areas
          because they are easy on dogs’ paws yet enable us to maintain a
          sanitary facility. Clients who want extra special attention given to
          their companions can take advantage of the Special Services that we
          offer.
        </p>
        <p>
          We adhere the highest standards of canine care. Our facility is
          cleaned and disinfected daily and all dogs are treated with kindness
          and respect. We are proud of the excellent reputation that our kennel
          has gained and invite you to call for a tour today.
        </p>
        <GridItems as="div">
          <div>
            <p>Vaccinatons</p>
            <GridItem
              as="div"
              size="25vw"
              img="https://res.cloudinary.com/dhcv2fdfq/image/upload/c_scale,h_450/v1585006544/gk-app/gktwopups.jpg"
            ></GridItem>
          </div>
          <div>
            <p>We board cats!</p>
            <GridItem
              as="div"
              size="25vw"
              img="https://res.cloudinary.com/dhcv2fdfq/image/upload/c_scale,h_450/v1585006782/gk-app/catsgk.jpg"
            ></GridItem>
          </div>
          <div>
            <p>Before you board</p>
            <GridItem
              as="div"
              size="25vw"
              img="https://res.cloudinary.com/dhcv2fdfq/image/upload/c_scale,h_450/v1585007798/gk-app/sierragk.jpg"
            ></GridItem>
          </div>
        </GridItems>
      </Content>
    </Layout>
  );
};

export default Boarding;
