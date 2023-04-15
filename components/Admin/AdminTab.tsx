import { Collapse } from "antd";
import React from "react";
import { FormBusinessHours } from "./FormBusinessHours";
import { HolidayPremiumDates } from "./FormHolidayPremiumDates";
import { FormThemeSettings } from "./FormThemeSettings";
import { AppSettingsForm } from "./AppSettingsForm";

export const AdminTab = () => {
  return (
    <>
      <h1>Admin Settings</h1>
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
        <Collapse.Panel header="Theme Settings" key="3">
          <FormThemeSettings />
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
