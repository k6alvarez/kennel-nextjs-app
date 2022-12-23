import { InfoCircleOutlined } from "@ant-design/icons";
import React from "react";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";
import { RunSizes, RunSizesCWing } from "./RunSizes";
import { Content } from "../ui-kit/Base";
import { EditForm } from "../Forms/styles";
import { Tiptap } from "../ui-kit/Tiptap";
import { saveContent } from "../Admin/services";

export const BoardingHome = ({
  editMode,
  content,
  secondaryContent,
  setIsLoading,
  isLoading,
  editorStickyTop,
}) => {
  return (
    <>
      <Content editorStickyTop={editorStickyTop}>
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={content?.content || { content: "" }}
              onSave={(html) => {
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
      </Content>
      <RunSizes />
      <Content editorStickyTop={editorStickyTop}>
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={secondaryContent?.content || { content: "" }}
              onSave={(html) => {
                saveContent({
                  apiPath: `/api/content-item/${secondaryContent.id}`,
                  html,
                  setLoading: setIsLoading,
                });
              }}
              isLoading={isLoading}
            />
          </EditForm>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: secondaryContent?.content }}
          />
        )}

        <RunSizesCWing />
      </Content>
    </>
  );
};
