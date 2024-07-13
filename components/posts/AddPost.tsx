"use client";
import { Form } from "../forms/Form";
import { useFormState, useFormStatus } from "react-dom";
import { createUnpublishedPost } from "@/app/actions/createUnpublishedPost";
import { App } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const initialState = {
  title: "",
  content: "",
  statusMessage: {
    message: "",
    type: "info",
  },
};

export const postInputs = [
  {
    name: "published",
    label: "Published",
    type: "switch",
  },
  {
    name: "title",
    label: "Post Title",
    type: "text",
  },
  {
    name: "content",
    label: "Post Content",
    type: "editor",
  },
];

export const AddPost: React.FC = () => {
  const { message } = App.useApp();
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(createUnpublishedPost, initialState);

  useEffect(() => {
    if (state && state.statusMessage.message) {
      message.open({
        type: state.statusMessage.type as NoticeType,
        content: state.statusMessage.message,
      });

      if (state.statusMessage.redirect) {
        redirect(state.statusMessage.redirect);
      }
    }
  }, [state && state.statusMessage]);

  return (
    <div>
      <h2>Add New Post</h2>
      <Form formAction={formAction} inputs={postInputs} loading={pending} />
    </div>
  );
};
