import React, { useState } from "react";
import { Steps } from "antd";
import { BlockQuote, FormIntroGuest } from "./FormIntro";
import { useGuestFormContext } from "../formContext";
import { FieldsetClientInfo } from "../FieldsetFromState";
import { FieldsetPetsInfo } from "./FieldsetPetsInfo";
import { Button } from "../../ui-kit/Base";
import { StepsContent, StepsAction } from "../styles";
import { FieldSetPaymentInfo } from "./FieldSetPaymentInfo";
import { next, prev, boardingFormValidator } from "../helpers";
import {
  createGuestReservationDraft,
  deleteGuestPet,
  guestFormSubmit,
} from "./services";
import {
  INITIAL_USER_STATE,
  INITIAL_RESERVATION_STATE,
} from "../formInitialState";
import { WarningOutlined } from "@ant-design/icons";

const { Step } = Steps;

export const GuestClientForm = () => {
  const {
    guestFormState,
    guestFormDispatch,
    setGuestFormError,
    handleChange,
    guestFormError,
    setGuestFormLoading,
    guestFormLoading,
  } = useGuestFormContext();

  const [pets, setPets] = useState([]);
  const [current, setCurrent] = useState(0);

  const formSteps = [
    {
      title: "Owner",
      content: (
        <FieldsetClientInfo
          initialState={INITIAL_USER_STATE}
          state={guestFormState}
          handleChange={handleChange}
          formLoading={guestFormLoading}
        />
      ),
    },
    {
      title: "Boarding",
      content: (
        <FieldsetClientInfo
          initialState={INITIAL_RESERVATION_STATE}
          state={guestFormState}
          handleChange={handleChange}
          formLoading={guestFormLoading}
        />
      ),
    },
    {
      title: "Pets",
      content: (
        <FieldsetPetsInfo
          pets={pets}
          setPets={setPets}
          formState={guestFormState}
          formDispatch={guestFormDispatch}
          onDelete={(petId) => {
            deleteGuestPet(petId).then(() => {
              setPets(pets.filter((pet) => pet.id !== petId));
            });
          }}
          apiPath="/api/guest-pet"
        />
      ),
    },
    {
      title: "Deposit",
      content: <FieldSetPaymentInfo pets={pets} />,
    },
  ];

  return (
    <>
      <FormIntroGuest />
      <form
        onSubmit={(e) => {
          guestFormSubmit(e, {
            state: guestFormState,
            setFormError: setGuestFormError,
            dispatch: guestFormDispatch,
          });
        }}
      >
        <Steps current={current}>
          {formSteps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <StepsContent>{formSteps[current].content}</StepsContent>
        {guestFormError && (
          <BlockQuote>
            <WarningOutlined />
            <p>{guestFormError}</p>
          </BlockQuote>
        )}
        <StepsAction>
          {current > 0 && (
            <Button type="button" onClick={() => prev({ current, setCurrent })}>
              Previous
            </Button>
          )}

          {current < formSteps.length - 1 && (
            <Button
              type="button"
              onClick={() => {
                if (pets.length === 0 && current === 2) {
                  setGuestFormError(
                    "Please add a pet to continue with your reservation request."
                  );
                  return;
                } else {
                  setGuestFormError("");
                }

                if (current < 2) {
                  const fieldsValid = boardingFormValidator(
                    {
                      currentFormSection: current,
                    },
                    {
                      state: guestFormState,
                      dispatch: guestFormDispatch,
                    }
                  );

                  if (fieldsValid) {
                    const draftCreated = guestFormState.reservationId;
                    if (!draftCreated) {
                      setGuestFormLoading(true);
                      createGuestReservationDraft(undefined, {
                        state: guestFormState,
                        setFormError: setGuestFormError,
                        dispatch: guestFormDispatch,
                        apiPath: "/api/guest-reservation",
                      }).then(() => {
                        setGuestFormLoading(false);
                        next({ current, setCurrent });
                      });
                    } else {
                      next({ current, setCurrent });
                    }
                  }
                } else {
                  next({ current, setCurrent });
                }
              }}
              disabled={guestFormLoading}
            >
              Next
            </Button>
          )}
        </StepsAction>
      </form>
    </>
  );
};
