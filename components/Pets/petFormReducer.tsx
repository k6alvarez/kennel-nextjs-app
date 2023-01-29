export const PET_INITIAL_STATE = {
  name: {
    value: "",
    error: null,
    type: "text",
    label: "Pet Name",
    required: true,
  },
  type: {
    value: "Dog",
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
    value: "Female",
    error: null,
    type: "select",
    options: ["Female", "Male"],
    label: "Gender",
    required: true,
  },
  fixed: {
    value: "No",
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
    label: "Image",
  },
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
  age: {
    value: "1",
    error: null,
    type: "number",
    inputMode: "numeric",
    min: "1",
    label: "Age",
    required: true,
  },
  weight: {
    value: "1",
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
    label: "Vet",
    required: true,
  },
  preferredRunSize: {
    value: "Small",
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
    value: "Client Food",
    error: null,
    type: "select",
    label: "Feeding",
    options: [
      "Client Food",
      "Iams Eukanuba Adult",
      "Iams Eukanuba Large Breed Puppy",
      "Iams Puppy",
    ],
    required: true,
  },
  feedingCount: {
    value: "1",
    error: null,
    type: "number",
    inputMode: "numeric",
    min: "1",
    label: "Bags Per Feeding",
    required: true,
  },
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
      console.log("setField", payload);
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
      const preferredRunSize = {
        ...guestFormState["preferredRunSize"],
        options: ["Cat Room", "Cat Condo", "Shared"],
      };

      const bordetellaVaccine = {
        ...guestFormState["bordetellaVaccine"],
        required: false,
        disabled: true,
      };

      return {
        ...guestFormState,
        preferredRunSize,
        bordetellaVaccine,
      };
    }
    case "setFormForDog": {
      const preferredRunSize = {
        ...guestFormState["preferredRunSize"],
        options: ["Small", "Large", "Extra Large", "Shared"],
      };

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
  }
};
