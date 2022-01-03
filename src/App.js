import React from "react";
import axios from "axios";

import theme from "./theme";
import {
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import AppRoutes from "./AppRoutes";

const deployed_api =
  "https://us-central1-flumes-company.cloudfunctions.net/api";
// const local_api = "http://localhost:5000/flumes-company/us-central1/api";

axios.defaults.baseURL = deployed_api;

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
