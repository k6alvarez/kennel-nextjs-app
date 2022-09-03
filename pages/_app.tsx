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
} from "../components/Reservations/NewClients/guestFormReducer";
import { GuestFormProvider } from "../components/Reservations/NewClients/formContext";
import { ClientFormProvider } from "../components/Reservations/Clients/clientFormContext";
import { clientFormReducer } from "../components/Reservations/Clients/clientFormReducer";

export const ThemePreferenceContext = createContext(null);

const App = ({ Component, pageProps }: AppProps) => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [guestFormState, guestFormDispatch] = useReducer(
    guestFormReducer,
    INITIAL_STATE
  );
  const [clientFormState, clientFormDispatch] = useReducer(
    clientFormReducer,
    {}
  );
  const [guestFormError, setFormError] = useState(undefined);
  const [clientFormError, setClientFormError] = useState(undefined);

  const theme = { ...base, colors: themesMap[currentTheme] };

  return (
    <SessionProvider session={pageProps.session}>
      <ThemePreferenceContext.Provider
        value={{ currentTheme, setCurrentTheme }}
      >
        <ThemeProvider theme={theme}>
          <ClientFormProvider
            value={{
              clientFormState,
              handleChange: (name: string, newValue: any) => {
                const error = null;
                guestFormDispatch({
                  key: name,
                  payload: { newValue, error },
                });
              },
              clientFormDispatch,
              clientFormError,
              setClientFormError,
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
                setFormError,
              }}
            >
              <GlobalStyle />
              <Component {...pageProps} />
            </GuestFormProvider>
          </ClientFormProvider>
        </ThemeProvider>
      </ThemePreferenceContext.Provider>
    </SessionProvider>
  );
};

export default App;
