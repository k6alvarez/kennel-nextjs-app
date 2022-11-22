import React, { useState, createContext, useReducer } from "react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "antd/dist/antd.css";
import "../styles/reset.css";
import "../styles/fonts.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, themesMap } from "../components/appStyles";
import { base } from "../components/ui-kit/Theme";
import {
  guestFormReducer,
  INITIAL_STATE,
  INITIAL_CLIENT_STATE,
} from "../components/Reservations/GuestClients/guestFormReducer";
import {
  ClientFormProvider,
  GuestFormProvider,
} from "../components/Reservations/formContext";
import { clientFormReducer } from "../components/Reservations/Clients/clientFormReducer";
import {
  petFormReducer,
  PET_INITIAL_STATE,
} from "../components/Pets/petFormReducer";
import { PetFormProvider } from "../components/Pets/formContext";

export const ThemePreferenceContext = createContext(null);

const App = ({ Component, pageProps }: AppProps) => {
  const [currentTheme, setCurrentTheme] = useState("naturalEarth");
  const theme = { ...base, colors: themesMap[currentTheme] };

  const [guestFormError, setGuestFormError] = useState(undefined);
  const [guestFormLoading, setGuestFormLoading] = useState(false);
  const [guestFormState, guestFormDispatch] = useReducer(
    guestFormReducer,
    INITIAL_STATE
  );

  const [clientFormError, setClientFormError] = useState(undefined);
  const [clientFormLoading, setClientFormLoading] = useState(false);
  const [clientFormState, clientFormDispatch] = useReducer(
    clientFormReducer,
    INITIAL_CLIENT_STATE
  );

  const [petFormError, setPetFormError] = useState(undefined);
  const [petFormLoading, setPetFormLoading] = useState(false);
  const [petFormState, petFormDispatch] = useReducer(
    petFormReducer,
    PET_INITIAL_STATE
  );

  return (
    <SessionProvider session={pageProps.session}>
      <ThemePreferenceContext.Provider
        value={{
          currentTheme,
          setCurrentTheme,
          breakpoints: theme.breakpoints,
        }}
      >
        <ThemeProvider theme={theme}>
          <ClientFormProvider
            value={{
              clientFormState,
              handleChange: (name: string, newValue: any) => {
                const error = null;
                clientFormDispatch({
                  key: name,
                  payload: { newValue, error },
                });
              },
              clientFormDispatch,
              clientFormError,
              setClientFormError,
              clientFormLoading,
              setClientFormLoading,
            }}
          >
            <GuestFormProvider
              value={{
                guestFormState,
                handleChange: (name: string, newValue: any) => {
                  const error = null;
                  guestFormDispatch({
                    key: name,
                    payload: { newValue, error },
                  });
                },
                guestFormDispatch,
                guestFormError,
                setGuestFormError,
                guestFormLoading,
                setGuestFormLoading,
              }}
            >
              <PetFormProvider
                value={{
                  petFormState,
                  handleChange: (name: string, newValue: any) => {
                    const error = null;
                    petFormDispatch({
                      key: name,
                      payload: { newValue, error },
                    });
                  },
                  petFormDispatch,
                  petFormError,
                  setPetFormError,
                  petFormLoading,
                  setPetFormLoading,
                }}
              >
                <GlobalStyle />
                <Component {...pageProps} />
              </PetFormProvider>
            </GuestFormProvider>
          </ClientFormProvider>
        </ThemeProvider>
      </ThemePreferenceContext.Provider>
    </SessionProvider>
  );
};

export default App;
