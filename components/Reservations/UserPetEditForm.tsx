import React, { useEffect, useReducer, useState } from "react";

import { PET_INITIAL_STATE } from "../Pets/petFormReducer";
import { message } from "antd";
import { handleGeneralUpdate } from "../Pets/services";
import { Error, Fields, Fieldset } from "../Forms/styles";
import { renderFormFields } from "../Forms/renderFormFields";

export const UserPetEditForm = ({ pet, callback, apiPath = "/api/pet" }) => {
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const setPetValuesToInitialState = () => {
    const initialState = PET_INITIAL_STATE;

    const petKeys = Object.keys(initialState);
    petKeys.forEach((key) => {
      initialState[key].value = pet[key];
      console.log("pet[key]", pet[key]);
    });

    return initialState;
  };

  const [formState, formDispatch] = useReducer(
    (
      state,
      { type = "inputChange", key = undefined, payload = undefined }: any
    ) => {
      switch (type) {
        case "setFormForDog": {
          let preferredRunSize = {
            ...state["preferredRunSize"],
            options: ["Small", "Large", "Extra Large", "Shared"],
          };

          const bordetellaVaccine = {
            ...state["bordetellaVaccine"],
            required: true,
            disabled: false,
          };

          return {
            ...state,
            preferredRunSize,
            bordetellaVaccine,
          };
        }
        case "setFormForCat": {
          let preferredRunSize = {
            ...state["preferredRunSize"],
            options: ["Cat Room", "Cat Condo", "Shared"],
          };

          const bordetellaVaccine = {
            ...state["bordetellaVaccine"],
            required: false,
            disabled: true,
          };

          return {
            ...state,
            preferredRunSize,
            bordetellaVaccine,
          };
        }
        case "resetForm":
          return { ...PET_INITIAL_STATE };
        case "inputChange":
          const inputState = {
            ...state[key],
            value: payload.newValue,
            error: payload.error,
          };
          return {
            ...state,
            [key]: inputState,
          };
      }
    },
    setPetValuesToInitialState()
  );

  useEffect(() => {
    if (pet.type === "Cat") {
      formDispatch({ type: "setFormForCat" });
    }

    if (pet.type === "Dog") {
      formDispatch({ type: "setFormForDog" });
    }
  }, [pet]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFormLoading(true);

          handleGeneralUpdate({
            e,
            initialFormState: PET_INITIAL_STATE,
            formState,
            setFormLoading,
            setFormError,
            formSuccessCallback: (data) => {
              message.success("Pet updated successfully");
              callback && callback(data);
            },
            apiPath: `${apiPath}/${pet.id}`,
          });
        }}
      >
        <Error>{formError}</Error>
        <Fieldset disabled={formLoading}>
          <Fields>
            {renderFormFields({
              initialState: PET_INITIAL_STATE,
              state: formState,
              handleChange: (name: string, newValue: any) => {
                const error = null;
                formDispatch({
                  key: name,
                  payload: { newValue, error },
                });
              },
              setFormLoading: () => {},
            })}
          </Fields>
          <input type="submit" value="Update Pet" />
        </Fieldset>
      </form>
    </div>
  );
};
