import React, { useEffect, useState } from "react";
import { Steps } from "antd";

import { BlockQuote, FormIntroGuest } from "./FormIntro";
import { useGuestFormContext } from "../formContext";
import { FieldsetClientInfo } from "../FieldsetFromState";
import { FieldsetPetsInfo } from "./FieldsetPetsInfo";
import { Button } from "../../ui-kit/Base";
import { StepsContent, StepsAction } from "../styles";
import { FieldSetPaymentInfo } from "./FieldSetPaymentInfo";
import { next, prev, guestFormFieldsValid } from "../helpers";
import { guestFormCreateDraft, guestFormSubmit } from "./services";
import {
  INITIAL_USER_STATE,
  INITIAL_RESERVATION_STATE,
} from "../formInitialState";
import { Error } from "../../Forms/styles";

const { Step } = Steps;

export const GuestClientForm = () => {
  const {
    guestFormState,
    guestFormDispatch,
    setFormError,
    handleChange,
    guestFormError,
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
        />
      ),
    },
    {
      title: "Pets",
      content: <FieldsetPetsInfo pets={pets} setPets={setPets} />,
    },
    {
      title: "Deposit",
      content: <FieldSetPaymentInfo />,
    },
  ];

  return (
    <>
      <FormIntroGuest />
      <form
        onSubmit={(e) => {
          guestFormSubmit(e, {
            state: guestFormState,
            setFormError,
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
        <BlockQuote>{guestFormError}</BlockQuote>
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
                  setFormError("Please add a pet to continue.");
                  return;
                } else {
                  setFormError("");
                }

                if (current < 2) {
                  const fieldsValid = guestFormFieldsValid(
                    {
                      currentFormSection: current,
                    },
                    {
                      state: guestFormState,
                      dispatch: guestFormDispatch,
                    }
                  );

                  if (fieldsValid) {
                    const draftRequired = !guestFormState.id && current === 0;

                    if (draftRequired) {
                      guestFormCreateDraft(undefined, {
                        state: guestFormState,
                        setFormError,
                        dispatch: guestFormDispatch,
                      });
                    }
                    next({ current, setCurrent });
                  }
                } else {
                  next({ current, setCurrent });
                }
              }}
            >
              Next
            </Button>
          )}
        </StepsAction>
      </form>
    </>
  );
};
