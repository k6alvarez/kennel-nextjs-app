import Router from "next/router";

export const submitData = async (
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
