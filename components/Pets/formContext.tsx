import { createContext, useContext } from "react";

export const PetFormContext = createContext(null);

export const PetFormProvider = PetFormContext.Provider;

export function usePetFormContext() {
  const context = useContext(PetFormContext);
  if (!context) {
    throw new Error("usePetFormContext must be used within a PetFormProvider");
  }
  return context;
}
