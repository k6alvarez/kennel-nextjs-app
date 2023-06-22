import { message } from "antd";

export const clientFormReducer = (
  clientFormState: { [x: string]: any },
  { type = "inputChange", key = undefined, payload = undefined }: any
) => {
  switch (type) {
    case "togglePet":
      const petToggled = payload.pet;
      let pets = clientFormState.pets;
      const petCheck = pets.filter((pet: any) => {
        return petToggled.id == pet.id;
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
          pets: [...pets, petToggled],
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

      if (key === "arrivalDate") {
        const keyDependentInput = "departureDate";
        return {
          ...clientFormState,
          [key]: inputState,
          [keyDependentInput]: {
            ...clientFormState[keyDependentInput],
            error: null,
          },
        };
      }

      if (key === "departureDate") {
        const keyDependentInput = "arrivalDate";
        return {
          ...clientFormState,
          [key]: inputState,
          [keyDependentInput]: {
            ...clientFormState[keyDependentInput],
            error: null,
          },
        };
      }

      return {
        ...clientFormState,
        [key]: inputState,
      };
    case "updateUser":
      const { user: updatedUser } = payload;

      // get the keys of the updated user object and set their values from the clientFormState
      const body = Object.keys(updatedUser).reduce((acc, key) => {
        if (clientFormState[key]) {
          acc[key] = clientFormState[key].value;
        }
        return acc;
      }, {});

      const diff = Object.keys(body).filter((key) => {
        return body[key] !== updatedUser[key];
      });

      if (diff.length > 0) {
        const updateProfile = async () => {
          const res = await fetch(`/api/profile/${updatedUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          return res;
        };

        updateProfile().then((res) => {
          if (res.status === 200) {
            message.success("Profile has been updated.");
          } else {
            console.log(res);
          }
        });
      }

      return {
        ...clientFormState,
      };
  }
};
