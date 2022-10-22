import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
import styled from "styled-components";
import { DateTime } from "luxon";
import { renderFormFields } from "../../Forms/renderFormFields";
import { Error, Field, Fields, Fieldset } from "../../Forms/styles";
import { usePetFormContext } from "../../Pets/formContext";

import { PET_INITIAL_STATE } from "../../Pets/petFormReducer";
import { PetInfo } from "../../Pets/PetInfo";
import { guestPetFormSubmit, isValidHttpUrl } from "../../Pets/services";
import { Button } from "../../ui-kit/Base";
import { useGuestFormContext } from "../formContext";
import { fieldValidator } from "../helpers";

export const SmallButton = styled.button`
  font-size: ${(props) => `calc(${props.theme.fontSizes[1]} / 1.6)`};
`;

export const defaultShadow = "0 0 10px 0 rgba(0,0,0,0.1)";

const petInfoOnly = (pet) => {
  const petInfo = structuredClone(pet);
  delete petInfo.largeImage;
  delete petInfo.smallImage;
  delete petInfo.id;
  delete petInfo.__typename;
  delete petInfo.createdAt;
  delete petInfo.updatedAt;
  delete petInfo.ownerId;
  delete petInfo.owner;
  delete petInfo.vaccinationsLargeImage;
  delete petInfo.vaccinations;
  delete petInfo.image;
  delete petInfo.guestReservationId;
  delete petInfo.name;
  delete petInfo.vet;
  delete petInfo.preferredRunSize;
  delete petInfo.feeding;
  delete petInfo.feedingCount;
  return petInfo;
};

const petBoardingOnly = (pet) => {
  const petInfo = structuredClone(pet);
  delete petInfo.largeImage;
  delete petInfo.smallImage;
  delete petInfo.id;
  delete petInfo.__typename;
  delete petInfo.createdAt;
  delete petInfo.updatedAt;
  delete petInfo.ownerId;
  delete petInfo.owner;
  delete petInfo.vaccinationsLargeImage;
  delete petInfo.image;
  delete petInfo.guestReservationId;
  delete petInfo.fixed;
  delete petInfo.name;
  delete petInfo.type;
  delete petInfo.breed;
  delete petInfo.gender;
  delete petInfo.color;
  delete petInfo.age;
  delete petInfo.weight;
  delete petInfo.type;
  return petInfo;
};

const calculateDeposit = (pets) => {
  let deposit = 0;
  pets.map((pet) => {
    if (pet.preferredRunSize === "Small") {
      return (deposit += 25);
    } else if (pet.preferredRunSize === "Large") {
      return (deposit += 25);
    } else if (pet.preferredRunSize === "Extra Large") {
      return (deposit += 25);
    }
  }, 0);
  return "$" + deposit.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

async function deleteGuestPet(id: string): Promise<void> {
  await fetch(`/api/guest-pet/${id}`, {
    method: "DELETE",
  });
}

export const FieldsetPetsInfo = ({ pets, setPets }) => {
  const { guestFormState, guestFormDispatch } = useGuestFormContext();
  const {
    petFormState,
    petFormDispatch,
    setPetFormError,
    handleChange,
    petFormError,
  } = usePetFormContext();

  const [activeTabKey1, setActiveTabKey1] = useState<string>("tab1");

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  return (
    <fieldset>
      <Error>{petFormError}</Error>
      <Fieldset>
        <h2>
          Pets boarding on{" "}
          {DateTime.fromISO(guestFormState.arrivalDate.value).toFormat("DDDD")}
        </h2>
        <p>Deposit amount due: {calculateDeposit(pets)}</p>
        <Fields>
          {pets?.map((pet, i) => {
            return (
              <Card
                key={pet + "-" + i}
                style={{
                  width: 300,
                  margin: "0 10px 10px 0",
                }}
                title={pet.name}
                cover={
                  isValidHttpUrl(pet.largeImage) && (
                    <img alt={`Picture of ${pet.name}`} src={pet.largeImage} />
                  )
                }
                extra={
                  <SmallButton
                    onClick={(e) => {
                      e.preventDefault();
                      deleteGuestPet(pet.id);
                    }}
                  >
                    <DeleteOutlined /> Remove Pet
                  </SmallButton>
                }
                activeTabKey={activeTabKey1}
                onTabChange={(key) => {
                  onTab1Change(key);
                }}
              >
                <PetInfo pet={petInfoOnly(pet)} />
                <hr />
                <PetInfo pet={petBoardingOnly(pet)} />
              </Card>
            );
          })}
        </Fields>

        {pets.length < 5 ? (
          <>
            <h4>Add a pet to your reservation:</h4>
            <Fields>
              {renderFormFields({
                initialState: PET_INITIAL_STATE,
                state: petFormState,
                handleChange,
              })}
              <Field grow>
                <Button
                  disabled={pets.length >= 5}
                  onClick={(e) => {
                    e.preventDefault();
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
                    }
                  }}
                  primary
                >
                  Add Pet
                </Button>
              </Field>
            </Fields>
          </>
        ) : (
          <p>
            You have reached the maximum number of pets allowed for boarding.
          </p>
        )}
      </Fieldset>
    </fieldset>
  );
};
