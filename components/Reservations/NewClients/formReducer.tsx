export const INITIAL_USER_STATE = {
  name: {
    value: "",
    error: null,
    type: "text",
    label: "Name",
  },
  lastName: {
    value: "",
    error: null,
    type: "text",
    label: "Last Name",
  },
  email: {
    value: "",
    error: null,
    type: "text",
    label: "Email",
  },
  address: {
    value: "",
    error: null,
    type: "text",
    label: "Address",
  },
  city: {
    value: "",
    error: null,
    type: "text",
    label: "City",
  },
  state: {
    value: "",
    error: null,
    type: "text",
    label: "State",
  },
  zip: {
    value: "",
    error: null,
    type: "number",
    label: "Zip",
  },
  phone: {
    value: "",
    error: null,
    type: "tel",
    label: "Phone",
  },
  altPhone: {
    value: "",
    error: null,
    type: "tel",
    label: "Alt Phone",
  },
  emergencyContactName: {
    value: "",
    error: null,
    label: "Emergency Contact Name",
  },
  emergencyContactPhone: {
    value: "",
    error: null,
    type: "tel",
    label: "Emergency Contact Phone",
  },
};

export const INITIAL_PETS_STATE = {
  petOneType: {
    value: "dog",
    error: null,
    label: "Type",
  },
  petOneName: {
    value: "",
    error: null,
    label: "Name",
  },
  petOneBreed: {
    value: "",
    error: null,
    label: "Breed",
  },
  petOneGender: {
    value: "male",
    error: null,
    label: "Gender",
  },
  petOneFixed: {
    value: "no",
    error: null,
    label: "Fixed",
  },
  petOneColor: {
    value: "",
    error: null,
    label: "Color",
  },
  petOneImage: {
    value: "",
    error: null,
    label: "Image",
  },
  petOneLargeImage: {
    value: "",
    error: null,
    label: "Large Image",
  },
  petOneVaccinations: {
    value: "",
    error: null,
    label: "Vaccinations",
  },
  petOneVaccinationsLargeImage: {
    value: "",
    error: null,
    label: "Vaccinations Large Image",
  },
  petOneAge: {
    value: 0,
    error: null,
    label: "Age",
  },
  petOneWeight: {
    value: 0,
    error: null,
    label: "Weight",
  },
  petOneVet: {
    value: "",
    error: null,
    label: "Vet",
  },
  petOnePreferredRunSize: {
    value: "",
    error: null,
    label: "Preferred Run Size",
  },
  petOneFeeding: {
    value: "",
    error: null,
    label: "Feeding",
  },
  petOneFeedingCount: {
    value: 0,
    error: null,
    label: "Feeding Count",
  },
};

