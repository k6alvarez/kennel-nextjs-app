import { INITIAL_USER_STATE } from "../Reservations/formInitialState";
import { fieldValidator } from "../Reservations/helpers";

export const getUserName = (user = undefined) => {
    const userEmail = user?.email;
    const fullName = user?.name && user.lastName && `${user.name} ${user.lastName}`;
    return `Signed in as ${fullName || userEmail}`;
}

export const getProfileHeader = (permissions) => `${permissions.includes("ADMIN")
? "Admin"
: permissions.includes("EMPLOYEE")
? "Employee"
: "Client"} Profile`


export const profileFormFieldsValid = (
    { currentFormSection },
    { state, dispatch }
  ) => {
    let sectionInputs = [
      INITIAL_USER_STATE
    ];
    const currentSection = Object.entries(sectionInputs[currentFormSection]);
  
    return fieldValidator({ fields: currentSection, state, dispatch });
  };