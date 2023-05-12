import React from "react";
import { createGlobalStyle, css } from "styled-components";

export const GlobalStyles = React.memo(
  createGlobalStyle`${css`
    * {
      margin: 0;
      box-sizing: border-box;
      padding: 0;
      border: 0;
      font-family: "Montserrat", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .app {
      background-color: #f4f4f4;
      width: 100%;
      height: 100vh;
      overflow-y: scroll;
    }

    .main-content {
      height: 100%;
    }
    ::-webkit-scrollbar {
      width: 5px;
      border-radius: 16px;
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #f4f4f4;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #303b84;
    }
    a {
      text-decoration: none;
      font: inherit;
      color: inherit;
    }
  `}`,
);
