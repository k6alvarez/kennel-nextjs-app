import React from "react";
import { useGuestFormContext } from "./formContext";
import { INITIAL_PETS_STATE, renderFormFields } from "./formInitialState";

import { Fields } from "./styles";

export const FieldsetPetsInfo = ({}) => {
  const { state, handleChangeGuestReservation } = useGuestFormContext();
  return (
    <fieldset>
      <Fields>
        {renderFormFields(
          INITIAL_PETS_STATE,
          state,
          handleChangeGuestReservation
        )}
      </Fields>
    </fieldset>
  );
};
