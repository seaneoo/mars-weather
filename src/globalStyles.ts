import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle`${css`
  html,
  body,
  #app {
    min-height: 100%;
    height: 100%;
  }
`}`;

export default GlobalStyles;
