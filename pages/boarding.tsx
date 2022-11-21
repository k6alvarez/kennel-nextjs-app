import React, { useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import { DownOutlined } from "@ant-design/icons";

import Layout from "../components/Layout";
import { Promo } from "../components/ui-kit/Promo";
import { PromoTitle } from "../components/ui-kit/Promo/styles-promo";
import { BoardingHome } from "../components/Boarding/BoardingHome";
import BoardingCats from "../components/Boarding/BoardingCats";
import { BeforeBoarding } from "../components/Boarding/BeforeBoarding";
import { BoardingCheckin } from "../components/Boarding/BoardingCheckin";
import { BoardingVaccinations } from "../components/Boarding/BoardingVaccinations";
import { MedicalIssues } from "../components/Boarding/MedicalIssues";
import { Size, useWindowSize } from "../components/ui-kit/hooks/useWindowSize";
import { ThemePreferenceContext } from "./_app";
import { BoardingServices } from "../components/Boarding/BoardingServices";

export const headerHt = "47px";

export const TabsListWrapper = styled.div`
  position: relative;

  .ant-tabs-nav {
    position: sticky;

    top: 51px;
    background: ${({ theme }) => theme.colors.white};
    width: 100%;
    z-index: 1;
    box-shadow: ${({ theme }) => theme.shadows.light};
  }

  .ant-tabs-nav-wrap {
    justify-content: space-around;
  }
`;

const Boarding: React.FC = () => {
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
    {
      label: "Special Services",
      key: "special-services",
      children: <BoardingServices />,
    },
  ];

  return (
    <Layout>
      <Promo
        title="to keep your dog warm in the winter."
        description="Our facility also has two spacious exercise and play areas."
      >
        <span>
          Inside runs include <PromoTitle>Radient Heat</PromoTitle>,
        </span>{" "}
      </Promo>
      <TabsListWrapper>
        <Tabs
          defaultActiveKey="boarding"
          activeKey={typeof tab === "string" ? tab : "boarding"}
          tabPosition={"top"}
          size={mobileScreen ? "small" : "large"}
          moreIcon={<DownOutlined />}
          style={{
            fontSize: "inherit",
          }}
          items={items}
          onTabClick={(key) => {
            router.replace(`/boarding?tab=${key}`, undefined, {
              shallow: true,
            });
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </TabsListWrapper>
    </Layout>
  );
};

export default Boarding;
