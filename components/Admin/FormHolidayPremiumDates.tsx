import React, { useEffect, useReducer, useState } from "react";
import { renderFormFields } from "../Forms/renderFormFields";
import { Error, Field, Fields, Fieldset } from "../Forms/styles";
import {
  settingsFormReducer,
  HOLIDAY_AND_PREMIUM_DAYS_INITIAL_STATE,
} from "./adminFormReducer";
import { HolidayPremiumDatesList } from "./HolidayPremiumDatesList";
import { getHolidayPremiumDates, handleSettingsFormSubmit } from "./services";

export const HolidayPremiumDates = () => {
  const [holidayPremiumDates, setHolidayPremiumDates] = useState([]);

  const [formError, setFormError] = useState(undefined);
  const [formLoading, setFormLoading] = useState(false);
  const [formState, formDispatch] = useReducer(
    settingsFormReducer,
    HOLIDAY_AND_PREMIUM_DAYS_INITIAL_STATE
  );

  const fetchHolidayPremiumDates = async () => {
    const dates = await getHolidayPremiumDates();
    setHolidayPremiumDates(dates);
  };

  useEffect(() => {
    fetchHolidayPremiumDates();
  }, []);

  return (
    <>
      <HolidayPremiumDatesList holidayPremiumDates={holidayPremiumDates} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFormLoading(true);
          handleSettingsFormSubmit(e, {
            state: formState,
            dispatch: formDispatch,
            setFormError,
            apiRoute: "/api/premium-holiday-date",
            validationError:
              "Adding date failed. Please verify all required fields are filled out.",
            successMessage: `Date added successfully`,
            formSuccessCallback: fetchHolidayPremiumDates,
            initialFormState: HOLIDAY_AND_PREMIUM_DAYS_INITIAL_STATE,
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
              <h5>Holiday and Premium Dates</h5>
            </Field>
            {renderFormFields({
              initialState: HOLIDAY_AND_PREMIUM_DAYS_INITIAL_STATE,
              state: formState,
              handleChange: (name: string, newValue: any) => {
                const error = null;
                formDispatch({
                  key: name,
                  payload: {
                    newValue,
                    error,
                    initialFormState: HOLIDAY_AND_PREMIUM_DAYS_INITIAL_STATE,
                  },
                });
              },
              setFormLoading,
            })}
          </Fields>
          <input type="submit" value="Add New Date" />
        </Fieldset>
      </form>
    </>
  );
};
