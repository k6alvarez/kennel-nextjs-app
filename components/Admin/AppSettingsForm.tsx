import { message } from "antd";
import React, { useContext } from "react";

import {
  AppSettingsContext,
  INITIAL_APP_SETTINGS_FORM_STATE,
} from "../../pages/_app";
import { generalFormUpdate } from "../../utils/updateHelpers";
import { renderFormFields } from "../Forms/renderFormFields";

export const AppSettingsForm = () => {
  const {
    appSettings,
    formStateAppSettings,
    setAppSettings,
    formAppSettingsDispatch,
  } = useContext(AppSettingsContext);

  const editor = formStateAppSettings.name.value;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const body = Object.keys(formStateAppSettings).reduce((acc, key) => {
          acc[key] = formStateAppSettings[key].value;
          return acc;
        }, {});

        if (appSettings.id) {
          generalFormUpdate({
            apiUrl: `/api/app-setting/${appSettings.id}`,
            body,
            formSubmitCallback: (res) => {
              setAppSettings({ ...appSettings, ...body });
              message.success("Content updated successfully");
            },
          });
        } else {
          generalFormUpdate({
            apiUrl: "/api/app-setting/",
            body,
            formSubmitCallback: (res) => {
              setAppSettings({ ...appSettings, ...body });
              message.success("Content created successfully");
            },
          });
        }
      }}
    >
      <fieldset>
        {renderFormFields({
          initialState: INITIAL_APP_SETTINGS_FORM_STATE,
          state: formStateAppSettings,
          handleChange: (name: string, newValue: any) => {
            const error = null;
            formAppSettingsDispatch({
              key: name,
              payload: { newValue, error },
            });
          },
          editor,
        })}
        <input type="submit" value="Save" />
      </fieldset>
    </form>
  );
};
