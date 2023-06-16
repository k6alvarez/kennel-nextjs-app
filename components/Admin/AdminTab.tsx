import { Collapse } from "antd";
import React from "react";
import { FormBusinessHours } from "./FormBusinessHours";
import { HolidayPremiumDates } from "./FormHolidayPremiumDates";
import { AppSettingsForm } from "./AppSettingsForm";
import Link from "next/link";
import { LinkOutlined } from "@ant-design/icons";

export const AdminTab = () => {
  return (
    <>
      <h1>Admin Settings</h1>
      <p>
        <Link href="/reservations">
          <a>
            <LinkOutlined rev={undefined} /> Manage Reservations
          </a>
        </Link>
      </p>
      <Collapse>
        <Collapse.Panel header="General Settings" key="0">
          <AppSettingsForm />
        </Collapse.Panel>
        <Collapse.Panel header="Holiday and Premium Dates" key="1">
          <HolidayPremiumDates />
        </Collapse.Panel>
        <Collapse.Panel header="Regular Business Hours" key="2">
          <FormBusinessHours />
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
