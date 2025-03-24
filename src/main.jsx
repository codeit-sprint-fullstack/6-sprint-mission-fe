
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./theme.js";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: pretendard;
  }
  li {
    list-style: none;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>

);
