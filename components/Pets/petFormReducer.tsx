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
    type: "text",
    label: "Image",
  },
  largeImage: {
    value: "",
    error: null,
    type: "text",
    label: "Large Image",
  },
  vaccinations: {
    value: "",
    error: null,
    type: "text",
    label: "Vaccinations",
    required: true,
  },
  vaccinationsLargeImage: {
    value: "",
    error: null,
    type: "text",
    label: "Vaccinations Large Image",
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
    options: ["Small", "Large", "Extra Large"],
    label: "Preferred Run Size",
    required: true,
  },
  feeding: {
    value: "",
    error: null,
    type: "text",
    label: "Feeding",
    required: true,
  },
  feedingCount: {
    value: "1",
    error: null,
    type: "number",
    inputMode: "numeric",
    min: "1",
    label: "Feeding Count",
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
  }
};
