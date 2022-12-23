import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import { GetServerSideProps } from "next";
import { DownOutlined } from "@ant-design/icons";
import prisma from "../lib/prisma";

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
import { useLocalStorage } from "../components/ui-kit/hooks/useLocalStorage";
import { isTimeStampExpired } from "../components/Admin/services";

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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const page = "BOARDING";
  const contentItems = await prisma.contentItem.findMany({
    where: {
      page,
    },
  });

  const promoItems = await prisma.promoItem.findMany({
    where: {
      page,
    },
  });

  return {
    props: {
      contentItems: JSON.stringify(contentItems),
      promoItems: JSON.stringify(promoItems),
    },
  };
};

const Boarding = ({ contentItems, promoItems }) => {
  const router = useRouter();
  const { tab } = router.query;
  const { breakpoints, editMode } = useContext(ThemePreferenceContext);
  const size: Size = useWindowSize();
  const mobileScreen = size.width < parseInt(breakpoints[0]);
  const [expiry, setExpiry] = useLocalStorage<number>(
    "boardingPageAnimate",
    null
  );
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const parsedContentItems = JSON.parse(contentItems);
  const parsedPromoItems = JSON.parse(promoItems);

  const boardingHome = parsedContentItems.find(
    (item) => item.name === "boardingHome"
  );

  const boardingCats = parsedContentItems.find(
    (item) => item.name === "boardingCats"
  );

  const boardingBefore = parsedContentItems.find(
    (item) => item.name === "boardingBefore"
  );

  const boardingCheckin = parsedContentItems.find(
    (item) => item.name === "boardingCheckin"
  );

  const boardingVaccinations = parsedContentItems.find(
    (item) => item.name === "boardingVaccinations"
  );

  const boardingMedicalIssues = parsedContentItems.find(
    (item) => item.name === "boardingMedicalIssues"
  );

  const boardingServices = parsedContentItems.find(
    (item) => item.name === "boardingServices"
  );

  const boardingCWing = parsedContentItems.find(
    (item) => item.name === "boardingCWing"
  );
  const boardingPromos = parsedPromoItems.filter(
    (item) => item.promoGroup === "gallery"
  );
  const boardingPromoTitle = parsedContentItems.find(
    (item) => item.name === "boardingPromoTitle"
  );

  useEffect(() => {
    if (isTimeStampExpired(expiry)) {
      // set expiry to 24 hours from now
      setExpiry(new Date().getTime() + 24 * 60 * 60 * 1000);
      setShouldAnimate(true);
    }
  }, []);

  const [activeKey, setActiveKey] = useState("boarding");
  useEffect(() => {
    if (tab) {
      window.scrollTo({ top: 779, behavior: "smooth" });
      setActiveKey(tab as string);
    }
  }, [tab]);

  const items = [
    {
      label: "Boarding",
      key: "boarding",
      children: (
        <BoardingHome
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={boardingHome}
          secondaryContent={boardingCWing}
          editMode={editMode}
        />
      ),
    },
    {
      label: "We Board Cats",
      key: "boarding-cats",
      children: (
        <BoardingCats
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={boardingCats}
          editMode={editMode}
        />
      ),
    },
    {
      label: "Before Boarding",
      key: "before-boarding",
      children: (
        <BeforeBoarding
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={boardingBefore}
          editMode={editMode}
        />
      ),
    },
    {
      label: "Checking In",
      key: "checking-in",
      children: (
        <BoardingCheckin
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={boardingCheckin}
          editMode={editMode}
        />
      ),
    },
    {
      label: "Vaccinations",
      key: "vaccinations",
      children: (
        <BoardingVaccinations
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={boardingVaccinations}
          editMode={editMode}
        />
      ),
    },
    {
      label: "Medical Issues",
      key: "medical-issues",
      children: (
        <MedicalIssues
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={boardingMedicalIssues}
          editMode={editMode}
        />
      ),
    },
    {
      label: "Special Services",
      key: "special-services",
      children: (
        <BoardingServices
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={boardingServices}
          editMode={editMode}
        />
      ),
    },
  ];

  return (
    <Layout>
      <Promo
        animate={shouldAnimate}
        showFooter
        promos={boardingPromos}
        contentItem={boardingPromoTitle || { content: "" }}
      />
      <TabsListWrapper>
        <Tabs
          defaultActiveKey="boarding"
          activeKey={activeKey}
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
            window.scrollTo({ top: 779, behavior: "smooth" });
          }}
        />
      </TabsListWrapper>
    </Layout>
  );
};

export default Boarding;
