import React, { useReducer, useState } from "react";
import { Fields, Fieldset, Error } from "./styles";
import { renderFormFields } from "./renderFormFields";
import { PET_INITIAL_STATE, petFormReducer } from "../Pets/petFormReducer";
import { message } from "antd";
import { handleGeneralUpdate } from "../Pets/services";

export const UserPetEditForm = ({ pet, callback }) => {
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const getFormState = () => {
    let formState = PET_INITIAL_STATE;
    for (const key in pet) {
      if (key in formState) {
        formState[key].value = pet[key];
        formState[key].error = null;
      }
    }
    return formState;
  };

  const [formState, formDispatch] = useReducer(petFormReducer, getFormState());
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
            apiPath: `/api/pet/${pet.id}`,
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
