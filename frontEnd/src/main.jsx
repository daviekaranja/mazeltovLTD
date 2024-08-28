import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import CustomTheme from "./utils/theme.js";

import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider theme={CustomTheme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
