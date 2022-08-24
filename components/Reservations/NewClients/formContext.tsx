import { createContext, useContext } from "react";

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
