import React from "react";

import './assets/global.css';
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Landing } from "./pages/Landing";
import { Theme } from "./utils/GlobalInterfaces";
import { error } from "console";

const theme:Theme= {
  colors: {
    blue: '#1AD1F2',
    black: '14171a',
    darkgrey: '#657786',
    lightgrey: '#AAB8C2',
    offwhite: '#E1E8ED',
    white: '#F5F8FA',
    error: 'red',
  },
}

const GlobalStyle = createGlobalStyle`
*{
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
}
`;

export const App = () => {
  return (
    <><ThemeProvider theme={theme}>
      <GlobalStyle />
      <Landing></Landing>
    </ThemeProvider>
    <Landing></Landing></>
  )
}
