export const questionnaireFormReducer = (
  questionnaireFormState: { [x: string]: any },
  { type = "inputChange", key = undefined, payload = undefined }: any
) => {
  switch (type) {
    case "inputChange":
      const inputState = {
        ...questionnaireFormState[key],
        value: payload.newValue,
        error: payload.error,
      };
      return {
        ...questionnaireFormState,
        [key]: inputState,
      };
  }
};