export const INITIAL_RESERVATION_STATE = {
  arrivalDate: {
    value: "",
    error: null,
    label: "Arrival Date",
  },
  arrivalTime: {
    value: "",
    error: null,
    label: "Arrival Time",
  },
  // arrivalDate: DateTime.local().toISODate(),
  // arrivalTime: DateTime.fromObject({
  //   hour: 9,
  //   minute: 0,
  //   second: 0,
  //   zone: "local",
  // }).toLocaleString(DateTime.TIME_24_SIMPLE),
  departureDate: {
    value: "",
    error: null,
    label: "Departure Date",
  },
  departureTime: {
    value: "",
    error: null,
    label: "Departure Time",
  },
  // departureTime: DateTime.fromObject({
  //   hour: 19,
  //   minute: 0,
  //   second: 0,
  //   zone: "local",
  // }).toLocaleString(DateTime.TIME_24_SIMPLE),
  specialInstructions: {
    value: "",
    error: null,
    label: "Special Instructions",
  },
  howHear: {
    value: "",
    error: null,
    type: "text",
    label: "How did you hear about us?",
  },
};

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
  switch (key) {
    case "name":
      return {
        ...state,
        name: inputState,
      };
    case "lastName":
      return {
        ...state,
        lastName: inputState,
      };
    case "email":
      return {
        ...state,
        email: inputState,
      };
    case "city":
      return {
        ...state,
        city: inputState,
      };
    case "state":
      return {
        ...state,
        state: inputState,
      };
    case "zip":
      return {
        ...state,
        zip: inputState,
      };
    case "phone":
      return {
        ...state,
        phone: inputState,
      };
    case "altPhone":
      return {
        ...state,
        altPhone: inputState,
      };
    case "emergencyContactName":
      return {
        ...state,
        emergencyContactName: inputState,
      };
    case "emergencyContactPhone":
      return {
        ...state,
        emergencyContactPhone: inputState,
      };
    case "howHear":
      return {
        ...state,
        howHear: inputState,
      };
    case "arrivalDate":
      return {
        ...state,
        arrivalDate: inputState,
      };
    case "arrivalTime":
      return {
        ...state,
        arrivalTime: inputState,
      };
    case "departureDate":
      return {
        ...state,
        departureDate: inputState,
      };
    case "departureTime":
      return {
        ...state,
        departureTime: inputState,
      };
    case "specialInstructions":
      return {
        ...state,
        specialInstructions: inputState,
      };
    case "petOneType":
      return {
        ...state,
        petOneType: inputState,
      };
    case "petOneName":
      return {
        ...state,
        petOneName: inputState,
      };
    case "petOneBreed":
      return {
        ...state,
        petOneBreed: inputState,
      };
    case "petOneGender":
      return {
        ...state,
        petOneGender: inputState,
      };
    case "petOneFixed":
      return {
        ...state,
        petOneFixed: inputState,
      };
    case "petOneColor":
      return {
        ...state,
        petOneColor: inputState,
      };
    case "petOneImage":
      return {
        ...state,
        petOneImage: inputState,
      };
    case "petOneLargeImage":
      return {
        ...state,
        petOneLargeImage: inputState,
      };
    case "petOneVaccinations":
      return {
        ...state,
        petOneVaccinations: inputState,
      };
    case "petOneVaccinationsLargeImage":
      return {
        ...state,
        petOneVaccinationsLargeImage: inputState,
      };
    case "petOneAge":
      return {
        ...state,
        petOneAge: inputState,
      };
    case "petOneWeight":
      return {
        ...state,
        petOneWeight: inputState,
      };
    case "petOneVet":
      return {
        ...state,
        petOneVet: inputState,
      };
    case "petOnePreferredRunSize":
      return {
        ...state,
        petOnePreferredRunSize: inputState,
      };
    case "petOneFeeding":
      return {
        ...state,
        petOneFeeding: inputState,
      };
    case "petOneFeedingCount":
      return {
        ...state,
        petOneFeedingCount: inputState,
      };
    case "petTwoType":
      return {
        ...state,
        petTwoType: inputState,
      };
    case "petTwoName":
      return {
        ...state,
        petTwoName: inputState,
      };
    case "petTwoBreed":
      return {
        ...state,
        petTwoBreed: inputState,
      };
    case "petTwoGender":
      return {
        ...state,
        petTwoGender: inputState,
      };
    case "petTwoFixed":
      return {
        ...state,
        petTwoFixed: inputState,
      };
    case "petTwoColor":
      return {
        ...state,
        petTwoColor: inputState,
      };
    case "petTwoImage":
      return {
        ...state,
        petTwoImage: inputState,
      };
    case "petTwoLargeImage":
      return {
        ...state,
        petTwoLargeImage: inputState,
      };
    case "petTwoVaccinations":
      return {
        ...state,
        petTwoVaccinations: inputState,
      };
    case "petTwoVaccinationsLargeImage":
      return {
        ...state,
        petTwoVaccinationsLargeImage: inputState,
      };
    case "petTwoAge":
      return {
        ...state,
        petTwoAge: inputState,
      };
    case "petTwoWeight":
      return {
        ...state,
        petTwoWeight: inputState,
      };
    case "petTwoVet":
      return {
        ...state,
        petTwoVet: inputState,
      };
    case "petTwoPreferredRunSize":
      return {
        ...state,
        petTwoPreferredRunSize: inputState,
      };
    case "petTwoFeeding":
      return {
        ...state,
        petTwoFeeding: inputState,
      };
    case "petTwoFeedingCount":
      return {
        ...state,
        petTwoFeedingCount: inputState,
      };
    case "petThreeType":
      return {
        ...state,
        petThreeType: inputState,
      };
    case "petThreeName":
      return {
        ...state,
        petThreeName: inputState,
      };
    case "petThreeBreed":
      return {
        ...state,
        petThreeBreed: inputState,
      };
    case "petThreeGender":
      return {
        ...state,
        petThreeGender: inputState,
      };
    case "petThreeFixed":
      return {
        ...state,
        petThreeFixed: inputState,
      };
    case "petThreeColor":
      return {
        ...state,
        petThreeColor: inputState,
      };
    case "petThreeImage":
      return {
        ...state,
        petThreeImage: inputState,
      };
    case "petThreeLargeImage":
      return {
        ...state,
        petThreeLargeImage: inputState,
      };
    case "petThreeVaccinations":
      return {
        ...state,
        petThreeVaccinations: inputState,
      };
    case "petThreeVaccinationsLargeImage":
      return {
        ...state,
        petThreeVaccinationsLargeImage: inputState,
      };
    case "petThreeAge":
      return {
        ...state,
        petThreeAge: inputState,
      };
    case "petThreeWeight":
      return {
        ...state,
        petThreeWeight: inputState,
      };
    case "petThreeVet":
      return {
        ...state,
        petThreeVet: inputState,
      };
    case "petThreePreferredRunSize":
      return {
        ...state,
        petThreePreferredRunSize: inputState,
      };
    case "petThreeFeeding":
      return {
        ...state,
        petThreeFeeding: inputState,
      };
    case "petThreeFeedingCount":
      return {
        ...state,
        petThreeFeedingCount: inputState,
      };
    case "petFourType":
      return {
        ...state,
        petFourType: inputState,
      };
    case "petFourName":
      return {
        ...state,
        petFourName: inputState,
      };
    case "petFourBreed":
      return {
        ...state,
        petFourBreed: inputState,
      };
    case "petFourGender":
      return {
        ...state,
        petFourGender: inputState,
      };
    case "petFourFixed":
      return {
        ...state,
        petFourFixed: inputState,
      };
    case "petFourColor":
      return {
        ...state,
        petFourColor: inputState,
      };
    case "petFourImage":
      return {
        ...state,
        petFourImage: inputState,
      };
    case "petFourLargeImage":
      return {
        ...state,
        petFourLargeImage: inputState,
      };
    case "petFourVaccinations":
      return {
        ...state,
        petFourVaccinations: inputState,
      };
    case "petFourVaccinationsLargeImage":
      return {
        ...state,
        petFourVaccinationsLargeImage: inputState,
      };
    case "petFourAge":
      return {
        ...state,
        petFourAge: inputState,
      };
    case "petFourWeight":
      return {
        ...state,
        petFourWeight: inputState,
      };
    case "petFourVet":
      return {
        ...state,
        petFourVet: inputState,
      };
    case "petFourPreferredRunSize":
      return {
        ...state,
        petFourPreferredRunSize: inputState,
      };
    case "petFourFeeding":
      return {
        ...state,
        petFourFeeding: inputState,
      };
    case "petFourFeedingCount":
      return {
        ...state,
        petFourFeedingCount: inputState,
      };
    case "petFiveType":
      return {
        ...state,
        petFiveType: inputState,
      };
    case "petFiveName":
      return {
        ...state,
        petFiveName: inputState,
      };
    case "petFiveBreed":
      return {
        ...state,
        petFiveBreed: inputState,
      };
    case "petFiveGender":
      return {
        ...state,
        petFiveGender: inputState,
      };
    case "petFiveFixed":
      return {
        ...state,
        petFiveFixed: inputState,
      };
    case "petFiveColor":
      return {
        ...state,
        petFiveColor: inputState,
      };
    case "petFiveImage":
      return {
        ...state,
        petFiveImage: inputState,
      };
    case "petFiveLargeImage":
      return {
        ...state,
        petFiveLargeImage: inputState,
      };
    case "petFiveVaccinations":
      return {
        ...state,
        petFiveVaccinations: inputState,
      };
    case "petFiveVaccinationsLargeImage":
      return {
        ...state,
        petFiveVaccinationsLargeImage: inputState,
      };
    case "petFiveAge":
      return {
        ...state,
        petFiveAge: inputState,
      };
    case "petFiveWeight":
      return {
        ...state,
        petFiveWeight: inputState,
      };
    case "petFiveVet":
      return {
        ...state,
        petFiveVet: inputState,
      };
    case "petFivePreferredRunSize":
      return {
        ...state,
        petFivePreferredRunSize: inputState,
      };
    case "petFiveFeeding":
      return {
        ...state,
        petFiveFeeding: inputState,
      };
    case "petFiveFeedingCount":
      return {
        ...state,
        petFiveFeedingCount: inputState,
      };
    default:
      return state;
  }
};
