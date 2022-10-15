import {
  INITIAL_USER_STATE,
  INITIAL_RESERVATION_STATE,
} from "../formInitialState";

export const INITIAL_STATE = {
  ...INITIAL_USER_STATE,
  ...INITIAL_RESERVATION_STATE,
  pets: {},
};

export const INITIAL_CLIENT_STATE = {
  ...INITIAL_STATE,
  email: {
    value: "",
    error: null,
    type: "text",
    inputMode: "email",
    label: "Email",
    required: true,
    grow: true,
    disabled: true,
  },
};

export const guestFormReducer = (
  guestFormState: { [x: string]: any },
  { type = "inputChange", key = undefined, payload = undefined }: any
) => {
  switch (type) {
    case "formDraftCreated":
      return {
        ...guestFormState,
        ...payload,
      };
    case "depositConfirmed":
      return { ...guestFormState, ...payload };
    case "resetForm":
      return { ...INITIAL_STATE };
    case "toggleGuestPet":
      const petToggled = payload.pet;
      let pets = guestFormState.pets;
      const petCheck = Object.entries(pets).filter((pet) => {
        return petToggled.id === pet.id;
      });
      if (petCheck.length > 0) {
        pets = pets.filter((pet) => {
          return pet.id !== petToggled.id;
        });
        return {
          ...guestFormState,
          pets,
        };
      } else {
        return {
          ...guestFormState,
          pets,
        };
      }

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
