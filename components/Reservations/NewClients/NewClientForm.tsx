import React, { useState } from "react";
import { Steps } from "antd";
import { FormIntroGuest } from "./FormIntro";
import { useGuestFormContext } from "./formContext";
import { FieldsetBoardingInfo } from "./FieldsetBoardingInfo";
import { FieldsetClientInfo } from "./FieldsetClientInfo";
import { FieldsetPetsInfo } from "./FieldsetPetsInfo";
import { Button } from "../../ui-kit/Base";
import { StepsContent, StepsAction } from "./styles";
import { FieldSetPaymentInfo } from "./FieldSetPaymentInfo";
import { next, prev, guestFormFieldsValid } from "./helpers";
import { guestFormSubmit } from "./services";

const { Step } = Steps;

export const NewClientForm = () => {
  const { guestFormState, guestFormDispatch, setFormError } =
    useGuestFormContext();
  const [pets, setPets] = useState(1);
  const [current, setCurrent] = useState(0);

  const formSteps = [
    {
      title: "Owner",
      content: <FieldsetClientInfo />,
    },
    {
      title: "Boarding",
      content: <FieldsetBoardingInfo />,
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
        <StepsAction>
          {current > 0 && (
            <Button type="button" onClick={() => prev({ current, setCurrent })}>
              Previous
            </Button>
          )}
          {current === 2 && (
            <Button
              type="button"
              disabled={pets >= 5}
              onClick={() => {
                setPets(pets + 1);
              }}
              primary
            >
              Add Pet
            </Button>
          )}
          {current < formSteps.length - 1 && (
            <Button
              type="button"
              onClick={() => {
                if (
                  guestFormFieldsValid(
                    {
                      currentFormSection: current,
                      petCount: pets,
                    },
                    {
                      state: guestFormState,
                      dispatch: guestFormDispatch,
                    }
                  )
                ) {
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
