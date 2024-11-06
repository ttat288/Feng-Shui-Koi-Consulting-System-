import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./components/Theme.ts";
import "./i18n/i18n.ts";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );
}
