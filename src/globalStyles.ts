import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle`${css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #app {
    min-height: 100%;
    height: 100%;
  }

  body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: #f5f5f5;
    background-color: #121212;
  }

  a {
    color: #f6d365;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`}`;

export default GlobalStyles;
