export const clientFormReducer = (
  guestFormState: { [x: string]: any },
  { type = "inputChange", key = undefined, payload = undefined }: any
) => {
  switch (type) {
    // case "depositConfirmed":
    //   return { ...guestFormState, ...payload };
    // case "resetForm":
    //   return { ...INITIAL_STATE };
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
