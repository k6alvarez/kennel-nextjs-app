import { message } from "antd";
import Router from "next/router";

export const deleteGuestPet = async (id: string): Promise<void> => {
  await fetch(`/api/guest-pet/${id}`, {
    method: "DELETE",
  });
};

export const guestFormUpdate = async (e, { state, dispatch, setFormError }) => {
  e?.preventDefault();
  message.loading("Sending reservation request.", 1);
  try {
    const data = Object.entries(state).map(([key, _value]) => {
      return {
        [key]: state[key].value !== undefined ? state[key].value : state[key],
      };
    });

    await fetch(`/api/guest-reservation/${state.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.assign({}, ...data)),
    })
      .then((res) => {
        return res.json();
      })
      .then(async (res) => {
        if (res.errors) {
          const validationError =
            "Something went wrong. Please try again or contact us for assistance.";
          Object.entries(res.errors).forEach(([key, value]) => {
            dispatch({
              key: key,
              payload: {
                newValue: state[key].value,
                error: value,
              },
            });
          });
          setFormError(validationError);
        }
        message.success("Reservation request submitted successfully.");
        dispatch({
          type: "resetForm",
        });
        await Router.push("/res-guest/[id]", `/res-guest/${res.id}`);
      });
  } catch (error) {
    message.error(
      "Something went wrong. Please try again or contact us for assistance."
    );
    console.error(error);
  }
};

export const guestFormSubmit = async (
  e: React.SyntheticEvent,
  { state, setFormError, dispatch }
) => {
  e?.preventDefault();
  const data = Object.entries(state).map(([key, _value]) => {
    return {
      [key]: state[key].value !== undefined ? state[key].value : state[key],
    };
  });
  setFormError(undefined);
  try {
    await fetch("/api/guest-reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.assign({}, ...data)),
    })
      .then((res) => {
        return res.json();
      })
      .then(async (res) => {
        if (res.errors) {
          const validationError =
            "Form submission failed. Please verify all required fields are filled out.";
          Object.entries(res.errors).forEach(([key, value]) => {
            dispatch({
              key: key,
              payload: {
                newValue: state[key].value,
                error: value,
              },
            });
          });
          setFormError(validationError);
          throw new Error(validationError);
        }
        dispatch({
          type: "resetForm",
        });
        await Router.push("/res-guest/[id]", `/res-guest/${res.id}`);
      });
  } catch (error) {
    console.error(error);
  }
};

export const createGuestReservationDraft = async (
  e: React.SyntheticEvent,
  { state, setFormError, dispatch, apiPath }
) => {
  e?.preventDefault();
  const data = Object.entries(state).map(([key, _value]) => {
    return {
      [key]: state[key].value !== undefined ? state[key].value : state[key],
    };
  });
  setFormError(undefined);
  try {
    await fetch(apiPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.assign({}, ...data)),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.errors) {
          const validationError =
            "Please verify all required fields are filled out.";
          Object.entries(res.errors).forEach(([key, value]) => {
            dispatch({
              key: key,
              payload: {
                newValue: state[key].value,
                error: value,
              },
            });
          });
          setFormError(validationError);
          throw new Error(validationError);
        } else {
          dispatch({
            type: "formDraftCreated",
            payload: {
              reservationId: res.id,
            },
          });
          return res;
        }
      });
  } catch (error) {
    console.error(error);
  }
};

export const defaultShadow = "0 0 10px 0 rgba(0,0,0,0.1)";

const getDesiredInfo = ({ petInfo, desiredKeys }) => {
  Object.keys(petInfo).forEach((key) => {
    if (!desiredKeys.includes(key)) {
      delete petInfo[key];
    }
  });
};

export const petInfoOnly = (pet) => {
  const desiredKeys = ["image", "age", "breed", "color", "gender", "type"];
  const petInfo = structuredClone(pet);
  getDesiredInfo({ petInfo, desiredKeys });

  return petInfo;
};

export const vaccinationInfoOnly = (pet) => {
  const desiredKeys = [
    "vet",
    "vaccinations",
    "bordetellaVaccine",
    "distemperVaccine",
    "parvoVirusesVaccine",
    "rabiesVaccine",
  ];
  const petInfo = structuredClone(pet);
  getDesiredInfo({ petInfo, desiredKeys });

  return petInfo;
};

export const boardingInfoOnly = (pet) => {
  const desiredKeys = [
    "feeding",
    "feedingCount",
    "preferredRunSize",
    "weight",
    "fixed",
  ];
  const petInfo = structuredClone(pet);
  getDesiredInfo({ petInfo, desiredKeys });

  return petInfo;
};

export const calculateDeposit = (pets) => {
  let deposit = 0;

  pets.map((pet) => {
    if (pet.preferredRunSize === "Small") {
      return (deposit += 25);
    } else if (pet.preferredRunSize === "Large") {
      return (deposit += 25);
    } else if (pet.preferredRunSize === "Extra Large") {
      return (deposit += 25);
    }
  }, 0);
  return "$" + deposit.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
