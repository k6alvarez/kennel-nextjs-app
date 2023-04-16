import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import { GetServerSideProps } from "next";
import { DownOutlined } from "@ant-design/icons";
import prisma from "../lib/prisma";

import Layout from "../components/Layout";
import { Promo } from "../components/ui-kit/Promo";
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
    z-index: 500;
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

  const [boardingHome, setBoardingHome] = useState(
    parsedContentItems.find((item) => item.name === "boardingHome")
  );

  const [boardingCats, setBoardingCats] = useState(
    parsedContentItems.find((item) => item.name === "boardingCats")
  );

  const [boardingBefore, setBoardingBefore] = useState(
    parsedContentItems.find((item) => item.name === "boardingBefore")
  );

  const [boardingCheckin, setBoardingCheckin] = useState(
    parsedContentItems.find((item) => item.name === "boardingCheckin")
  );

  const [boardingVaccinations, setBoardingVaccinations] = useState(
    parsedContentItems.find((item) => item.name === "boardingVaccinations")
  );

  const [boardingMedicalIssues, setBoardingMedicalIssues] = useState(
    parsedContentItems.find((item) => item.name === "boardingMedicalIssues")
  );

  const [boardingServices, setBoardingServices] = useState(
    parsedContentItems.find((item) => item.name === "boardingServices")
  );

  const [boardingCWing, setBoardingCWing] = useState(
    parsedContentItems.find((item) => item.name === "boardingCWing")
  );

  const [boardingPromos, setBoardingPromos] = useState(
    parsedPromoItems.filter((item) => item.promoGroup === "gallery")
  );

  const [boardingPromoTitle, setBoardingPromoTitle] = useState(
    parsedContentItems.find((item) => item.name === "boardingPromoTitle")
  );

  const stickyEditorPosTop = "108px";

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
      label: "Dog Boarding",
      key: "boarding",
      children: (
        <BoardingHome
          editorStickyTop={stickyEditorPosTop}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={boardingHome}
          setContent={setBoardingHome}
          secondaryContent={boardingCWing}
          setSecondaryContent={setBoardingCWing}
          editMode={editMode}
        />
      ),
    },
    {
      label: "Cat Boarding",
      key: "boarding-cats",
      children: (
        <BoardingCats
          editorStickyTop={stickyEditorPosTop}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={boardingCats}
          setContent={setBoardingCats}
          editMode={editMode}
        />
      ),
    },
    {
      label: "Before Boarding",
      key: "before-boarding",
      children: (
        <BeforeBoarding
          editorStickyTop={stickyEditorPosTop}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={boardingBefore}
          setContent={setBoardingBefore}
          editMode={editMode}
        />
      ),
    },
    {
      label: "Checking In",
      key: "checking-in",
      children: (
        <BoardingCheckin
          editorStickyTop={stickyEditorPosTop}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={boardingCheckin}
          setContent={setBoardingCheckin}
          editMode={editMode}
        />
      ),
    },
    {
      label: "Vaccinations",
      key: "vaccinations",
      children: (
        <BoardingVaccinations
          editorStickyTop={stickyEditorPosTop}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={boardingVaccinations}
          setContent={setBoardingVaccinations}
          editMode={editMode}
        />
      ),
    },
    {
      label: "Medical Issues",
      key: "medical-issues",
      children: (
        <MedicalIssues
          editorStickyTop={stickyEditorPosTop}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={boardingMedicalIssues}
          setContent={setBoardingMedicalIssues}
          editMode={editMode}
        />
      ),
    },
    {
      label: "Special Services",
      key: "special-services",
      children: (
        <BoardingServices
          editorStickyTop={stickyEditorPosTop}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={boardingServices}
          setContent={setBoardingServices}
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
        setPromos={setBoardingPromos}
        contentItem={boardingPromoTitle || { content: "" }}
        setContentItem={setBoardingPromoTitle}
        sliderMode
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
