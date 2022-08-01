import React, { useState, createContext } from "react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "../styles/reset.css";
import "../styles/fonts.css";
import { ThemeProvider } from "styled-components";

export const base = {
  breakpoints: ["768px", "1024px"],
  space: ["0px", "2px", "4px", "8px", "16px", "32px", "64px"],
  fonts: {
    heading: '"Dancing_Script", cursive',
    body: '"Lato", sans-serif',
  },
  fontSizes: ["12px", "14px", "16px", "20px", "24px"],
};
export const light = {
  primary: "#8c0b3e",
  primaryDark: "#740833",
  nav: "#f8f8f8",
  border: "#212121",
  textPrimary: "#ffffff",
  textSecondary: "#212121",
};
export const dark = {
  primary: "#f8f8f8",
  nav: "#740833",
  border: "#ffffff",
  textPrimary: "#212121",
  textSecondary: "#ffffff",
};

const themesMap = {
  light,
  dark,
};

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
          <Component {...pageProps} />
        </ThemeProvider>
      </ThemePreferenceContext.Provider>
    </SessionProvider>
  );
};

export default App;
