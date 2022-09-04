import React from "react";
import { renderFormFields } from "../../Forms/renderFormFields";
import { Fields } from "../../Forms/styles";
import { useGuestFormContext } from "./formContext";
import { INITIAL_USER_STATE } from "./formInitialState";

export const FieldsetClientInfo = ({}) => {
  const { guestFormState, handleChange } = useGuestFormContext();

  return (
    <fieldset>
      <Fields>
        {renderFormFields({
          initialState: INITIAL_USER_STATE,
          state: guestFormState,
          handleChange,
        })}
      </Fields>
    </fieldset>
  );
};
