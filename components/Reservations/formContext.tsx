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

export const GuestFormContext = createContext(null);

export const GuestFormProvider = GuestFormContext.Provider;

export function useGuestFormContext() {
  const context = useContext(GuestFormContext);
  if (!context) {
    throw new Error(
      "useGuestFormContext must be used within a GuestFormProvider"
    );
  }
  return context;
}
