import React, { useState, createContext, useReducer } from "react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "antd/dist/antd.css";
import "../styles/reset.css";
import "../styles/fonts.css";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { light, dark, base } from "../components/ui-kit/Theme";
import {
  guestFormReducer,
  INITIAL_STATE,
} from "../components/Reservations/NewClients/guestFormReducer";
import { GuestFormProvider } from "../components/Reservations/NewClients/formContext";

const themesMap = {
  light,
  dark,
};

const GlobalStyle = createGlobalStyle`
  form, fieldset {
    display: flex;
    flex-direction: column ;
  }

  fieldset {
    max-width: 100%;
    margin: 0 auto;

    @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
      max-width: 40vw;
    }

  }

  main, section, article {
    max-width: 100%;
  }

  input, textarea, label, select {
    font-family: ${({ theme }) => theme.fonts.body};
    padding: ${({ theme }) => theme.space[2]};
    border-width: initial;
    width: 100%;
    border-radius: 3px;
  }

  textarea {
    max-width: 80vw;
    max-height:20vh;
    resize: vertical;
  }

  label {
    margin-top: ${({ theme }) => theme.space[3]};
    line-height: 1;
    padding-left: 0;
    white-space: nowrap;
  }

  input[type="submit"] {
    margin-top: ${({ theme }) => theme.space[4]};
    padding: ${({ theme }) => theme.space[3]};
    font-size: ${({ theme }) => theme.fontSizes[1]};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textPrimary};
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    width: max-content;
    min-width: 100px;
  }
`;

export const ThemePreferenceContext = createContext(null);

const App = ({ Component, pageProps }: AppProps) => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [guestFormState, guestFormDispatch] = useReducer(
    guestFormReducer,
    INITIAL_STATE
  );
  const [formError, setFormError] = useState(undefined);

  const theme = { ...base, colors: themesMap[currentTheme] };

  return (
    <SessionProvider session={pageProps.session}>
      <ThemePreferenceContext.Provider
        value={{ currentTheme, setCurrentTheme }}
      >
        <ThemeProvider theme={theme}>
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
              formError,
              setFormError,
            }}
          >
            <GlobalStyle />
            <Component {...pageProps} />
          </GuestFormProvider>
        </ThemeProvider>
      </ThemePreferenceContext.Provider>
    </SessionProvider>
  );
};

export default App;
