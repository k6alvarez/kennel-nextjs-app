import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Steps } from "antd";
import { StepsContent, StepsAction } from "../styles";
import { Button } from "../../ui-kit/Base";
import { next, prev } from "../helpers";
import { Fields } from "../../Forms/styles";
import { renderFormFields } from "../../Forms/renderFormFields";
import { useClientFormContext } from "../formContext";
import {
  INITIAL_RESERVATION_STATE,
  INITIAL_USER_STATE,
} from "../formInitialState";
import { INITIAL_PETS_STATE } from "../formInitialStatePets";
import { FieldsetClientInfo } from "../FieldsetFromState";

const { Step } = Steps;

export const ClientForm = ({ session, user }) => {
  const { clientFormState, handleChange, clientFormDispatch } =
    useClientFormContext();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (session) {
      clientFormDispatch({
        type: "setUpClientForm",
        payload: {
          user,
        },
      });
    }
  }, []);

  const formSteps = [
    {
      title: "Owner",
      content: (
        <FieldsetClientInfo
          initialState={INITIAL_USER_STATE}
          state={clientFormState}
          handleChange={handleChange}
        />
      ),
    },
    {
      title: "Boarding",
      content: (
        <FieldsetClientInfo
          initialState={INITIAL_RESERVATION_STATE}
          state={clientFormState}
          handleChange={handleChange}
        />
      ),
    },
    {
      title: "Pets",
      content: (
        <fieldset>
          <Fields>
            {renderFormFields({
              initialState: INITIAL_PETS_STATE,
              state: clientFormState,
              handleChange,
            })}
          </Fields>
        </fieldset>
      ),
    },
  ];

  const clientFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // try {
    //   await fetch("/api/reservation", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(fields),
    //   }).then((res) => {
    //     console.log(res);
    //   });
    //   // await Router.push("/draft-reservations");
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <>
      <p>Let's get started with your boarding reservation.</p>
      <form onSubmit={clientFormSubmit}>
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
              type="button"
              onClick={() => {
                next({ current, setCurrent });
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
