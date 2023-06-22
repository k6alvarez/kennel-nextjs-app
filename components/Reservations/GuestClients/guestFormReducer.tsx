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
    disabled: true,
  },
  pets: [],
};

export const guestFormReducer = (
  guestFormState,
  { type = "inputChange", key = undefined, payload = undefined }
) => {
  switch (type) {
    case "formDraftCreated":
      return {
        ...guestFormState,
        ...payload,
      };
    case "depositConfirmed":
      console.log("depositConfirmed", guestFormState);
      return { ...guestFormState, ...payload };
    case "resetForm":
      return { ...INITIAL_STATE };
    case "togglePet":
      const petToggled = payload.pet;
      let pets = guestFormState.pets;
      const petCheck = Object.entries(pets).filter((pet: any) => {
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
          pets: { ...pets, ...petToggled },
        };
      }

    case "inputChange":
      const inputState = {
        ...guestFormState[key],
        value: payload.newValue,
        error: payload.error,
      };

      if (key === "arrivalDate") {
        const keyDependentInput = "departureDate";
        return {
          ...guestFormState,
          [key]: inputState,
          [keyDependentInput]: {
            ...guestFormState[keyDependentInput],
            error: null,
          },
        };
      }

      if (key === "departureDate") {
        const keyDependentInput = "arrivalDate";
        return {
          ...guestFormState,
          [key]: inputState,
          [keyDependentInput]: {
            ...guestFormState[keyDependentInput],
            error: null,
          },
        };
      }

      return {
        ...guestFormState,
        [key]: inputState,
      };
  }
};
