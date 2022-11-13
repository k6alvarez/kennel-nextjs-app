import React from "react";
import { Error, Fields, Fieldset } from "../Forms/styles";
import { renderFormFields } from "../Forms/renderFormFields";
import { guestPetFormSubmit } from "./services";
import { usePetFormContext } from "./formContext";
import { PET_INITIAL_STATE } from "./petFormReducer";

export const PetForm = ({
  formSuccessCallback = undefined,
  formLoading,
  setFormLoading,
}) => {
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
          e.preventDefault();
          setFormLoading(true);
          guestPetFormSubmit(e, {
            state: petFormState,
            setPetFormError,
            dispatch: petFormDispatch,
            formSuccessCallback,
            apiPath: "/api/pet",
          })
            .then(() => {
              setFormLoading(false);
            })
            .catch(() => {
              setFormLoading(false);
            });
        }}
      >
        <Error>{petFormError}</Error>
        <Fieldset disabled={formLoading}>
          <Fields>
            {renderFormFields({
              initialState: PET_INITIAL_STATE,
              state: petFormState,
              handleChange,
              setFormLoading,
            })}
          </Fields>
          <input type="submit" value="Add Pet" />
        </Fieldset>
      </form>
    </>
  );
};
