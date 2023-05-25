import { InfoCircleOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Link from "next/link";
import React from "react";
import { saveContent } from "../Admin/services";
import { EditForm } from "../Forms/styles";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";
import { Content } from "../ui-kit/Base";
import { Tiptap } from "../ui-kit/Tiptap";
import { FlexCards } from "./styles";

export const BoardingCheckin = ({
  editMode,
  content,
  setContent,
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
  );
};
