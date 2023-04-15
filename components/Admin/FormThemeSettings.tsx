import { message } from "antd";
import React, { useContext } from "react";
import appSettings from "../../pages/app-settings";

import {
  AppSettingsContext,
  INITIAL_THEME_SETTINGS_FORM_STATE,
} from "../../pages/_app";
import { generalFormUpdate } from "../../utils/updateHelpers";
import { renderFormFields } from "../Forms/renderFormFields";
import { RouteLink } from "../Navigation/RouteLink";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
  align-items: center;
`;

export const FormThemeSettings = () => {
  const {
    appSettings: appSettingsContext,
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

        if (appSettingsContext.id) {
          generalFormUpdate({
            apiUrl: `/api/app-setting/${appSettingsContext.id}`,
            body,
            formSubmitCallback: () => {
              setAppSettings({ ...appSettings, ...body });
              message.success("Content updated successfully");
            },
          });
        } else {
          generalFormUpdate({
            apiUrl: "/api/app-setting/",
            body,
            formSubmitCallback: () => {
              setAppSettings({ ...appSettings, ...body });
              message.success("Content created successfully");
            },
          });
        }
      }}
    >
      <fieldset>
        {renderFormFields({
          initialState: INITIAL_THEME_SETTINGS_FORM_STATE,
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
        <Flex>
          <RouteLink href="/profile">
            <a>Cancel</a>
          </RouteLink>
          <input type="submit" value="Save" />
        </Flex>
      </fieldset>
    </form>
  );
};
