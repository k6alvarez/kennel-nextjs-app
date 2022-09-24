import {
  INITIAL_USER_STATE,
  INITIAL_RESERVATION_STATE,
} from "./formInitialState";
import {
  INITIAL_PETS_STATE,
  PET_FIVE_INITIAL_STATE,
  PET_FOUR_INITIAL_STATE,
  PET_THREE_INITIAL_STATE,
  PET_TWO_INITIAL_STATE,
} from "./formInitialStatePets";

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
    case "clearPet":
      let petInitialState;
      if (payload.petNumber === 2) {
        petInitialState = PET_TWO_INITIAL_STATE;
      }
      if (payload.petNumber === 3) {
        petInitialState = PET_THREE_INITIAL_STATE;
      }
      if (payload.petNumber === 4) {
        petInitialState = PET_FOUR_INITIAL_STATE;
      }
      if (payload.petNumber === 5) {
        petInitialState = PET_FIVE_INITIAL_STATE;
      }
      return {
        ...guestFormState,
        ...petInitialState,
      };
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
