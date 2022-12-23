import Link from "next/link";
import React from "react";
import { saveContent } from "../Admin/services";
import { EditForm } from "../Forms/styles";
import { Content } from "../ui-kit/Base";
import { Tiptap } from "../ui-kit/Tiptap";

export const AgilityLessons = ({
  editMode,
  content,
  setIsLoading,
  isLoading,
  editorStickyTop,
}) => {
  return (
    <Content editorStickyTop={editorStickyTop}>
      {editMode ? (
        <EditForm onSubmit={(e) => e.preventDefault()}>
          <Tiptap
            content={content?.content || { content: "" }}
            onSave={(html) => {
              saveContent({
                html,
                apiPath: `/api/content-item/${content.id}`,
                setLoading: setIsLoading,
              });
            }}
            isLoading={isLoading}
          />
        </EditForm>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content?.content }} />
      )}
      {/* <GeneralContactForm
        emailSubject={"Gillette Kennels Agility Training Contact"}
        formHint="Learn more about Agility Training using the form below."
      /> */}
    </Content>
  );
};
