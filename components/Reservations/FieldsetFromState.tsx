import React from "react";
import { renderFormFields } from "../Forms/renderFormFields";
import { Fields, Fieldset } from "../Forms/styles";

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
    <Fieldset disabled={formLoading}>
      <Fields>
        {renderFormFields({
          initialState,
          state,
          handleChange,
        })}
      </Fields>
    </Fieldset>
  );
};
