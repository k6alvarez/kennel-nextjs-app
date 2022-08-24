import React from "react";
import { useFormContext } from "./formContext";
import {
  INITIAL_RESERVATION_STATE,
  renderFormFields,
} from "./formInitialState";

import { Fields } from "./styles";

export const FieldsetBoardingInfo = () => {
  const { state, handleChange } = useFormContext();

  return (
    <fieldset>
      <Fields>
        {renderFormFields(INITIAL_RESERVATION_STATE, state, handleChange)}
      </Fields>
    </fieldset>
  );
};
