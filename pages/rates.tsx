import React, { useContext, useState } from "react";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

import Layout from "../components/Layout";
import { Content } from "../components/ui-kit/Base";
import {
  rateDogRoommate,
  rateLglRun,
  rateSmRun,
} from "../components/Boarding/BoardingRates";

import { Card } from "antd";
import { FlexCards } from "../components/Boarding/styles";
import { HolidayPremiumDatesList } from "../components/Admin/HolidayPremiumDatesList";
import { HolidayPremiumDates } from "@prisma/client";
import { ThemePreferenceContext } from "./_app";
import { saveContent } from "../components/Admin/services";
import { EditForm } from "../components/Forms/styles";
import { Tiptap } from "../components/ui-kit/Tiptap";
import { RunSizes } from "../components/Boarding/RunSizes";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const dates = await prisma.holidayPremiumDates.findMany();
  const page = "RATES";
  const contentItems = await prisma.contentItem.findMany({
    where: {
      page,
    },
  });

  return {
    props: {
      dates: JSON.parse(JSON.stringify(dates)),
      revalidate: 10,
      contentItems: JSON.stringify(contentItems),
    },
  };
};

type Props = {
  dates: HolidayPremiumDates[];
  contentItems: string;
};

const Rates: React.FC<Props> = ({ dates, contentItems }) => {
  const parsedContentItems = JSON.parse(contentItems);
  const { editMode } = useContext(ThemePreferenceContext);
  const [isLoading, setIsLoading] = useState(false);

  const [ratesContent, setRatesContent] = useState(
    parsedContentItems.find((item) => item.name === "ratesContent")
  );

  const [ratesHolidayContent, setRatesHolidayContent] = useState(
    parsedContentItems.find((item) => item.name === "ratesHolidayContent")
  );

  const [ratesDiscountContent, setRatesDiscountContent] = useState(
    parsedContentItems.find((item) => item.name === "ratesDiscountContent")
  );

  const [ratesAdditionalContent, setRatesAdditionalContent] = useState(
    parsedContentItems.find((item) => item.name === "ratesAdditionalContent")
  );
  return (
    <Layout>
      <Content>
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={ratesContent?.content || { content: "" }}
              onSave={(html) => {
                setRatesContent({ content: html });
                saveContent({
                  apiPath: `/api/content-item/${ratesContent.id}`,
                  payload: { content: html },
                  setLoading: setIsLoading,
                });
              }}
              isLoading={isLoading}
            />
          </EditForm>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: ratesContent?.content }} />
        )}
        <RunSizes />
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={ratesHolidayContent?.content || { content: "" }}
              onSave={(html) => {
                setRatesHolidayContent({ content: html });
                saveContent({
                  apiPath: `/api/content-item/${ratesHolidayContent.id}`,
                  payload: { content: html },
                  setLoading: setIsLoading,
                });
              }}
              isLoading={isLoading}
            />
          </EditForm>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: ratesHolidayContent?.content }}
          />
        )}

        <HolidayPremiumDatesList holidayPremiumDates={dates} />

        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={ratesDiscountContent?.content || { content: "" }}
              onSave={(html) => {
                setRatesDiscountContent({ content: html });
                saveContent({
                  apiPath: `/api/content-item/${ratesDiscountContent.id}`,
                  payload: { content: html },
                  setLoading: setIsLoading,
                });
              }}
              isLoading={isLoading}
            />
          </EditForm>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: ratesDiscountContent?.content }}
          />
        )}

        <FlexCards>
          <Card>
            <p>Large run used to house three small dogs</p>
            <p>
              $
              {(
                parseInt(rateLglRun) +
                parseInt(rateDogRoommate) +
                parseInt(rateDogRoommate)
              ).toFixed(2)}{" "}
              per day <br />${rateLglRun} + ${rateDogRoommate} + $
              {rateDogRoommate}
            </p>
          </Card>
          <Card>
            <p>A small run used to house three small dogs</p>
            <p>
              $
              {(
                parseInt(rateSmRun) +
                parseInt(rateDogRoommate) +
                parseInt(rateDogRoommate)
              ).toFixed(2)}{" "}
              per day <br />${rateSmRun} + ${rateDogRoommate} + $
              {rateDogRoommate}
            </p>
          </Card>
          <Card>
            <p>A large run used to house two large dogs</p>
            <p>
              $ {(parseInt(rateSmRun) + parseInt(rateDogRoommate)).toFixed(2)}{" "}
              per day <br /> ${rateLglRun} + ${rateDogRoommate}
            </p>
          </Card>
        </FlexCards>

        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={ratesAdditionalContent?.content || { content: "" }}
              onSave={(html) => {
                setRatesAdditionalContent({ content: html });
                saveContent({
                  apiPath: `/api/content-item/${ratesAdditionalContent.id}`,
                  payload: { content: html },
                  setLoading: setIsLoading,
                });
              }}
              isLoading={isLoading}
            />
          </EditForm>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: ratesAdditionalContent?.content,
            }}
          />
        )}
      </Content>
    </Layout>
  );
};

export default Rates;
