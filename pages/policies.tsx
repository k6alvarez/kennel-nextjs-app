import React, { useContext, useEffect, useState } from "react";
import { Collapse, Image } from "antd";

import Layout from "../components/Layout";
import { PostProps } from "../components/Post";
import { Content } from "../components/ui-kit/Base";
import { BlockQuote } from "../components/Reservations/GuestClients/FormIntro";

import { useRouter } from "next/router";
import Link from "next/link";
import { InfoCircleOutlined } from "@ant-design/icons";
import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";
import { ContentItem } from "@prisma/client";
import { saveContent } from "../components/Admin/services";
import { EditForm } from "../components/Forms/styles";
import { Tiptap } from "../components/ui-kit/Tiptap";
import { ThemePreferenceContext } from "./_app";
import { defaultContent } from ".";

const { Panel } = Collapse;

type Props = {
  feed: PostProps[];
  contentItems: string;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const page = "POLICIES";
  const contentItems = await prisma.contentItem.findMany({
    where: {
      page,
    },
  });

  const policies = await prisma.policy.findMany();

  return {
    props: {
      contentItems: JSON.stringify(contentItems),
      policies: JSON.parse(JSON.stringify(policies)),
    },
  };
};

const Policies = ({ contentItems, policies = undefined }) => {
  const router = useRouter();
  const { tab } = router.query;
  const [activeKey, setActiveKey] = useState("abandoned");
  const parsedContentItems = JSON.parse(contentItems);
  const { editMode } = useContext(ThemePreferenceContext);
  const [isLoading, setIsLoading] = useState(false);
  const [policiesContent, setPoliciesContent] = useState(
    parsedContentItems.find((item) => item.name === "policiesContent")
  );

  const [policiesState, setPoliciesState] = useState(policies);

  useEffect(() => {
    if (tab) {
      const el = document.getElementById(tab[tab.length - 1] as string);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
      setActiveKey(tab as string);
    }
  }, [tab]);

  return (
    <Layout>
      <Content>
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={policiesContent?.content || { content: "" }}
              onSave={(html) => {
                setPoliciesContent({ content: html });
                saveContent({
                  apiPath: `/api/content-item/${policiesContent.id}`,
                  html,
                  setLoading: setIsLoading,
                });
              }}
              isLoading={isLoading}
            />
          </EditForm>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: policiesContent?.content }} />
        )}
        {editMode && (
          <p>
            Add more policies at{" "}
            <Link href={"/create-policy"}>
              <a>create policies</a>
            </Link>{" "}
            page.
          </p>
        )}
        {policiesState?.length > 0 && (
          <Collapse
            activeKey={activeKey}
            onChange={(key) => {
              router.replace(
                {
                  pathname: "/policies",
                  query: { tab: key },
                },
                undefined,
                { shallow: true }
              );
            }}
          >
            {policiesState.map((policy) => (
              <Panel id={policy.id} key={policy.id} header={policy.name}>
                {editMode ? (
                  <>
                    <EditForm onSubmit={(e) => e.preventDefault()}>
                      <Tiptap
                        content={policy?.content || { content: "" }}
                        onSave={(html) => {
                          setPoliciesContent({ content: html });
                          saveContent({
                            apiPath: `/api/policy/${policy.id}`,
                            html,
                            setLoading: setIsLoading,
                          });
                        }}
                        isLoading={isLoading}
                      />
                    </EditForm>
                  </>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: policy.content }} />
                )}
              </Panel>
            ))}
          </Collapse>
        )}
      </Content>
    </Layout>
  );
};

export default Policies;
