import { message } from "antd";

export interface PetFormProps {
  state: any;
  setPetFormError: any;
  dispatch: any;
  formSuccessCallback?: any;
}

export interface GuestPetFormProps {
  state: any;
  setPetFormError: any;
  dispatch: any;
  formSuccessCallback?: any;
  reservationId?: string;
  apiPath: string;
}

export const guestPetFormSubmit = async (
  e: React.SyntheticEvent,
  {
    state,
    setPetFormError,
    dispatch,
    formSuccessCallback,
    reservationId,
    apiPath,
  }: GuestPetFormProps
) => {
  e?.preventDefault();
  let data: { [x: string]: any }[] & { reservationId?: string } =
    Object.entries(state).map(([key, _value]) => {
      return {
        [key]: state[key].value !== undefined ? state[key].value : state[key],
        reservationId,
      };
    });

  setPetFormError(undefined);
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
            "Adding pet failed. Please verify all required fields are filled out.";
          Object.entries(res.errors).forEach(([key, value]) => {
            dispatch({
              key: key,
              payload: {
                newValue: state[key].value,
                error: value,
              },
            });
          });
          setPetFormError(validationError);
          throw new Error(validationError);
        }
        dispatch({
          type: "resetForm",
        });
        message.success("Pet added successfully");
        formSuccessCallback && formSuccessCallback(res);
      });
  } catch (_error) {
    message.error("We're sorry, something went wrong. Please try again.");
    setPetFormError(
      "We're sorry, something went wrong adding your pet. Please try again."
    );
  }
};

export const getPets = async () => {
  const res = await fetch("/api/pets");
  const pets = await res.json();
  return pets;
};

export const getUser = async () => {
  const res = await fetch("/api/user");
  const user = await res.json();

  // loop through user object and replace null values with empty strings
  const userReplaceNull = Object.keys(user).reduce((acc, key) => {
    acc[key] = user[key] === null ? "" : user[key];
    return acc;
  }, {});

  return userReplaceNull;
};

export const isValidHttpUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

export const isImageURL = (url) => {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
};
