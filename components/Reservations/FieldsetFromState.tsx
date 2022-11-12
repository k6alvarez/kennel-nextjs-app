import React from "react";
import { renderFormFields } from "../Forms/renderFormFields";
import { Fields } from "../Forms/styles";

interface FieldsetClientInfoProps {
  initialState: { [s: string]: unknown } | ArrayLike<unknown>;
  state: {
    [x: string]: any;
  };
  handleChange: (arg0: string, arg1: any) => any;
  formLoading?: boolean;
}

export const FieldsetClientInfo = ({
  initialState,
  state,
  handleChange,
  formLoading,
}: FieldsetClientInfoProps) => {
  return (
    <fieldset disabled={formLoading}>
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
