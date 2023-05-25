import React, { useContext, useEffect, useState } from "react";
import { Collapse } from "antd";
import styled from "styled-components";
import Layout from "../components/Layout";
import { Content } from "../components/ui-kit/Base";

import { useRouter } from "next/router";
import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";
import { ThemePreferenceContext } from "./_app";
import { PolicyPanelHeader } from "../components/Policies/PolicyPanelHeader";
import { PolicyContent } from "../components/Policies/PolicyContent";
import { PolicyPageContent } from "../components/Policies/PolicyPageContent";

const { Panel } = Collapse;

export const deletePolicy = async (id: string): Promise<void> => {
  await fetch(`/api/policy/${id}`, {
    method: "DELETE",
  });
};

export const TitleText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    margin: 0 ${(props) => props.theme.space[4]};
    padding: 0 ${(props) => props.theme.space[2]};
    font-size: calc(${(props) => props.theme.fontSizes[1]} / 1.2);
  }
`;

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
  const [activeKey, setActiveKey] = useState(policies[0]?.name || "");
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
        <PolicyPageContent
          editMode={editMode}
          policiesContent={policiesContent}
          setPoliciesContent={setPoliciesContent}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
        {policiesState?.length > 0 && (
          <Collapse
            accordion
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
            {policiesState.map((policy) => {
              const [editedPolicyName, setEditedPolicyName] = useState({
                name: "",
                id: "",
              });
              return (
                <Panel
                  id={policy.name}
                  key={policy.name}
                  header={
                    <PolicyPanelHeader
                      editMode={editMode}
                      policiesState={policiesState}
                      setPoliciesState={setPoliciesState}
                      policy={policy}
                      editedPolicyName={editedPolicyName}
                      setEditedPolicyName={setEditedPolicyName}
                    />
                  }
                >
                  <PolicyContent
                    policy={policy}
                    editMode={editMode}
                    setPoliciesContent={setPoliciesContent}
                    setPoliciesState={setPoliciesState}
                    policiesState={policiesState}
                    editedPolicyName={editedPolicyName}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                  />
                </Panel>
              );
            })}
          </Collapse>
        )}
      </Content>
    </Layout>
  );
};

export default Policies;
