import React, { useState, createContext } from "react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "../styles/reset.css";
import "../styles/fonts.css";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { light, dark, base } from "../components/ui-kit/Theme";

const themesMap = {
  light,
  dark,
};

const GlobalStyle = createGlobalStyle`
  form, fieldset {
    gap: ${({ theme }) => theme.space[4]};
    width: 100%;
    display: flex;
    flex-direction: column ;
  }

  main, section, article { max-width: 100%; }

  input, textarea {
    font-family: ${({ theme }) => theme.fonts.body};

  }

  input[type="submit"] {
    font-family: ${({ theme }) => theme.fonts.body};
  }
`;

export const ThemePreferenceContext = createContext(null);

const App = ({ Component, pageProps }: AppProps) => {
  const [currentTheme, setCurrentTheme] = useState("light");

  const theme = { ...base, colors: themesMap[currentTheme] };

  return (
    <SessionProvider session={pageProps.session}>
      <ThemePreferenceContext.Provider
        value={{ currentTheme, setCurrentTheme }}
      >
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </ThemePreferenceContext.Provider>
    </SessionProvider>
  );
};

export default App;
