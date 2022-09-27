export const clientFormReducer = (
  guestFormState: { [x: string]: any },
  { type = "inputChange", key = undefined, payload = undefined }: any
) => {
  switch (type) {
    case "setUpClientForm":
      const { user } = payload;
      let updatedFormState = guestFormState;

      Object.keys(user).forEach((key) => {
        if (guestFormState[key]) {
          updatedFormState[key].value = user[key];
        }
      });
      return { ...updatedFormState };
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
