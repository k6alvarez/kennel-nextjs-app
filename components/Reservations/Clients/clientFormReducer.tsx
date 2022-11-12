export const clientFormReducer = (
  clientFormState: { [x: string]: any },
  { type = "inputChange", key = undefined, payload = undefined }: any
) => {
  switch (type) {
    case "togglePet":
      const petToggled = payload.pet;
      let pets = clientFormState.pets;
      const petCheck = Object.entries(pets).filter((pet: any) => {
        return petToggled.id === pet.id;
      });
      if (petCheck.length > 0) {
        pets = pets.filter((pet) => {
          return pet.id !== petToggled.id;
        });
        return {
          ...clientFormState,
          pets,
        };
      } else {
        return {
          ...clientFormState,
          pets: { ...pets, ...petToggled },
        };
      }
    case "formDraftCreated":
      return {
        ...clientFormState,
        ...payload,
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
