import { DateTime } from "luxon";
import {
  Field,
  StyledLabel,
  StyledInput,
  Hint,
  StyledTextarea,
  StyledSelect,
} from "./styles";

export const INITIAL_USER_STATE = {
  name: {
    value: "",
    error: null,
    type: "text",
    label: "First Name",
    required: true,
  },
  lastName: {
    value: "",
    error: null,
    type: "text",
    label: "Last Name",
    required: true,
  },
  email: {
    value: "",
    error: null,
    type: "text",
    inputMode: "email",
    label: "Email",
    required: true,
    grow: true,
  },
  address: {
    value: "",
    error: null,
    type: "text",
    label: "Address",
    required: true,
    grow: true,
  },
  addressUnit: {
    value: "",
    error: null,
    type: "text",
    label: "Apt/Unit/Ste",
  },
  city: {
    value: "",
    error: null,
    type: "text",
    label: "City",
    required: true,
  },
  state: {
    value: "MI",
    error: null,
    type: "select",
    options: [
      "AL",
      "AK",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "DC",
      "FL",
      "GA",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY",
    ],
    label: "State",
    required: true,
  },
  zip: {
    value: "",
    error: null,
    type: "text",
    inputMode: "numeric",
    minLength: 5,
    maxLength: 5,
    label: "Zip",
    required: true,
  },
  phone: {
    value: "",
    error: null,
    type: "text",
    inputMode: "numeric",
    minLength: 10,
    maxLength: 11,
    label: "Phone",
    required: true,
  },
  altPhone: {
    value: "",
    error: null,
    type: "text",
    inputMode: "numeric",
    minLength: 10,
    maxLength: 11,
    label: "Alt Phone",
    required: true,
  },
  emergencyContactName: {
    value: "",
    error: null,
    label: "Emergency Contact Name",
    required: true,
  },
  emergencyContactPhone: {
    value: "",
    error: null,
    type: "text",
    inputMode: "numeric",
    minLength: 10,
    maxLength: 11,
    label: "Emergency Contact Phone",
    required: true,
  },
};

export const INITIAL_PETS_STATE = {
  petOneName: {
    value: "",
    error: null,
    type: "text",
    label: "Pet Name",
    required: true,
  },
  petOneType: {
    value: "Dog",
    error: null,
    type: "select",
    options: ["Dog", "Cat"],
    label: "Type",
    required: true,
  },
  petOneBreed: {
    value: "",
    error: null,
    type: "text",
    label: "Breed",
    required: true,
  },
  petOneGender: {
    value: "Male",
    error: null,
    type: "select",
    options: ["Male", "Female"],
    label: "Gender",
    required: true,
  },
  petOneFixed: {
    value: "No",
    error: null,
    type: "select",
    options: ["No", "Yes"],
    label: "Fixed",
    required: true,
  },
  petOneColor: {
    value: "",
    error: null,
    type: "text",
    label: "Color",
    required: true,
  },
  petOneImage: {
    value: "",
    error: null,
    type: "text",
    label: "Image",
  },
  petOneLargeImage: {
    value: "",
    error: null,
    type: "text",
    label: "Large Image",
  },
  petOneVaccinations: {
    value: "",
    error: null,
    type: "text",
    label: "Vaccinations",
    required: true,
  },
  petOneVaccinationsLargeImage: {
    value: "",
    error: null,
    type: "text",
    label: "Vaccinations Large Image",
  },
  petOneAge: {
    value: "1",
    error: null,
    type: "number",
    inputMode: "numeric",
    min: "1",
    label: "Age",
    required: true,
  },
  petOneWeight: {
    value: "1",
    error: null,
    type: "number",
    inputMode: "numeric",
    min: "1",
    label: "Weight (lbs)",
    required: true,
  },
  petOneVet: {
    value: "",
    error: null,
    type: "text",
    label: "Vet",
    required: true,
  },
  petOnePreferredRunSize: {
    value: "Small",
    error: null,
    type: "select",
    options: ["Small", "Large", "Extra Large"],
    label: "Preferred Run Size",
    required: true,
  },
  petOneFeeding: {
    value: "",
    error: null,
    type: "text",
    label: "Feeding",
    required: true,
  },
  petOneFeedingCount: {
    value: "1",
    error: null,
    type: "number",
    inputMode: "numeric",
    min: "1",
    label: "Feeding Count",
    required: true,
  },
};

const dateTimeNow = DateTime.local().toISODate();
const timeOpen = DateTime.fromObject({
  hour: 9,
  minute: 0,
  second: 0,
}).toLocaleString(DateTime.TIME_24_SIMPLE);

const timeClose = DateTime.fromObject({
  hour: 19,
  minute: 0,
  second: 0,
}).toLocaleString(DateTime.TIME_24_SIMPLE);

export const INITIAL_RESERVATION_STATE = {
  arrivalDate: {
    value: dateTimeNow,
    error: null,
    label: "Arrival Date",
    type: "date",
    required: true,
  },
  arrivalTime: {
    value: timeOpen,
    error: null,
    label: "Arrival Time",
    type: "time",
    required: true,
  },
  departureDate: {
    value: dateTimeNow,
    error: null,
    label: "Departure Date",
    type: "date",
    required: true,
  },
  departureTime: {
    value: timeClose,
    error: null,
    label: "Departure Time",
    type: "time",
    required: true,
  },
  specialInstructions: {
    value: "",
    error: null,
    label: "Special Instructions",
    type: "textarea",
  },
  howHear: {
    value: "",
    error: null,
    type: "text",
    label: "How did you hear about us?",
  },
};

export const renderFormFields = (
  initialState: { [s: string]: unknown } | ArrayLike<unknown>,
  state: {
    [x: string]: {
      inputMode: any;
      value: any;
      error: any;
      type: any;
      min: any;
      minLength: any;
      maxLength: any;
      pattern: any;
      label: any;
      required: any;
      grow: any;
      options: any;
    };
  },
  handleChangeGuestReservation: (arg0: string, arg1: any) => any
) => {
  return Object.entries(initialState).map(([key, _value], i) => {
    const {
      inputMode,
      value,
      error,
      type,
      min,
      minLength,
      maxLength,
      pattern,
      label,
      required,
      grow,
      options,
    } = state[key];
    const onChange = (e) => handleChangeGuestReservation(key, e.target.value);
    const autoFocus = i === 0;
    const requiredField = required || false;
    return (
      <Field key={key} grow={grow}>
        <StyledLabel htmlFor={key} error={error || false}>
          {`${label}${required ? "*" : ""}`}
        </StyledLabel>
        {type === "textarea" && (
          <StyledTextarea
            onChange={onChange}
            value={value}
            id={key}
            autoFocus={autoFocus}
            error={error}
          />
        )}

        {type === "select" && (
          <StyledSelect
            autoFocus={autoFocus}
            id={key}
            name={key}
            onChange={onChange}
            error={error}
            defaultValue={value}
          >
            {options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </StyledSelect>
        )}

        {type !== "textarea" && type !== "select" && (
          <StyledInput
            autoFocus={autoFocus}
            onChange={onChange}
            type={type || "text"}
            inputMode={inputMode || "text"}
            minLength={minLength}
            maxLength={maxLength}
            min={min}
            pattern={pattern}
            required={requiredField}
            id={key}
            value={value}
            error={error}
          />
        )}

        {error && <Hint>{error}</Hint>}
      </Field>
    );
  });
};
