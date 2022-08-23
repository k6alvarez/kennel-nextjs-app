import React from "react";
import { useFormContext } from "./formContext";
import { INITIAL_PETS_STATE, renderFormFields } from "./formInitialState";

import { Fields } from "./styles";

export const FieldsetPetsInfo = () => {
  const { state, handleChange } = useFormContext();
  return (
    <fieldset>
      <Fields>
        {renderFormFields(INITIAL_PETS_STATE, state, handleChange)}
      </Fields>
    </fieldset>
  );
};
