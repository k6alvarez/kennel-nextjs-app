import { message } from "antd";

interface PetFormProps {
  state: any;
  setPetFormError: any;
  dispatch: any;
  formSuccessCallback?: any;
}

export const petFormSubmit = async (
  e: React.SyntheticEvent,
  { state, setPetFormError, dispatch, formSuccessCallback }: PetFormProps
) => {
  e?.preventDefault();
  const data = Object.entries(state).map(([key, _value]) => {
    return {
      [key]: state[key].value !== undefined ? state[key].value : state[key],
    };
  });
  setPetFormError(undefined);
  try {
    await fetch("/api/pet", {
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
          setPetFormError(validationError);
          throw new Error(validationError);
        }
        dispatch({
          type: "resetForm",
        });
        message.success("Pet added successfully");
        formSuccessCallback && formSuccessCallback();
      });
  } catch (error) {
    setPetFormError("We're sorry, something went wrong. Please try again.");
    console.error(error);
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
  return user;
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
