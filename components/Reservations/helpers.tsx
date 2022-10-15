import { PET_INITIAL_STATE } from "../Pets/petFormReducer";
import {
  INITIAL_USER_STATE,
  INITIAL_RESERVATION_STATE,
} from "./formInitialState";

export const next = ({ current, setCurrent }) => {
  setCurrent(current + 1);
};

export const prev = ({ current, setCurrent }) => {
  setCurrent(current - 1);
};

export const requiredFieldsCheck = (
  field: string | string[],
  petCount: any
) => {
  let x: any;
  switch (petCount) {
    case 1:
      x = field.includes("One");
      return x;
    case 2:
      x = field.includes("One") || field.includes("Two");
      return x;
    case 3:
      x =
        field.includes("One") ||
        field.includes("Two") ||
        field.includes("Three");
      return x;
    case 4:
      x =
        field.includes("One") ||
        field.includes("Two") ||
        field.includes("Three") ||
        field.includes("Four");
      return x;
    case 5:
      x =
        field.includes("One") ||
        field.includes("Two") ||
        field.includes("Three") ||
        field.includes("Four") ||
        field.includes("Five");
      return x;
  }
};

export const guestFormFieldsValid = (
  { currentFormSection, petCount },
  { state, dispatch }
) => {
  let sectionInputs = [
    INITIAL_USER_STATE,
    INITIAL_RESERVATION_STATE,
    PET_INITIAL_STATE,
  ];
  for (const field of Object.entries(sectionInputs[currentFormSection])) {
    const fieldFromState = state[field[0]];

    const requiredFieldsExist = requiredFieldsCheck(field[0], petCount);

    if (
      requiredFieldsExist &&
      fieldFromState.required &&
      !fieldFromState.value
    ) {
      const error = `${fieldFromState.label} is required`;
      dispatch({
        key: field[0],
        payload: { newValue: fieldFromState.value, error },
      });
      return false;
    }

    if (
      field[0] === "email" &&
      !/^[^@]+@[^@]+\.[^@]+$/.test(fieldFromState.value)
    ) {
      const error = `${fieldFromState.label} is not a valid email address`;
      dispatch({
        key: field[0],
        payload: { newValue: fieldFromState.value, error },
      });
      return false;
    }

    // if (petCount === 2) {

    // }

    // if (field[0] === "arrivalDate") {
    //   const error = `We are closed Saturdays. Please choose a new ${fieldFromState.label}`;
    //   dispatch({
    //     key: field[0],
    //     payload: { newValue: fieldFromState.value, error },
    //   });
    //   return false;
    // }
  }

  return true;
};
