import React from "react";
import { useFormContext } from "./formContext";
import { INITIAL_RESERVATION_STATE } from "./formReducer";
import { Field, Fields } from "./styles";

export const FieldsetBoardingInfo = () => {
  const { state, handleChange } = useFormContext();

  return (
    <fieldset>
      <Fields>
        {Object.entries(INITIAL_RESERVATION_STATE).map(([key, _value]) => {
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
