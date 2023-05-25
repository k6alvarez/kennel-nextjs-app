import React from "react";
import { RunSizes } from "./RunSizes";
import { Content } from "../ui-kit/Base";
import { EditForm } from "../Forms/styles";
import { Tiptap } from "../ui-kit/Tiptap";
import { saveContent } from "../Admin/services";

export const BoardingHome = ({
  editMode,
  content,
  setContent,
  secondaryContent,
  setSecondaryContent,
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
                setContent({ content: html });
                saveContent({
                  apiPath: `/api/content-item/${content.id}`,
                  payload: { content: html },
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
      <RunSizes filterType="a-b-wing" />
      <Content editorStickyTop={editorStickyTop}>
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={secondaryContent?.content || { content: "" }}
              onSave={(html) => {
                setSecondaryContent({ content: html });
                saveContent({
                  apiPath: `/api/content-item/${secondaryContent.id}`,
                  payload: { content: html },
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
      </Content>
      <RunSizes filterType="c-wing" />
    </>
  );
};
