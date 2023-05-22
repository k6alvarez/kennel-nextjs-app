import { DateTime } from "luxon";

export const statesArray = [
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
];

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
  },
  phone: {
    value: "",
    error: null,
    type: "text",
    inputMode: "tel",
    label: "Phone",
    required: true,
  },
  altPhone: {
    value: "",
    error: null,
    type: "text",
    inputMode: "tel",
    label: "Alt Phone",
    required: true,
  },
  address: {
    value: "",
    error: null,
    type: "text",
    label: "Address",
    required: true,
  },
  unit: {
    value: "",
    error: null,
    type: "text",
    label: "Unit",
    required: true,
  },
  city: {
    value: "",
    error: null,
    type: "text",
    label: "City",
    required: true,
  },
  state: {
    value: "",
    error: null,
    type: "select",
    label: "State",
    required: true,
    options: statesArray,
  },
  zip: {
    value: "",
    error: null,
    type: "text",
    label: "Zip",
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
    inputMode: "tel",
    label: "Emergency Contact Phone",
    required: true,
  },
};

export const timeFormat = DateTime.TIME_24_SIMPLE;

export const dateTimeNow = DateTime.local().toISODate();
export const timeOpen = DateTime.fromObject({
  hour: 9,
  minute: 0,
  second: 0,
}).toLocaleString(timeFormat);

export const timeBreakClose = DateTime.fromObject({
  hour: 14,
  minute: 0,
  second: 0,
}).toLocaleString(timeFormat);

export const timeBreakOpen = DateTime.fromObject({
  hour: 16,
  minute: 0,
  second: 0,
}).toLocaleString(timeFormat);

export const timeClose = DateTime.fromObject({
  hour: 19,
  minute: 0,
  second: 0,
}).toLocaleString(timeFormat);

export const INITIAL_RESERVATION_STATE = {
  arrivalDate: {
    value: dateTimeNow,
    min: dateTimeNow,
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
    min: dateTimeNow,
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
    type: "textarea",
    label: "How did you hear about us?",
  },
};
