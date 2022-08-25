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

export const formReducer = (
  state,
  { type = "inputChange", key = undefined, payload = undefined }
) => {
  switch (type) {
    case "depositConfirmed":
      return { ...state, ...payload };
    case "resetForm":
      return { ...INITIAL_STATE };
    case "inputChange":
      const inputState = {
        ...state[key],
        value: payload.newValue,
        error: payload.error,
      };
      return {
        ...state,
        [key]: inputState,
      };
  }
};
