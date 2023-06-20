import React from "react";
import { Button } from "../../ui-kit/Base";
import { boardingFormValidator, next } from "../helpers";
import { ArrowRightOutlined } from "@ant-design/icons";

export const ContinueButton = ({
  current,
  formSteps,
  setCurrent,
  formState,
  formDispatch,
  formError,
  setFormError,
  fieldsValidCallback = undefined,
}) => {
  const petsNotAdded = !formState.pets.length && current === 2;

  const checkPetsAdded = (e) => {
    if (petsNotAdded) {
      e.preventDefault();
      setFormError(
        "Please add a pet to continue with your reservation request."
      );
      return;
    } else {
      setFormError("");
    }
  };

  const validateFields = () => {
    const fieldsValid = boardingFormValidator(
      {
        currentFormSection: current,
      },
      {
        state: formState,
        dispatch: formDispatch,
      }
    );

    if (fieldsValid) {
      fieldsValidCallback && fieldsValidCallback();
      next({ current, setCurrent });
    } else {
      setFormError("Please verify all required fields are filled out.");
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
          disabled={formError}
        >
          Next <ArrowRightOutlined />
        </Button>
      )}
    </>
  );
};
