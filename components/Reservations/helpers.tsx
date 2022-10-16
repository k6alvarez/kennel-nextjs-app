import { DateTime } from "luxon";
import { PET_INITIAL_STATE } from "../Pets/petFormReducer";
import {
  INITIAL_USER_STATE,
  INITIAL_RESERVATION_STATE,
  timeOpen,
  timeFormat,
  timeClose,
  timeBreakClose,
  timeBreakOpen,
} from "./formInitialState";

export const next = ({ current, setCurrent }) => {
  setCurrent(current + 1);
};

export const prev = ({ current, setCurrent }) => {
  setCurrent(current - 1);
};

export const requiredFieldsCheck = (field, petCount = 0) => {
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
    const requiredFieldMissing =
      fieldFromState.required && !fieldFromState.value;

    const fieldEmailInvalid =
      fieldFromState.inputMode === "email" &&
      !/^[^@]+@[^@]+\.[^@]+$/.test(fieldFromState.value);

    const fieldPhoneInvalid =
      fieldFromState.inputMode === "tel" &&
      !/^\d{3}-\d{3}-\d{4}$/.test(
        fieldFromState.value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
      );

    if (requiredFieldMissing) {
      const error = `${fieldFromState.label} is required.`;

      dispatch({
        key: field[0],
        payload: { newValue: fieldFromState.value, error },
      });
      return false;
    }

    if (fieldEmailInvalid) {
      const error = `${fieldFromState.label} is not a valid email address.`;
      dispatch({
        key: field[0],
        payload: { newValue: fieldFromState.value, error },
      });
      return false;
    }

    if (fieldPhoneInvalid) {
      const error = `${fieldFromState.label} is not a valid phone number.`;
      dispatch({
        key: field[0],
        payload: { newValue: fieldFromState.value, error },
      });
      return false;
    }

    if (field[0] === "arrivalDate" || field[0] === "departureDate") {
      const weekday = DateTime.fromISO(fieldFromState.value).weekday;

      if (weekday === 6) {
        const error = `We are closed on Saturdays. Please select a new ${fieldFromState.label}.`;
        dispatch({
          key: field[0],
          payload: { newValue: fieldFromState.value, error },
        });
        return false;
      }
    }

    if (field[0] === "arrivalTime" || field[0] === "departureTime") {
      const time = DateTime.fromISO(fieldFromState.value).toLocaleString(
        timeFormat
      );

      if (time < timeOpen) {
        const error = `We are not open until ${DateTime.fromISO(
          timeOpen
        ).toLocaleString(DateTime.TIME_SIMPLE)}. Please select a new ${
          fieldFromState.label
        }.`;
        dispatch({
          key: field[0],
          payload: { newValue: fieldFromState.value, error },
        });
        return false;
      }

      if (time > timeBreakClose && time < timeBreakOpen) {
        const error = `We are closed from ${DateTime.fromISO(
          timeBreakClose
        ).toLocaleString(DateTime.TIME_SIMPLE)} to ${DateTime.fromISO(
          timeBreakOpen
        ).toLocaleString(DateTime.TIME_SIMPLE)}. Please select a new ${
          fieldFromState.label
        }.`;
        dispatch({
          key: field[0],
          payload: { newValue: fieldFromState.value, error },
        });
        return false;
      }

      if (time > timeClose) {
        const error = `We are closed at ${DateTime.fromISO(
          timeClose
        ).toLocaleString(DateTime.TIME_SIMPLE)}. Please select a new ${
          fieldFromState.label
        }.`;
        dispatch({
          key: field[0],
          payload: { newValue: fieldFromState.value, error },
        });
        return false;
      }
    }
  }

  return true;
};
