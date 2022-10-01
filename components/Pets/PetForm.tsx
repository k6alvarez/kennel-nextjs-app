import React from "react";
import { Error, Fields } from "../Forms/styles";
import { renderFormFields } from "../Forms/renderFormFields";
import { petFormSubmit } from "./services";
import { usePetFormContext } from "./formContext";
import { PET_INITIAL_STATE } from "./petFormReducer";

export const PetForm = ({ formSuccessCallback = undefined }) => {
  const {
    petFormState,
    petFormDispatch,
    setPetFormError,
    handleChange,
    petFormError,
  } = usePetFormContext();

  return (
    <>
      <form
        onSubmit={(e) => {
          petFormSubmit(e, {
            state: petFormState,
            setPetFormError,
            dispatch: petFormDispatch,
            formSuccessCallback,
          });
        }}
      >
        <Error>{petFormError}</Error>
        <fieldset>
          <Fields>
            {renderFormFields({
              initialState: PET_INITIAL_STATE,
              state: petFormState,
              handleChange,
            })}
          </Fields>
        </fieldset>
        <input type="submit" value="Add Pet" />
      </form>
    </>
  );
};
