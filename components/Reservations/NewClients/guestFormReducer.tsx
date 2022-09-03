import {
  INITIAL_USER_STATE,
  INITIAL_RESERVATION_STATE,
  INITIAL_PETS_STATE,
} from "./formInitialState";

export const INITIAL_STATE = {
  ...INITIAL_USER_STATE,
  ...INITIAL_RESERVATION_STATE,
  ...INITIAL_PETS_STATE,
};

export const guestFormReducer = (
  guestFormState: { [x: string]: any },
  { type = "inputChange", key = undefined, payload = undefined }: any
) => {
  switch (type) {
    case "depositConfirmed":
      return { ...guestFormState, ...payload };
    case "resetForm":
      return { ...INITIAL_STATE };
    case "inputChange":
      const inputState = {
        ...guestFormState[key],
        value: payload.newValue,
        error: payload.error,
      };
      return {
        ...guestFormState,
        [key]: inputState,
      };
  }
};
