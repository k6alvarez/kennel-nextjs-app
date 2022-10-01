import React from "react";
import { Error, Fields } from "../Forms/styles";
import { renderFormFields } from "../Forms/renderFormFields";
import { petFormSubmit } from "./services";
import { usePetFormContext } from "./formContext";
import { PET_INITIAL_STATE } from "./petFormReducer";

export const PetsForm = () => {
  const {
    petFormState,
    petFormDispatch,
    setPetFormError,
    handleChange,
    petFormError,
  } = usePetFormContext();

  return (
    <>
      <h1>My Pets</h1>
      <form
        onSubmit={(e) => {
          petFormSubmit(e, {
            state: petFormState,
            setPetFormError,
            dispatch: petFormDispatch,
          });
        }}
      >
        <h1>New Pet</h1>
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
