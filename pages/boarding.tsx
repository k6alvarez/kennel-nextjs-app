import React, { useContext } from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import { DownOutlined } from "@ant-design/icons";

import Layout from "../components/Layout";
import { PostProps } from "../components/Post";
import { Promo } from "../components/ui-kit/Promo";
import { Content } from "../components/ui-kit/Base";
import { PromoTitle } from "../components/ui-kit/Promo/styles-promo";
import { BoardingHome, TabContent } from "../components/Boarding/BoardingHome";
import BoardingCats from "../components/Boarding/BoardingCats";
import { BeforeBoarding } from "../components/Boarding/BeforeBoarding";
import { BoardingCheckin } from "../components/Boarding/BoardingCheckin";
import { BoardingVaccinations } from "../components/Boarding/BoardingVaccinations";
import { MedicalIssues } from "../components/Boarding/MedicalIssues";
import { Size, useWindowSize } from "../components/ui-kit/hooks/useWindowSize";
import { ThemePreferenceContext } from "./_app";

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

export const headerHt = "47px";

const TabsListWrapper = styled.div`
  position: relative;

  .ant-tabs-nav {
    position: sticky;

    top: 46px;
    background: ${({ theme }) => theme.colors.white};
    width: 100%;
    z-index: 1;
    box-shadow: ${({ theme }) => theme.shadows.light};
  }

  .ant-tabs-nav-wrap {
    justify-content: space-around;
  }
`;

const Boarding: React.FC<Props> = () => {
  const router = useRouter();
  const { tab } = router.query;
  const { breakpoints } = useContext(ThemePreferenceContext);
  const size: Size = useWindowSize();
  const mobileScreen = size.width < parseInt(breakpoints[0]);
  const items = [
    { label: "Boarding", key: "boarding", children: <BoardingHome /> },
    {
      label: "We Board Cats",
      key: "boarding-cats",
      children: <BoardingCats />,
    },
    {
      label: "Before Boarding",
      key: "before-boarding",
      children: <BeforeBoarding />,
    },
    { label: "Checking In", key: "checking-in", children: <BoardingCheckin /> },
    {
      label: "Vaccinations",
      key: "vaccinations",
      children: <BoardingVaccinations />,
    },
    {
      label: "Medical Issues",
      key: "medical-issues",
      children: <MedicalIssues />,
    },
  ];

  return (
    <Layout>
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
      <TabsListWrapper>
        <Tabs
          defaultActiveKey={typeof tab === "string" ? tab : "boarding"}
          tabPosition={"top"}
          size={mobileScreen ? "small" : "large"}
          moreIcon={<DownOutlined />}
          style={{
            fontSize: "inherit",
          }}
          items={items}
        />
      </TabsListWrapper>
    </Layout>
  );
};

export default Boarding;
