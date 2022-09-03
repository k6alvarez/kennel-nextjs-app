import React from "react";
import { renderFormFields } from "../../Forms/renderFormFields";
import { Fields } from "../../Forms/styles";
import { useGuestFormContext } from "./formContext";
import { INITIAL_PETS_STATE } from "./formInitialState";

export const FieldsetPetsInfo = ({}) => {
  const { guestFormState, handleChange } = useGuestFormContext();
  return (
    <fieldset>
      <Fields>
        {renderFormFields({
          initialState: INITIAL_PETS_STATE,
          state: guestFormState,
          handleChange,
        })}
      </Fields>
    </fieldset>
  );
};
