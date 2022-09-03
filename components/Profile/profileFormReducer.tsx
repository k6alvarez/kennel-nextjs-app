export const profileFormReducer = (
  profileFormState: { [x: string]: any },
  { type = "inputChange", key = undefined, payload = undefined }: any
) => {
  switch (type) {
    // case "depositConfirmed":
    //   return { ...profileFormState, ...payload };
    // case "resetForm":
    //   return { ...INITIAL_STATE };
    case "inputChange":
      const inputState = {
        ...profileFormState[key],
        value: payload.newValue,
        error: payload.error,
      };
      return {
        ...profileFormState,
        [key]: inputState,
      };
  }
};
