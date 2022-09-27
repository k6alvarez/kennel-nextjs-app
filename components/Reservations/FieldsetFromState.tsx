import React from "react";
import { renderFormFields } from "../Forms/renderFormFields";
import { Fields } from "../Forms/styles";

export const FieldsetClientInfo = ({ initialState, state, handleChange }) => {
  return (
    <fieldset>
      <Fields>
        {renderFormFields({
          initialState,
          state,
          handleChange,
        })}
      </Fields>
    </fieldset>
  );
};
