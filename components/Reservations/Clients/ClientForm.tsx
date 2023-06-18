import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import { StepsContent, StepsAction } from "../styles";
import { useClientFormContext } from "../formContext";
import {
  INITIAL_RESERVATION_STATE,
  INITIAL_USER_STATE,
} from "../formInitialState";
import { FieldsetClientInfo } from "../FieldsetFromState";
import { getPets } from "../../Pets/services";
import { FieldsetPetsInfo } from "../GuestClients/FieldsetPetsInfo";
import { BlockQuote } from "../GuestClients/FormIntro";
import { ReservationSummary } from "../ReservationSummary";
import { WarningOutlined } from "@ant-design/icons";
import { renderFormFields } from "../../Forms/renderFormFields";
import { Fieldset, Fields } from "../../Forms/styles";
import { GoBackButton } from "./GoBackButton";
import { SubmitReservationButton } from "./SubmitReservationButton";
import { ContinueButton } from "./ContinueButton";

const { Step } = Steps;

export const ClientForm = ({ user }) => {
  const {
    clientFormState,
    handleChange,
    clientFormDispatch,
    clientFormError,
    setClientFormError,
    clientFormLoading,
  } = useClientFormContext();

  const [current, setCurrent] = useState(0);

  const [pets, setPets] = useState([]);

  const updatePets = () =>
    getPets().then((pets) => {
      setPets(pets);
    });

  useEffect(() => {
    if (user) {
      clientFormDispatch({
        type: "setUpClientForm",
        payload: {
          user,
        },
      });

      updatePets();
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
        <Fieldset>
          <Fields>
            {renderFormFields({
              initialState: INITIAL_RESERVATION_STATE,
              state: clientFormState,
              handleChange,
            })}
          </Fields>
        </Fieldset>
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
          refetchPets={updatePets}
          apiPath="/api/pet"
          toggle={(pet) => {
            clientFormDispatch({
              type: "togglePet",
              payload: {
                pet,
              },
            });
            setClientFormError(null);
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
      {!clientFormLoading && (
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
            <GoBackButton current={current} setCurrent={setCurrent} />

            <ContinueButton
              current={current}
              setCurrent={setCurrent}
              formSteps={formSteps}
              formError={clientFormError}
              formState={clientFormState}
              formDispatch={clientFormDispatch}
              setFormError={setClientFormError}
              fieldsValidCallback={() => {
                const shouldUpdateUser = current === 0;
                if (shouldUpdateUser) {
                  clientFormDispatch({
                    type: "updateUser",
                    payload: {
                      user,
                    },
                  });
                }
              }}
            />

            <SubmitReservationButton current={current} />
          </StepsAction>
        </form>
      )}
    </>
  );
};
