import React, { useReducer, useState } from "react";
import { renderFormFields } from "../Forms/renderFormFields";
import { Error, Field, Fields, Fieldset } from "../Forms/styles";
import {
  settingsFormReducer,
  BUSINESS_HOURS_INITIAL_STATE,
} from "./adminFormReducer";

export const FormBusinessHours = () => {
  const [formError, setFormError] = useState(undefined);
  const [formLoading, setFormLoading] = useState(false);
  const [formState, formDispatch] = useReducer(
    settingsFormReducer,
    BUSINESS_HOURS_INITIAL_STATE
  );
  return (
    <form
      onSubmit={(e) => {
        // e.preventDefault();
        // setFormLoading(true);
        // guestPetFormSubmit(e, {
        //   state: petFormState,
        //   setPetFormError,
        //   dispatch: petFormDispatch,
        //   formSuccessCallback,
        //   apiPath: "/api/pet",
        // })
        //   .then(() => {
        //     setFormLoading(false);
        //   })
        //   .catch(() => {
        //     setFormLoading(false);
        //   });
      }}
    >
      <Error>{formError}</Error>
      <Fieldset>
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
  );
};
