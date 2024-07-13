"use client";
import { Form } from "../forms/Form";
import { useFormState, useFormStatus } from "react-dom";
import { upsertContentItem } from "@/app/actions/upsertContentItem";
import { App, Button } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { useEffect, useState } from "react";
import { ContentItem, ContentPages, ContentSections } from "@prisma/client";
import { Content } from "../ui/Content";

let initialState = {
  id: "",
  name: "",
  page: "HOME",
  section: "MAIN",
  content: "",
  statusMessage: {
    message: "",
    type: "info",
  },
};

export const contentItemInputs = [
  {
    type: "select",
    name: "page",
    label: "Page",
    hidden: true,
    options: [
      { value: "HOME", label: "Home" },
      { value: "ABOUT", label: "About" },
      { value: "CONTACT", label: "Contact" },
    ],
    required: true,
  },
  {
    type: "select",
    name: "section",
    label: "Section",
    hidden: true,
    options: [
      { value: "MAIN", label: "Main" },
      { value: "SECONDARY", label: "Secondary" },
      { value: "TERTIARY", label: "Tertiary" },
    ],
    required: true,
  },
  {
    type: "text",
    name: "name",
    label: "Name",
    hidden: true,
    required: true,
  },
  {
    type: "editor",
    name: "content",
    label: "Add Content Below",
    required: true,
  },
];

export const UpsertContentItem: React.FC<{
  contentItem: ContentItem | null;
  page: ContentPages;
  section: ContentSections;
  name?: string;
}> = ({ contentItem, page, section, name }) => {
  const { message } = App.useApp();
  const { pending } = useFormStatus();
  initialState.id = contentItem?.id || "";
  initialState.page = page;
  initialState.section = section;
  initialState.content = contentItem?.content || "";
  initialState.name = name || page + "-" + section;
  const [state, formAction] = useFormState(upsertContentItem, initialState);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (state && state.statusMessage.message) {
      message.open({
        type: state.statusMessage.type as NoticeType,
        content: state.statusMessage.message,
      });

      setEditMode(false);
    }
  }, [state && state.statusMessage]);

  if (!editMode) {
    return (
      <div className="flex justify-end my-2">
        <Button size="small" type="primary" onClick={() => setEditMode(true)}>
          {contentItem ? "Edit" : "Add"} Content
        </Button>
      </div>
    );
  }

  return (
    <Content>
      <Form
        formAction={formAction}
        inputs={contentItemInputs}
        loading={pending}
        defaultInputValues={{
          page,
          section,
          content: contentItem?.content || "",
          name: name || page + "-" + section,
        }}
        onCanceled={() => setEditMode(false)}
      />
    </Content>
  );
};
