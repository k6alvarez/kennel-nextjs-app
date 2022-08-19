import React, { useState, useReducer } from "react";
import { message, Steps } from "antd";
import { FormIntroGuest } from "./FormIntro";
import { formReducer, INITIAL_STATE } from "./formReducer";
import { FormProvider } from "./formContext";
import { FieldsetBoardingInfo } from "./FieldsetBoardingInfo";
import { FieldsetClientInfo } from "./FieldsetClientInfo";
import { FieldsetPetsInfo } from "./FieldsetPetsInfo";
import styled from "styled-components";

const StepsAction = styled.div`
  display: flex;
`;
const StepsContent = styled.div`
  width: 100%;
`;
const { Step } = Steps;

const steps = [
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
        {/* <input type="submit" value="Create Reservation    " /> */}
      </fieldset>
    ),
  },
];

export const NewClientForm = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/guest-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      }).then((res) => {
        console.log(res);
      });
      // await Router.push("/draft-guest-reservations");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (name, newValue) => {
    // const error = validateInput(name, newValue);
    const error = null;
    dispatch({
      key: name,
      payload: { newValue, error },
    });
  };

  return (
    <>
      <FormIntroGuest />
      <form onSubmit={submitData}>
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <FormProvider value={{ state, handleChange }}>
          <StepsContent>{steps[current].content}</StepsContent>
          <StepsAction>
            {current > 0 && <button onClick={() => prev()}>Previous</button>}
            {current < steps.length - 1 && (
              <button onClick={() => next()}>Next</button>
            )}
            {current === steps.length - 1 && (
              <button onClick={() => message.success("Processing complete!")}>
                Done
              </button>
            )}
          </StepsAction>
        </FormProvider>
      </form>
    </>
  );
};
