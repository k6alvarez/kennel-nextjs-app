import React from "react";
import { renderFormFields } from "../../Forms/renderFormFields";
import { Error, Field, Fields, Fieldset } from "../../Forms/styles";
import { usePetFormContext } from "../../Pets/formContext";

import { PET_INITIAL_STATE } from "../../Pets/petFormReducer";
import { guestPetFormSubmit } from "../../Pets/services";
import { Button } from "../../ui-kit/Base";
import { useGuestFormContext } from "../formContext";

export const FieldsetPetsInfo = ({ pets, setPets }) => {
  const { guestFormState, guestFormDispatch } = useGuestFormContext();
  const {
    petFormState,
    petFormDispatch,
    setPetFormError,
    handleChange,
    petFormError,
  } = usePetFormContext();

  return (
    <fieldset>
      <Error>{petFormError}</Error>
      <Fieldset>
        <Fields>
          {renderFormFields({
            initialState: PET_INITIAL_STATE,
            state: petFormState,
            handleChange,
          })}
          <Field grow>
            <Button
              onClick={(e) => {
                guestPetFormSubmit(e, {
                  state: petFormState,
                  setPetFormError,
                  dispatch: petFormDispatch,
                  formSuccessCallback: (data) => {
                    guestFormDispatch({
                      type: "toggleGuestPet",
                      payload: {
                        pet: data,
                      },
                    });
                    setPets([...pets, data]);
                  },
                  reservationId: guestFormState.reservationId,
                });
              }}
              primary
            >
              Add Pet
            </Button>
          </Field>
        </Fields>
      </Fieldset>
      <Fields>
        {pets.map((pet, i) => (
          <div key={pet + "-" + i}>
            <label>{pet.name}</label>
            <input
              type="checkbox"
              name="pets"
              value={pet.id}
              checked={true}
              onChange={(e) => {
                e.preventDefault();
              }}
            />
          </div>
        ))}
      </Fields>
    </fieldset>
  );
};
