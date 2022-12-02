import React, { useEffect, useReducer, useState } from "react";
import { renderFormFields } from "../Forms/renderFormFields";
import { Error, Field, Fields, Fieldset } from "../Forms/styles";
import {
  settingsFormReducer,
  BUSINESS_HOURS_INITIAL_STATE,
} from "./adminFormReducer";
import { BusinessHoursList } from "./BusinessHoursList";
import { getBusinessHours, handleSettingsFormSubmit } from "./services";

export const FormBusinessHours = () => {
  const [businessHours, setBusinessHours] = useState([]);

  const [formError, setFormError] = useState(undefined);
  const [formLoading, setFormLoading] = useState(false);
  const [formState, formDispatch] = useReducer(
    settingsFormReducer,
    BUSINESS_HOURS_INITIAL_STATE
  );

  const fetchBusinessHours = async () => {
    const dates = await getBusinessHours();
    setBusinessHours(dates);
  };

  useEffect(() => {
    fetchBusinessHours();
  }, []);
  return (
    <>
      <BusinessHoursList center businessHours={businessHours} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFormLoading(true);
          handleSettingsFormSubmit(e, {
            state: formState,
            dispatch: formDispatch,
            setFormError,
            apiRoute: "/api/business-hour",
            validationError:
              "Adding business hours failed. Please verify all required fields are filled out.",
            successMessage: `Business hours added successfully`,
            formSuccessCallback: fetchBusinessHours,
            initialFormState: BUSINESS_HOURS_INITIAL_STATE,
          })
            .then(() => {
              setFormLoading(false);
            })
            .catch(() => {
              setFormLoading(false);
            });
        }}
      >
        <Error>{formError}</Error>
        <Fieldset disabled={formLoading}>
          <Fields>
            <Field grow align="flex-start">
              <h5>Regular Business Hours</h5>
            </Field>
            {renderFormFields({
              initialState: BUSINESS_HOURS_INITIAL_STATE,
              state: formState,
              handleChange: (name: string, newValue: any) => {
                const error = null;
                formDispatch({
                  key: name,
                  payload: { newValue, error },
                });
              },
              setFormLoading: () => {},
            })}
          </Fields>
          <input type="submit" value="Add New Date" />
        </Fieldset>
      </form>
    </>
  );
};
