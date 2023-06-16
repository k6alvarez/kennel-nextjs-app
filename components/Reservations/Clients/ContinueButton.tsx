import React from "react";
import { useClientFormContext } from "../formContext";
import { Button } from "../../ui-kit/Base";
import { boardingFormValidator, next } from "../helpers";
import { ArrowRightOutlined } from "@ant-design/icons";

export const ContinueButton = ({
  current,
  formSteps,
  setCurrent,
  sessionUser,
}) => {
  const {
    clientFormState,
    clientFormDispatch,
    clientFormError,
    setClientFormError,
    clientFormLoading,
  } = useClientFormContext();

  const petsNotAdded = clientFormState.pets.length === 0 && current === 2;
  const checkPetsAdded = (e) => {
    if (petsNotAdded) {
      e.preventDefault();
      setClientFormError(
        "Please add a pet to continue with your reservation request."
      );
      return;
    } else {
      setClientFormError("");
    }
  };

  const validateFields = () => {
    const fieldsValid = boardingFormValidator(
      {
        currentFormSection: current,
      },
      {
        state: clientFormState,
        dispatch: clientFormDispatch,
      }
    );

    if (fieldsValid) {
      const shouldUpdateUser = current === 0;
      if (shouldUpdateUser) {
        clientFormDispatch({
          type: "updateUser",
          payload: {
            user: sessionUser,
          },
        });
      }
      next({ current, setCurrent });
    } else {
      setClientFormError("Please verify all required fields are filled out.");
    }
  };

  const handleContinue = () => {
    if (current < 2) {
      validateFields();
    } else {
      !petsNotAdded && next({ current, setCurrent });
    }
  };

  return (
    <>
      {current < formSteps.length - 1 && (
        <Button
          type="button"
          onClick={(e) => {
            checkPetsAdded(e);
            handleContinue();
          }}
          disabled={clientFormLoading}
        >
          Next <ArrowRightOutlined />
        </Button>
      )}
    </>
  );
};
