import {
  INITIAL_USER_STATE,
  INITIAL_RESERVATION_STATE,
  INITIAL_PETS_STATE,
} from "./formInitialState";

export const next = ({ current, setCurrent }) => {
  setCurrent(current + 1);
};

export const prev = ({ current, setCurrent }) => {
  setCurrent(current - 1);
};

export const guestFormFieldsValid = (
  currentFormSection,
  { state, dispatch }
) => {
  let sectionInputs = [
    INITIAL_USER_STATE,
    INITIAL_RESERVATION_STATE,
    INITIAL_PETS_STATE,
  ];
  for (const field of Object.entries(sectionInputs[currentFormSection])) {
    const fieldFromState = state[field[0]];
    if (fieldFromState.required && !fieldFromState.value) {
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

    if (field[0] === "arrivalDate") {
      const error = `We are closed Saturdays. Please choose a new ${fieldFromState.label}`;
      dispatch({
        key: field[0],
        payload: { newValue: fieldFromState.value, error },
      });
      return false;
    }
  }

  return true;
};
