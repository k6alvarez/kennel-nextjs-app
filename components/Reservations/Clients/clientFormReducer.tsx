export const clientFormReducer = (
  clientFormState: { [x: string]: any },
  { type = "inputChange", key = undefined, payload = undefined }: any
) => {
  switch (type) {
    case "togglePet":
      const petId = payload.petId;
      const pets = clientFormState.pets;

      return {
        ...clientFormState,
        pets: pets.includes(petId)
          ? pets.filter((id) => id !== petId)
          : [...pets, petId],
      };
    case "setUpClientForm":
      const { user } = payload;
      let updatedFormState = clientFormState;

      Object.keys(user).forEach((key) => {
        if (clientFormState[key]) {
          updatedFormState[key].value = user[key];
        }
      });
      return { ...updatedFormState };
    case "inputChange":
      const inputState = {
        ...clientFormState[key],
        value: payload.newValue,
        error: payload.error,
      };
      return {
        ...clientFormState,
        [key]: inputState,
      };
  }
};
