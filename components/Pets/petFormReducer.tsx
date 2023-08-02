import { DateTime } from "luxon";

export const PET_DETAILS = {
  name: {
    value: "",
    error: null,
    type: "text",
    label: "Pet Name",
    required: true,
  },
  type: {
    value: "",
    error: null,
    type: "select",
    options: ["Dog", "Cat"],
    label: "Type",
    required: true,
  },
  breed: {
    value: "",
    error: null,
    type: "text",
    label: "Breed",
    required: true,
  },
  gender: {
    value: "",
    error: null,
    type: "select",
    options: ["Female", "Male"],
    label: "Gender",
    required: true,
  },
  fixed: {
    value: "",
    error: null,
    type: "select",
    options: ["No", "Yes"],
    label: "Fixed",
    required: true,
  },
  color: {
    value: "",
    error: null,
    type: "text",
    label: "Color",
    required: true,
  },
  image: {
    value: "",
    error: null,
    type: "file",
    label: "Pet Image",
  },
};

export const PET_MEDICAL_DETAILS = {
  vaccinations: {
    value: "",
    error: null,
    type: "file",
    label: "Vaccinations Upload",
    required: true,
  },
  distemperVaccine: {
    value: "",
    error: null,
    type: "date",
    label: "Distemper Vaccine Expiration",
    required: true,
  },
  bordetellaVaccine: {
    value: "",
    error: null,
    type: "date",
    label: "Bordetella Vaccine Expiration",
    required: true,
  },
  rabiesVaccine: {
    value: "",
    error: null,
    type: "date",
    label: "Rabies Vaccine Expiration",
    required: true,
  },
  parvoVirusesVaccine: {
    value: "",
    error: null,
    type: "date",
    label: "Parvo Viruses Vaccine Expiration",
    required: true,
  },
};

export const PET_BOARDING_DETAILS = {
  age: {
    value: "",
    error: null,
    type: "number",
    inputMode: "numeric",
    min: "1",
    label: "Age",
    required: true,
  },
  weight: {
    value: "",
    error: null,
    type: "number",
    inputMode: "numeric",
    min: "1",
    label: "Weight (lbs)",
    required: true,
  },
  vet: {
    value: "",
    error: null,
    type: "text",
    label: "Veterinarian",
    required: true,
  },
  preferredRunSize: {
    value: "small",
    error: null,
    type: "select",
    options: [
      "Small",
      "Large",
      "Extra Large",
      "Cat Room",
      "Cat Condo",
      "Shared",
    ],
    label: "Preferred Run Size",
    required: true,
  },
  feeding: {
    value: "",
    error: null,
    type: "select",
    label: "Feeding",
    options: ["Client Food", "Redford Naturals Lamb & Brown Rice"],
    required: true,
  },
  feedingCount: {
    value: "",
    error: null,
    type: "number",
    inputMode: "numeric",
    min: "1",
    label: "Bags Per Feeding",
    required: true,
  },
};

export const PET_INITIAL_STATE = {
  ...PET_DETAILS,
  ...PET_MEDICAL_DETAILS,
  ...PET_BOARDING_DETAILS,
};

export const petFormReducer = (
  guestFormState: { [x: string]: any },
  { type = "inputChange", key = undefined, payload = undefined }: any
) => {
  switch (type) {
    case "resetForm":
      return { ...PET_INITIAL_STATE };
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
    case "setField": {
      const inputState = {
        ...guestFormState[key],
        value: payload.value || "",
        required: payload.required,
        disabled: payload.disabled,
      };
      return {
        ...guestFormState,
        [key]: inputState,
      };
    }
    case "setFormForCat": {
      const pets = payload.pets || [];

      let preferredRunSize = {
        ...guestFormState["preferredRunSize"],
        options: ["Cat Room", "Cat Condo", "Shared"],
      };
      // if pets contains less than 2 cats remove shared option
      if (pets.filter((pet: any) => pet.type === "Cat").length < 2) {
        preferredRunSize = {
          ...guestFormState["preferredRunSize"],
          options: ["Cat Room", "Cat Condo"],
        };
      }

      const bordetellaVaccine = {
        ...guestFormState["bordetellaVaccine"],
        required: false,
        disabled: true,
        error: null,
      };

      return {
        ...guestFormState,
        preferredRunSize,
        bordetellaVaccine,
      };
    }
    case "setFormForDog": {
      const pets = payload.pets || [];

      let preferredRunSize = {
        ...guestFormState["preferredRunSize"],
        options: ["Small", "Large", "Extra Large", "Shared"],
      };

      // if pets contains less than 2 dogs remove shared option
      if (pets.filter((pet: any) => pet.type === "Dog").length < 2) {
        preferredRunSize = {
          ...guestFormState["preferredRunSize"],
          options: ["Small", "Large", "Extra Large"],
        };
      }

      const bordetellaVaccine = {
        ...guestFormState["bordetellaVaccine"],
        required: true,
        disabled: false,
      };

      return {
        ...guestFormState,
        preferredRunSize,
        bordetellaVaccine,
      };
    }
    case "setFormForClientFood": {
      const feedingCount = {
        ...guestFormState["feedingCount"],
        label: "Bags Per Feeding",
      };

      return {
        ...guestFormState,
        feedingCount,
      };
    }
    case "setFormForKennelFood": {
      const feedingCount = {
        ...guestFormState["feedingCount"],
        label: "Cups Per Feeding",
      };

      return {
        ...guestFormState,
        feedingCount,
      };
    }
  }
};
