import { createContext, useContext } from "react";

export const ClientFormContext = createContext(null);

export const ClientFormProvider = ClientFormContext.Provider;

export function useClientFormContext() {
  const context = useContext(ClientFormContext);
  if (!context) {
    throw new Error(
      "useClientFormContext must be used within a ClientFormProvider"
    );
  }
  return context;
}
