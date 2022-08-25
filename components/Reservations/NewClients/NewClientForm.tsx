import React, { useState } from "react";
import { Steps } from "antd";
import Router from "next/router";
import { FormIntroGuest } from "./FormIntro";
import { useGuestFormContext } from "./formContext";
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
import { FieldSetPaymentInfo } from "./FieldSetPaymentInfo";

const { Step } = Steps;

export const NewClientForm = () => {
  const { state, dispatch, setFormError } = useGuestFormContext();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e?.preventDefault();
    const data = Object.entries(state).map(([key, _value]) => {
      return {
        [key]: state[key].value !== undefined ? state[key].value : state[key],
      };
    });
    setFormError(undefined);
    try {
      await fetch("/api/guest-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.assign({}, ...data)),
      })
        .then((res) => {
          return res.json();
        })
        .then(async (res) => {
          if (res.errors) {
            const validationError =
              "Form submission failed. Please verify all required fields are filled out.";
            Object.entries(res.errors).forEach(([key, value]) => {
              dispatch({
                key: key,
                payload: {
                  newValue: state[key].value,
                  error: value,
                },
              });
            });
            setFormError(validationError);
            throw new Error(validationError);
          }
          dispatch({
            type: "resetForm",
          });
          await Router.push("/res-guest/[id]", `/res-guest/${res.id}`);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const theFieldsAreValid = (currentFormSection) => {
    let sectionInputs = [
      INITIAL_USER_STATE,
      INITIAL_RESERVATION_STATE,
      INITIAL_PETS_STATE,
    ];
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
      content: <FieldSetPaymentInfo submitData={submitData} />,
    },
  ];

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
        </StepsAction>
      </form>
    </>
  );
};
