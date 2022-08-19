import React from "react";
import { useFormContext } from "./formContext";
import { INITIAL_USER_STATE } from "./formReducer";
import { Fields, Field } from "./styles";

export const FieldsetClientInfo = () => {
  const { state, handleChange } = useFormContext();
  return (
    <fieldset>
      <Fields>
        {Object.entries(INITIAL_USER_STATE).map(([key, _value]) => {
          return (
            <Field key={key}>
              <label htmlFor={key}>{state[key].label}</label>
              <input
                onChange={(e) => handleChange(key, e.target.value)}
                type={state[key].type || "text"}
                id={key}
                value={state[key].value}
              />
            </Field>
          );
        })}
      </Fields>
    </fieldset>
  );
};
