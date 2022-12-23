import Link from "next/link";
import React from "react";
import { Content } from "../ui-kit/Base";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";
import { CheckCircleOutlined } from "@ant-design/icons";
import { saveContent } from "../Admin/services";
import { EditForm } from "../Forms/styles";
import { Tiptap } from "../ui-kit/Tiptap";

export const PrivateLessons = ({
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
    </Content>
  );
};
