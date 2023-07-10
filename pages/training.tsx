import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";

import Layout from "../components/Layout";
import { Promo } from "../components/ui-kit/Promo";
import { TABS_HEADER_HEIGHT, TabsListWrapper } from "./boarding";
import { TrainingHome } from "../components/Training/TrainingHome";
import { GroupLessons } from "../components/Training/GroupLessons";
import { PrivateLessons } from "../components/Training/PrivateLessons";
import { AgilityLessons } from "../components/Training/AgilityLessons";
import { Consultations } from "../components/Training/Consultations";
import { BoardingSchool } from "../components/Training/BoardingSchool";
import { ThemePreferenceContext } from "./_app";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const page = "TRAINING";
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

const Training = ({ contentItems, promoItems }) => {
  const router = useRouter();
  const { editMode } = useContext(ThemePreferenceContext);
  const { tab } = router.query;
  const ref = useRef(null);
  const [activeKey, setActiveKey] = useState("training");

  const [isLoading, setIsLoading] = useState(false);
  const parsedContentItems = JSON.parse(contentItems);

  const parsedPromoItems = JSON.parse(promoItems);

  const [boardingBanner, setBoardingBanner] = useState([
    parsedPromoItems.find((item) => item.name === "trainingBanner"),
  ]);

  const [trainingPromoTitle, setTrainingPromoTitle] = useState(
    parsedContentItems.find((item) => item.name === "trainingPromoTitle") || {
      content: "",
    }
  );

  const [trainingContent, setTrainingContent] = useState(
    parsedContentItems.find((item) => item.name === "trainingContent")
  );

  const [trainingGroupLessons, setTrainingGroupLessons] = useState(
    parsedContentItems.find((item) => item.name === "trainingGroupLessons")
  );

  const [trainingBoardingSchool, setTrainingBoardingSchool] = useState(
    parsedContentItems.find((item) => item.name === "trainingBoardingSchool")
  );

  const [trainingPrivateLessons, setTrainingPrivateLessons] = useState(
    parsedContentItems.find((item) => item.name === "trainingPrivateLessons")
  );

  const [trainingAgilityLessons, setTrainingAgilityLessons] = useState(
    parsedContentItems.find((item) => item.name === "trainingAgilityLessons")
  );

  const [trainingConsultations, setTrainingConsultations] = useState(
    parsedContentItems.find((item) => item.name === "trainingConsultations")
  );

  const stickyEditorPosTop = "108px";

  useEffect(() => {
    if (tab) {
      window.scrollTo({
        top: ref.current.offsetTop - TABS_HEADER_HEIGHT,
        behavior: "smooth",
      });
      setActiveKey(tab as string);
    }
  }, [tab]);

  const [classesPrimary, setClassesPrimary] = useState(
    parsedPromoItems.filter((item) => item.promoGroup === "classesPrimary")
  );

  const [classesSecondary, setClassesSecondary] = useState(
    parsedPromoItems.filter((item) => item.promoGroup === "classesSecondary")
  );

  const items = [
    {
      label: "Training",
      key: "training",
      children: (
        <TrainingHome
          editorStickyTop={stickyEditorPosTop}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={trainingContent}
          setContent={setTrainingContent}
          editMode={editMode}
          classesPrimary={classesPrimary}
          setClassesPrimary={setClassesPrimary}
          classesSecondary={classesSecondary}
          setClassesSecondary={setClassesSecondary}
        />
      ),
    },
    {
      label: "Group Lessons",
      key: "group-lessons",
      children: (
        <GroupLessons
          editorStickyTop={stickyEditorPosTop}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={trainingGroupLessons}
          setContent={setTrainingGroupLessons}
          editMode={editMode}
        />
      ),
    },
    {
      label: "Boarding School",
      key: "boarding-school",
      children: (
        <BoardingSchool
          editorStickyTop={stickyEditorPosTop}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={trainingBoardingSchool}
          setContent={setTrainingBoardingSchool}
          editMode={editMode}
        />
      ),
    },
    {
      label: "Private Lessons",
      key: "private-lessons",
      children: (
        <PrivateLessons
          editorStickyTop={stickyEditorPosTop}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={trainingPrivateLessons}
          setContent={setTrainingPrivateLessons}
          editMode={editMode}
        />
      ),
    },
    {
      label: "Agility",
      key: "agility",
      children: (
        <AgilityLessons
          editorStickyTop={stickyEditorPosTop}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={trainingAgilityLessons}
          setContent={setTrainingAgilityLessons}
          editMode={editMode}
        />
      ),
    },
    {
      label: "Consultations",
      key: "consultations",
      children: (
        <Consultations
          editorStickyTop={stickyEditorPosTop}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          content={trainingConsultations}
          setContent={setTrainingConsultations}
          editMode={editMode}
        />
      ),
    },
  ];
  return (
    <Layout>
      <Promo
        animate={false}
        promos={boardingBanner}
        setPromos={setBoardingBanner}
        bannerMode
      />
      <Promo
        animate={false}
        contentItem={trainingPromoTitle}
        setContentItem={setTrainingPromoTitle}
        bannerMode
      />
      <TabsListWrapper ref={ref}>
        <Tabs
          defaultActiveKey="training"
          activeKey={activeKey}
          tabPosition="top"
          size="large"
          style={{
            fontSize: "inherit",
          }}
          items={items}
          onTabClick={(key) => {
            router.replace(`/training?tab=${key}`, undefined, {
              shallow: true,
            });
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </TabsListWrapper>
    </Layout>
  );
};

export default Training;
