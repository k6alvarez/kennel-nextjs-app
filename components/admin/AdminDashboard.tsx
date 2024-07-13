"use client";
import { upsertAppSettings } from "@/app/actions/upsertAppSettings";
import { App } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Form } from "../forms/Form";

type AdminDashboardProps = {
  /** @defaultValue 'flex flex-1 md:flex-none mr-[46px] md:mr-0' */
  styles?: string;
  appSettings: any;
};

const initialState = {
  name: "",
  slogan: "",
  statusMessage: {
    message: "",
    type: "info",
  },
};

const inputs = [
  {
    name: "name",
    label: "App Name",
    type: "text",
  },
  {
    name: "slogan",
    label: "Slogan",
    type: "text",
  },
];

export const AdminDashboard = ({
  styles = "flex flex-col flex-1 md:flex-none md:mr-0 mt-4",
  appSettings,
}: AdminDashboardProps) => {
  const { message } = App.useApp();
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(upsertAppSettings, initialState);

  useEffect(() => {
    if (state && state.statusMessage.message) {
      message.open({
        type: state.statusMessage.type as NoticeType,
        content: state.statusMessage.message,
      });
    }
  }, [state && state.statusMessage]);

  return (
    <div className={styles}>
      <h2 className="text-lg font-semibold">Admin Dashboard</h2>
      <p>As an admin, you can update your app settings below.</p>
      <Form
        formAction={formAction}
        defaultInputValues={appSettings}
        inputs={inputs}
        loading={pending}
      />
    </div>
  );
};
