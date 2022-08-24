import React, { useState } from "react";
import { Steps } from "antd";
import Router from "next/router";
import { FormIntroGuest } from "./FormIntro";
import { useFormContext } from "./formContext";
import { FieldsetBoardingInfo } from "./FieldsetBoardingInfo";
import { FieldsetClientInfo } from "./FieldsetClientInfo";
import { FieldsetPetsInfo } from "./FieldsetPetsInfo";
import { Button } from "../../ui-kit/Base";
import { StepsContent, StepsAction } from "./styles";
import {
  INITIAL_PETS_STATE,
  INITIAL_RESERVATION_STATE,
  INITIAL_USER_STATE,
} from "./formInitialState";

const { Step } = Steps;

const formSteps = [
  {
    title: "Your Information",
    content: <FieldsetClientInfo />,
  },
  {
    title: "Boarding Information",
    content: <FieldsetBoardingInfo />,
  },
  {
    title: "Pet Information",
    content: <FieldsetPetsInfo />,
  },
  {
    title: "Payment Information",
    content: (
      <fieldset>
        <p>payment</p>
      </fieldset>
    ),
  },
];

export const NewClientForm = () => {
  const { state, dispatch } = useFormContext();

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = Object.entries(state).map(([key, _value]) => {
      return { [key]: state[key].value };
    });
    try {
      await fetch("/api/guest-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.assign({}, ...data)),
      }).then((res) => {
        return res.json();
      }).then(async(res) => {
        console.log(res);
        await Router.push("/guest-reservation/[id]", `/guest-reservation/${res.id}`)
      })
    } catch (error) {
      console.error(error);
    }
  };

  const theFieldsAreValid = (currentFormSection) => {
    let sectionInputs = [INITIAL_USER_STATE, INITIAL_RESERVATION_STATE, INITIAL_PETS_STATE];
    for (const field of Object.entries(sectionInputs[currentFormSection])) {
      if (state[field[0]].required && !state[field[0]].value) {
        const error = `${state[field[0]].label} is required`;
        dispatch({
          key: field[0],
          payload: { newValue: state[field[0]].value, error },
        });
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <FormIntroGuest />
      <form onSubmit={submitData}>
        <Steps current={current}>
          {formSteps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <StepsContent>{formSteps[current].content}</StepsContent>
        <StepsAction>
          {current > 0 && (
            <Button type="button" onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current < formSteps.length - 1 && (
            <Button
              primary
              type="button"
              onClick={() => {
                if (theFieldsAreValid(current)) {
                  next();
                }
              }}
            >
              Next
            </Button>
          )}
          {current === formSteps.length - 1 && (
            <input type="submit" value="Create Reservation" />
          )}
        </StepsAction>
      </form>
    </>
  );
};
