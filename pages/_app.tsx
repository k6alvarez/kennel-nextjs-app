import React, { useState, createContext } from "react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "antd/dist/antd.css";
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
    display: flex;
    flex-direction: column ;
  }

  main, section, article {
    max-width: 100%;

    button {
      margin-top: ${({ theme }) => theme.space[4]};
    }
  }

  input, textarea, label, select {
    font-family: ${({ theme }) => theme.fonts.body};
    padding: ${({ theme }) => theme.space[2]};
    width: 100%;
    max-width: 100%;
    border-width: initial;

    @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
      width: 30vw;
    }
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
  }

  input[type="submit"] {
    font-family: ${({ theme }) => theme.fonts.body};
    margin-top: ${({ theme }) => theme.space[5]};
  }

  .steps-content {width: 100%;}
  .steps-action {

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
