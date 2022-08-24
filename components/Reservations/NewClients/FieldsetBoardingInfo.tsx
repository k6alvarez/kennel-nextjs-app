import React from "react";
import { useGuestFormContext } from "./formContext";
import {
  INITIAL_RESERVATION_STATE,
  renderFormFields,
} from "./formInitialState";

import { Fields } from "./styles";

export const FieldsetBoardingInfo = () => {
  const { state, handleChange } = useGuestFormContext();

  return (
    <fieldset>
      <Fields>
        {renderFormFields(INITIAL_RESERVATION_STATE, state, handleChange)}
      </Fields>
    </fieldset>
  );
};
