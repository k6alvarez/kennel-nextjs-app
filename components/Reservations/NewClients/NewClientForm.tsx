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
import { next, prev, theFieldsAreValid } from "./helpers";
import { submitData } from "./services";

const { Step } = Steps;

export const NewClientForm = () => {
  const { state, dispatch, setFormError } = useGuestFormContext();
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
      content: <FieldsetPetsInfo />,
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
          submitData(e, { state, setFormError, dispatch });
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
          {current < formSteps.length - 1 && (
            <Button
              primary
              type="button"
              onClick={() => {
                if (theFieldsAreValid(current, { state, dispatch })) {
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
