"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/actions/submitContactForm";
import { Form } from "./Form";
import { useEffect } from "react";
import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { redirect } from "next/navigation";

const initialState = {
  name: "",
  email: "",
  message: "",
  interest: "",
  subject: "",
  statusMessage: {
    message: "",
    type: "info",
  },
};

const formInputs = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    readonly: false,
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    required: true,
  },
  {
    name: "interest",
    label: "Are you interested in?",
    type: "select",
    options: [
      {
        value: "boarding",
        label: "Boarding",
      },
      {
        value: "behavioralConsultation",
        label: "Behavioral Consultation",
      },
      {
        value: "privateLessons",
        label: "Private Lessons",
      },
      {
        value: "groupClasses",
        label: "Group Classes",
      },
      {
        value: "boardingSchool",
        label: "Boarding School",
      },
      {
        value: "other",
        label: "Other",
      },
    ],
    required: true,
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
  },
];

const ContactForm = ({ email }: { email?: string | null }) => {
  const { pending } = useFormStatus();
  if (email) {
    initialState.email = email;
    const emailInput = formInputs.find((input) => input.name === "email");
    if (emailInput) {
      emailInput.readonly = true;
    }
  }
  const [state, formAction] = useFormState(submitContactForm, initialState);

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
      defaultInputValues={{
        email: email,
      }}
      formAction={formAction}
      inputs={formInputs}
      loading={pending}
    />
  );
};

export default ContactForm;
