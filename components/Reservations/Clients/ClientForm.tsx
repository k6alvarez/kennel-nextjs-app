import React, { useEffect, useState } from "react";
import Router from "next/router";

import { message, Steps } from "antd";
import { StepsContent, StepsAction } from "../styles";
import { Button } from "../../ui-kit/Base";
import { guestFormFieldsValid, next, prev } from "../helpers";
import { useClientFormContext } from "../formContext";
import {
  INITIAL_RESERVATION_STATE,
  INITIAL_USER_STATE,
} from "../formInitialState";
import { FieldsetClientInfo } from "../FieldsetFromState";
import { getPets, getUser } from "../../Pets/services";
import { FieldsetPetsInfo } from "../GuestClients/FieldsetPetsInfo";
import { BlockQuote } from "../GuestClients/FormIntro";
import { ReservationSummary } from "../ReservationSummary";
import { WarningOutlined } from "@ant-design/icons";

export const createReservationDraft = async (
  e: React.SyntheticEvent,
  { state, setFormError, dispatch, apiPath }
) => {
  e?.preventDefault();
  const cloneState = { ...state };
  delete cloneState["name"];
  delete cloneState["lastName"];
  delete cloneState["email"];
  delete cloneState["phone"];
  delete cloneState["address"];
  delete cloneState["unit"];
  delete cloneState["city"];
  delete cloneState["state"];
  delete cloneState["zip"];
  delete cloneState["altPhone"];
  delete cloneState["emergencyContactName"];
  delete cloneState["emergencyContactPhone"];
  delete cloneState["howHear"];
  message.loading("Sending reservation request.", 1);
  const data = Object.entries(cloneState).map(([key, _value]) => {
    return {
      [key]: state[key].value !== undefined ? state[key].value : state[key],
    };
  });
  setFormError(undefined);
  try {
    await fetch(apiPath, {
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
            "Please verify all required fields are filled out.";
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
          type: "formDraftCreated",
          payload: {
            reservationId: res.id,
          },
        });
        message.success("Reservation request submitted successfully.");
        await Router.push("/reservation/[id]", `/reservation/${res.id}`);
      });
  } catch (error) {
    console.error(error);
  }
};

const { Step } = Steps;

export const ClientForm = ({ session }) => {
  const {
    clientFormState,
    handleChange,
    clientFormDispatch,
    clientFormError,
    setClientFormError,
    clientFormLoading,
    setClientFormLoading,
  } = useClientFormContext();

  const [current, setCurrent] = useState(0);

  const [pets, setPets] = useState([]);

  useEffect(() => {
    if (session) {
      getUser()
        .then((user) => {
          clientFormDispatch({
            type: "setUpClientForm",
            payload: {
              user,
            },
          });
        })
        .then(() => {
          getPets().then((pets) => {
            setPets(pets);
          });
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
        <FieldsetPetsInfo
          pets={pets}
          setPets={setPets}
          formState={clientFormState}
          formDispatch={clientFormDispatch}
          apiPath="/api/pet"
          toggle={(pet) => {
            clientFormDispatch({
              type: "togglePet",
              payload: {
                pet,
              },
            });
          }}
        />
      ),
    },
    {
      title: "Summary",
      content: (
        <ReservationSummary
          state={clientFormState}
          pets={clientFormState.pets}
        />
      ),
    },
  ];

  return (
    <>
      <p>
        Let's get started with your boarding reservation. Verify your details
        below.
      </p>
      <form>
        <Steps current={current}>
          {formSteps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <StepsContent>{formSteps[current].content}</StepsContent>
        {clientFormError && (
          <BlockQuote large>
            <WarningOutlined />
            <p>{clientFormError}</p>
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
                if (clientFormState.pets.length === 0 && current === 2) {
                  setClientFormError(
                    "Please add a pet to continue with your reservation request."
                  );
                  return;
                } else {
                  setClientFormError("");
                }

                if (current < 2) {
                  const fieldsValid = guestFormFieldsValid(
                    {
                      currentFormSection: current,
                    },
                    {
                      state: clientFormState,
                      dispatch: clientFormDispatch,
                    }
                  );
                  next({ current, setCurrent });
                } else {
                  next({ current, setCurrent });
                }
              }}
              disabled={clientFormLoading}
            >
              Next
            </Button>
          )}

          {current === 3 && (
            <Button
              type="button"
              primary
              onClick={() => {
                setClientFormLoading(true);
                createReservationDraft(undefined, {
                  state: clientFormState,
                  setFormError: setClientFormError,
                  dispatch: clientFormDispatch,
                  apiPath: "/api/reservation",
                }).then(() => {
                  setClientFormLoading(false);
                });
              }}
              disabled={clientFormLoading}
            >
              Submit Reservation
            </Button>
          )}
        </StepsAction>
      </form>
    </>
  );
};
