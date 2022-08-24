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

export const formReducer = (state, { key, payload }) => {
  const inputState = {
    ...state[key],
    value: payload.newValue,
    error: payload.error,
  };
  return {
    ...state,
    [key]: inputState,
  };
};
