import { DateTime } from "luxon";
import { PET_INITIAL_STATE } from "../Pets/petFormReducer";
import {
  INITIAL_USER_STATE,
  INITIAL_RESERVATION_STATE,
  timeOpen,
  timeFormat,
  timeClose,
  timeBreakClose,
  timeBreakOpen,
} from "./formInitialState";
import { Reservation, Pet } from "@prisma/client";
import { DetailItem } from "../../pages/reservation/[id]";
import { LetterSpacedText } from "../Footer";
import { isValidHttpUrl } from "../Pets/services";
import { base } from "../ui-kit/Theme";
import { Image } from "antd";

export const next = ({ current, setCurrent }) => {
  setCurrent(current + 1);
};

export const prev = ({ current, setCurrent }) => {
  setCurrent(current - 1);
};

export const fieldValidator = ({ fields, state, dispatch }) => {
  for (const field of fields) {
    const fieldFromState = state[field[0]];
    const requiredFieldMissing =
      fieldFromState.required && !fieldFromState.value;

    const fieldEmailInvalid =
      fieldFromState.inputMode === "email" &&
      !/^[^@]+@[^@]+\.[^@]+$/.test(fieldFromState.value);

    const fieldPhoneInvalid =
      fieldFromState.inputMode === "tel" &&
      !/^\d{3}-\d{3}-\d{4}$/.test(
        fieldFromState.value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
      );

    if (requiredFieldMissing) {
      const error = `${fieldFromState.label} is required.`;

      dispatch({
        key: field[0],
        payload: { newValue: fieldFromState.value, error },
      });

      document.getElementById(field[0]).focus();
      document
        .getElementById(field[0])
        .scrollIntoView({ behavior: "smooth", block: "center" });

      return false;
    }

    if (fieldEmailInvalid) {
      const error = `${fieldFromState.label} is not a valid email address.`;
      dispatch({
        key: field[0],
        payload: { newValue: fieldFromState.value, error },
      });
      return false;
    }

    if (fieldPhoneInvalid) {
      const error = `${fieldFromState.label} is not a valid phone number.`;
      dispatch({
        key: field[0],
        payload: { newValue: fieldFromState.value, error },
      });
      return false;
    }
    if (field[0] === "arrivalDate" || field[0] === "departureDate") {
      const weekday = DateTime.fromISO(fieldFromState.value).weekday;
      const arrivalDate = DateTime.fromISO(state.arrivalDate.value);
      const departureDate = DateTime.fromISO(state.departureDate.value);

      if (arrivalDate > departureDate) {
        const error = `Arrival cannot be after departure. Please select a new date.`;
        dispatch({
          key: field[0],
          payload: { newValue: fieldFromState.value, error },
        });
        return false;
      }

      if (weekday === 6) {
        const error = `We are closed on Saturdays. Please select a new ${fieldFromState.label}.`;
        dispatch({
          key: field[0],
          payload: { newValue: fieldFromState.value, error },
        });
        return false;
      }
    }

    if (field[0] === "arrivalTime" || field[0] === "departureTime") {
      const time = DateTime.fromISO(fieldFromState.value).toLocaleString(
        timeFormat
      );

      if (time < timeOpen) {
        const error = `We are not open until ${DateTime.fromISO(
          timeOpen
        ).toLocaleString(DateTime.TIME_SIMPLE)}. Please select a new ${
          fieldFromState.label
        }.`;
        dispatch({
          key: field[0],
          payload: { newValue: fieldFromState.value, error },
        });
        return false;
      }

      if (time > timeBreakClose && time < timeBreakOpen) {
        const error = `We are closed from ${DateTime.fromISO(
          timeBreakClose
        ).toLocaleString(DateTime.TIME_SIMPLE)} to ${DateTime.fromISO(
          timeBreakOpen
        ).toLocaleString(DateTime.TIME_SIMPLE)}. Please select a new ${
          fieldFromState.label
        }.`;
        dispatch({
          key: field[0],
          payload: { newValue: fieldFromState.value, error },
        });
        return false;
      }

      if (time > timeClose) {
        const error = `We are closed at ${DateTime.fromISO(
          timeClose
        ).toLocaleString(DateTime.TIME_SIMPLE)}. Please select a new ${
          fieldFromState.label
        }.`;
        dispatch({
          key: field[0],
          payload: { newValue: fieldFromState.value, error },
        });
        return false;
      }
    }

    if (field[0] === "departureTime" && state.arrivalTime.value) {
      const arrivalTime = DateTime.fromISO(state.arrivalTime.value);
      const departureTime = DateTime.fromISO(state.departureTime.value);
      const sameTimeCheck = arrivalTime.equals(departureTime);
      const arrivalDate = DateTime.fromISO(state.arrivalDate.value);
      const sameDayPickup = DateTime.fromISO(state.departureDate.value).equals(
        arrivalDate
      );

      if (sameTimeCheck && sameDayPickup) {
        const error = `Arrival and departure times cannot be the same.`;
        dispatch({
          key: field[0],
          payload: { newValue: fieldFromState.value, error },
        });
        return false;
      }

      if (sameDayPickup && arrivalTime > departureTime) {
        const error = `Departure time cannot be before arrival time. Please select a new departure time.`;
        dispatch({
          key: field[0],
          payload: { newValue: fieldFromState.value, error },
        });
        return false;
      } else
        dispatch({
          key: field[0],
          payload: { newValue: fieldFromState.value, error: null },
        });
    }
  }
  return true;
};

export const boardingFormValidator = (
  { currentFormSection },
  { state, dispatch }
) => {
  let sectionInputs = [
    INITIAL_USER_STATE,
    INITIAL_RESERVATION_STATE,
    PET_INITIAL_STATE,
  ];
  const currentSection = Object.entries(sectionInputs[currentFormSection]);

  return fieldValidator({ fields: currentSection, state, dispatch });
};

export const getDataSource = (
  fieldGroup: {
    [x: string]: {
      label: string;
    };
  },
  source: Reservation | Pet
) => {
  const dataSource = Object.entries(source)
    .filter((key) => {
      let field = fieldGroup[key[0]];

      if (field) {
        return field.label !== "Image" && field.label !== "Large Image";
      }
    })
    .map((key, i) => {
      const field = fieldGroup[key[0]];

      return (
        <DetailItem key={key + "-" + i}>
          <LetterSpacedText fs={base.fontSizes[1]} bold>
            {field.label}
          </LetterSpacedText>
          <LetterSpacedText as="div" fs={base.fontSizes[2]}>
            {isValidHttpUrl(source[key[0]]) ? (
              <Image src={source[key[0]]} width={100} height={100} />
            ) : (
              <span>{source[key[0]] || "n/a"}</span>
            )}
          </LetterSpacedText>
        </DetailItem>
      );
    });
  return dataSource;
};
