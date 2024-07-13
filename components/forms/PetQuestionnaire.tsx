"use client";
import { useFormState, useFormStatus } from "react-dom";
import { submitQuestionnaire } from "@/app/actions/submitQuestionnaire";
import { Form } from "./Form";
import { useEffect } from "react";
import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { redirect } from "next/navigation";
import { INITIAL_QUESTIONNAIRE_FORM_STATE } from "./helpers";
import { User } from "@prisma/client";

const initialState = {
  email: "",
  name: "",
  lastName: "",
  address: "",
  unit: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  statusMessage: {
    message: "",
    type: "info",
  },
};

const PetQuestionnaire = ({ user }: { user: User }) => {
  const { pending } = useFormStatus();
  if (user) {
    initialState.email = user.email || "";
    initialState.name = user.name || "";
    initialState.lastName = user.lastName || "";
    initialState.address = user.address || "";
    initialState.unit = user.unit || "";
    initialState.city = user.city || "";
    initialState.state = user.state || "";
    initialState.zip = user.zip || "";
    initialState.phone = user.phone || "";

    const emailInput = INITIAL_QUESTIONNAIRE_FORM_STATE.find(
      (input) => input.name === "email"
    ) as any;
    if (emailInput) {
      emailInput.readonly = true;
    }
  }
  const [state, formAction] = useFormState(submitQuestionnaire, initialState);

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
      defaultInputValues={initialState}
      formAction={formAction}
      inputs={INITIAL_QUESTIONNAIRE_FORM_STATE}
      loading={pending}
    />
  );
};

export default PetQuestionnaire;
