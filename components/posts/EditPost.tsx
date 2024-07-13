"use client";
import { Form } from "../forms/Form";
import { useFormState, useFormStatus } from "react-dom";
import { editPost } from "@/app/actions/editPost";
import { App } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { postInputs } from "./AddPost";
import { Post } from "@prisma/client";

let initialState = {
  id: "",
  title: "",
  content: "",
  published: false,
  statusMessage: {
    message: "",
    type: "info",
  },
};

export const EditPost: React.FC<{
  post: Post;
}> = ({ post }) => {
  const { message } = App.useApp();
  const { pending } = useFormStatus();
  initialState.id = post.id;
  initialState.title = post.title;
  initialState.content = post.content || "";
  initialState.published = post.published || false;
  const [state, formAction] = useFormState(editPost, initialState);

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
    <Form
      formAction={formAction}
      inputs={postInputs}
      loading={pending}
      defaultInputValues={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      }}
    />
  );
};
