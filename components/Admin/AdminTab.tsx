import { Collapse } from "antd";
import React from "react";
import { FormBusinessHours } from "./FormBusinessHours";
import { HolidayPremiumDates } from "./FormHolidayPremiumDates";

export const AdminTab = () => {
  return (
    <>
      <h1>Admin Settings</h1>
      <Collapse>
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
