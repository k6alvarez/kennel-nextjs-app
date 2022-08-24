import React from "react";
import { useGuestFormContext } from "./formContext";
import { INITIAL_USER_STATE, renderFormFields } from "./formInitialState";

import { Fields } from "./styles";

export const FieldsetClientInfo = () => {
  const { state, handleChange } = useGuestFormContext();

  return (
    <fieldset>
      <Fields>
        {renderFormFields(INITIAL_USER_STATE, state, handleChange)}
      </Fields>
    </fieldset>
  );
};
