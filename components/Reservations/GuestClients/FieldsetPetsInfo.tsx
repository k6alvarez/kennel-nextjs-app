import React, { useEffect } from "react";
import { Collapse, Divider } from "antd";
import styled from "styled-components";

import { renderFormFields } from "../../Forms/renderFormFields";
import { Error, Field, Fields, Fieldset } from "../../Forms/styles";
import { usePetFormContext } from "../../Pets/formContext";

import { PET_INITIAL_STATE } from "../../Pets/petFormReducer";
import { guestPetFormSubmit } from "../../Pets/services";
import { Button } from "../../ui-kit/Base";
import { fieldValidator } from "../helpers";
import { PetCard } from "../../Pets/PetCard";

import { PetCards } from "../styles";
import { PetProps } from "../../../pages/profile";
import Link from "next/link";
import { BlockQuote } from "./FormIntro";
import { InfoCircleOutlined } from "@ant-design/icons";
import { BoardingDetails } from "./BoardingDetails";
import { useGuestFormContext } from "../formContext";

export const SmallButton = styled.button`
  font-size: ${(props) => `calc(${props.theme.fontSizes[1]} / 1.6)`};
`;

interface FieldsetPetsInfoProps {
  pets: PetProps[];
  setPets: React.Dispatch<React.SetStateAction<PetProps[]>>;
  formState: any;
  formDispatch: any;
  apiPath: any;
  toggle?: (pet: PetProps) => void;
  onDelete?: (petId: string) => void;
  refetchPets?: () => void;
}

export const FieldsetPetsInfo = ({
  pets,
  setPets,
  formState,
  formDispatch,
  apiPath,
  toggle,
  onDelete,
  refetchPets,
}: FieldsetPetsInfoProps) => {
  const {
    petFormState,
    petFormDispatch,
    setPetFormError,
    handleChange,
    petFormLoading,
    setPetFormLoading,
    petFormError,
  } = usePetFormContext();

  const { setGuestFormError } = useGuestFormContext();

  useEffect(() => {
    if (petFormState.type.value === "Cat") {
      petFormDispatch({
        type: "setFormForCat",
        payload: {
          pets,
        },
      });
    } else {
      petFormDispatch({
        type: "setFormForDog",
        payload: {
          pets,
        },
      });
    }
  }, [petFormState.type.value]);

  useEffect(() => {
    if (petFormState.feeding.value === "Client Food") {
      petFormDispatch({
        type: "setFormForClientFood",
      });
    } else {
      petFormDispatch({
        type: "setFormForKennelFood",
      });
    }
  }, [petFormState.feeding.value]);

  const handleAddPet = (e) => {
    e.preventDefault();
    setPetFormLoading(true);
    const petFieldsValid = fieldValidator({
      fields: Object.entries(PET_INITIAL_STATE),
      state: petFormState,
      dispatch: petFormDispatch,
    });

    if (petFieldsValid) {
      guestPetFormSubmit(e, {
        state: petFormState,
        setPetFormError,
        dispatch: petFormDispatch,
        formSuccessCallback: (data) => {
          formDispatch({
            type: "togglePet",
            payload: {
              pet: data,
            },
          });
          setPets([...pets, data]);
        },
        reservationId: formState.reservationId,
        apiPath,
      }).then(() => {
        window.scrollTo(0, 0);
        setPetFormLoading(false);
        setPetFormError(undefined);
        setGuestFormError(undefined);
      });
    }
    setPetFormLoading(false);
  };

  return (
    <>
      <Error>{petFormError}</Error>
      <Fieldset disabled={petFormLoading}>
        <BoardingDetails pets={pets} formState={formState} />
        {pets.length > 0 && (
          <PetCards>
            {pets?.map((pet, i) => {
              return (
                <PetCard
                  apiPath={apiPath}
                  toggle={toggle}
                  onDelete={onDelete}
                  setPets={setPets}
                  key={pet + "-" + i}
                  pet={pet}
                  refetchPets={refetchPets}
                  petSelected={
                    formState.pets instanceof Array
                      ? formState.pets.includes(pet)
                      : Object.keys(formState.pets).includes(pet.id)
                  }
                />
              );
            })}
          </PetCards>
        )}
        <Collapse expandIcon={() => <InfoCircleOutlined />}>
          <Collapse.Panel header={<>Add a pet</>} key="1">
            <>
              {pets.length < 5 ? (
                <Fields>
                  {renderFormFields({
                    initialState: PET_INITIAL_STATE,
                    state: petFormState,
                    handleChange,
                    setFormLoading: setPetFormLoading,
                  })}
                  {petFormState.feeding.value === "Client Food" && (
                    <Field grow>
                      <BlockQuote>
                        <InfoCircleOutlined />
                        <p>
                          If you provide food please package each meal in a
                          *Ziploc® (type) plastic bag (no fold-over sandwich
                          baggies, please) with each meal clearly labeled with
                          your pet's name. See our{" "}
                          <Link href="/policies?tab=Feeding">
                            <a>feeding policy</a>
                          </Link>{" "}
                          for more details.
                        </p>
                      </BlockQuote>
                    </Field>
                  )}

                  <Field grow>
                    <p>
                      Our guests are routinely fed at 9:00 AM. Additional
                      evening feedings ($.75 per meal) are available upon
                      request. The evening feeding is provided at 4:00 PM. Food
                      and water are served in our dishes, so please do not bring
                      dishes.
                    </p>
                  </Field>

                  <Field grow>
                    <Button
                      disabled={pets.length >= 5}
                      onClick={handleAddPet}
                      primary
                    >
                      Add Pet
                    </Button>
                  </Field>
                </Fields>
              ) : (
                <p>
                  You have reached the maximum number of pets allowed for
                  boarding.
                </p>
              )}
            </>
          </Collapse.Panel>
        </Collapse>
      </Fieldset>
    </>
  );
};
