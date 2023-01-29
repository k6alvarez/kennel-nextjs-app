import {
  AlertOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Collapse, message } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import services from "../../pages/api/services";
import { TitleText } from "../../pages/policies";
import { saveContent } from "../Admin/services";
import { EditForm } from "../Forms/styles";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";
import { Content } from "../ui-kit/Base";
import { Tiptap } from "../ui-kit/Tiptap";
import { rateMedicalCare } from "./BoardingRates";

const { Panel } = Collapse;

export const BoldText = styled.span`
  font-weight: 600;
`;

export const Accordion = styled.div`
  border-top: 1px solid ${(props) => props.theme.lightGrey};
  margin-bottom: 1rem;
`;

export const MedicalIssues = ({
  editMode,
  content,
  setContent,
  setIsLoading,
  isLoading,
  editorStickyTop,
}) => {
  const [issues, setIssues] = useState([]);

  const fetchMedIssues = async () => {
    const res = await fetch("/api/medical-issues");
    const data = await res.json();
    setIssues(data);
  };

  useEffect(() => {
    fetchMedIssues();
  }, []);

  return (
    <Content editorStickyTop={editorStickyTop}>
      {editMode ? (
        <EditForm onSubmit={(e) => e.preventDefault()}>
          <Tiptap
            content={content?.content || { content: "" }}
            onSave={(html) => {
              setContent({ content: html });
              saveContent({
                apiPath: `/api/content-item/${content.id}`,
                html,
                setLoading: setIsLoading,
              });
            }}
            isLoading={isLoading}
          />
        </EditForm>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content?.content }} />
      )}

      <Collapse>
        {issues.length > 0 &&
          issues.map((issue) => (
            <Collapse.Panel
              id={issue.name}
              key={issue.id}
              header={
                <TitleText>
                  {editMode ? (
                    <>
                      {issue.name}
                      <Button
                        onClick={() => {
                          // deleteService(service.id).then(() => {
                          //   message.success("Policy deleted");
                          //   setServices(
                          //     services.filter((p) => p.id !== service.id)
                          //   );
                          // });
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>{issue.name}</>
                  )}
                </TitleText>
              }
            >
              {editMode ? (
                <>
                  <EditForm onSubmit={(e) => e.preventDefault()}>
                    <Tiptap
                      content={issue?.description}
                      onSave={(html) => {
                        const body = {
                          ...issue,
                          description: html,
                        };
                        fetch(`/api/medical-issue/${issue.id}`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(body),
                        })
                          .then(() => {
                            message.success("Update successful.");
                          })
                          .catch((err) => console.log(err));
                      }}
                      isLoading={isLoading}
                    />
                  </EditForm>
                </>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: issue.description }} />
              )}
            </Collapse.Panel>
          ))}
      </Collapse>
    </Content>
  );
};
