import React, { useState, createContext, useReducer } from "react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
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
export const AppSettingsContext = createContext(null);
export const INITIAL_APP_SETTINGS_FORM_STATE = {
  name: {
    value: "",
    error: null,
    type: "textarea",
    label: "App Name",
    required: true,
  },
  logo: {
    value: "",
    error: null,
    type: "file",
    label: "Logo",
  },
  facebook: {
    value: "",
    error: null,
    type: "text",
    label: "Facebook Page URL",
  },
  instagram: {
    value: "",
    error: null,
    type: "text",
    label: "Instagram Account URL",
  },
  twitter: {
    value: "",
    error: null,
    type: "text",
    label: "Twitter Account URL",
  },
  youtube: {
    value: "",
    error: null,
    type: "text",
    label: "YouTube Channel URL",
  },
  google: {
    value: "",
    error: null,
    type: "text",
    label: "Google URL",
  },
  yelp: {
    value: "",
    error: null,
    type: "text",
    label: "Yelp URL",
  },
};

const App = ({ Component, pageProps }: AppProps) => {
  const [editMode, setEditMode] = useState(false);

  const [currentTheme, setCurrentTheme] = useState("light");

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

  const formReducer = (
    formState: any,
    { type = "inputChange", key = undefined, payload = undefined }: any
  ) => {
    switch (type) {
      case "inputChange":
        const inputState = {
          ...formState[key],
          value: payload.newValue,
          error: payload.error,
          disabled: payload.disabled,
        };
        return {
          ...formState,
          [key]: inputState,
        };
    }
  };

  const [formStateAppSettings, formAppSettingsDispatch] = useReducer(
    formReducer,
    INITIAL_APP_SETTINGS_FORM_STATE
  );

  const [appSettings, setAppSettings] = useState({
    name: "My App",
    slogan: "Your app slogan goes here",
  });

  // save edit mode to local storage and check when app loads if it's true
  React.useEffect(() => {
    const editMode = localStorage.getItem("gk_editMode");
    if (editMode === "true") {
      setEditMode(true);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("gk_editMode", editMode.toString());
  }, [editMode]);

  return (
    <SessionProvider session={pageProps.session}>
      <AppSettingsContext.Provider
        value={{
          appSettings,
          setAppSettings,
          formStateAppSettings,
          formAppSettingsDispatch,
        }}
      >
        <ThemePreferenceContext.Provider
          value={{
            currentTheme,
            setCurrentTheme,
            breakpoints: theme.breakpoints,
            editMode,
            setEditMode,
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
                  setClientFormError(null);
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
                    setGuestFormError(null);
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
      </AppSettingsContext.Provider>
    </SessionProvider>
  );
};

export default App;
