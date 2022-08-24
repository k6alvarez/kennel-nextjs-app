import React from "react";
import { useFormContext } from "./formContext";
import { INITIAL_USER_STATE, renderFormFields } from "./formInitialState";

import { Fields } from "./styles";

export const FieldsetClientInfo = () => {
  const { state, handleChange } = useFormContext();

  return (
    <fieldset>
      <Fields>
        {renderFormFields(INITIAL_USER_STATE, state, handleChange)}
      </Fields>
    </fieldset>
  );
};
