import Router from "next/router";

export const deleteGuestPet = async (id: string): Promise<void> => {
  await fetch(`/api/guest-pet/${id}`, {
    method: "DELETE",
  });
};

export const guestFormUpdate = async (e, { state, dispatch, setFormError }) => {
  e?.preventDefault();

  const data = Object.entries(state).map(([key, _value]) => {
    return {
      [key]: state[key].value !== undefined ? state[key].value : state[key],
    };
  });
  try {
    await fetch(`/api/guest-reservation/${state.id}`, {
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
        await Router.push("/res-guest/[id]", `/res-guest/${res.id}`);
      });
  } catch (error) {
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
      .then(async (res) => {
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
        }
        dispatch({
          type: "formDraftCreated",
          payload: {
            reservationId: res.id,
          },
        });
      });
  } catch (error) {
    console.error(error);
  }
};

export const defaultShadow = "0 0 10px 0 rgba(0,0,0,0.1)";

export const petInfoOnly = (pet) => {
  const petInfo = structuredClone(pet);
  delete petInfo.largeImage;
  delete petInfo.smallImage;
  delete petInfo.id;
  delete petInfo.__typename;
  delete petInfo.createdAt;
  delete petInfo.updatedAt;
  delete petInfo.ownerId;
  delete petInfo.owner;
  delete petInfo.vaccinationsLargeImage;
  delete petInfo.vaccinations;
  delete petInfo.image;
  delete petInfo.guestReservationId;
  delete petInfo.reservationId;
  delete petInfo.name;
  delete petInfo.vet;
  delete petInfo.preferredRunSize;
  delete petInfo.feeding;
  delete petInfo.feedingCount;
  return petInfo;
};

export const petBoardingOnly = (pet) => {
  const petInfo = structuredClone(pet);
  delete petInfo.largeImage;
  delete petInfo.smallImage;
  delete petInfo.id;
  delete petInfo.__typename;
  delete petInfo.createdAt;
  delete petInfo.updatedAt;
  delete petInfo.ownerId;
  delete petInfo.owner;
  delete petInfo.vaccinationsLargeImage;
  delete petInfo.image;
  delete petInfo.guestReservationId;
  delete petInfo.reservationId;
  delete petInfo.fixed;
  delete petInfo.name;
  delete petInfo.type;
  delete petInfo.breed;
  delete petInfo.gender;
  delete petInfo.color;
  delete petInfo.age;
  delete petInfo.weight;
  delete petInfo.type;
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
