import React, { useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { logout, getAuthenticatedUserData } from "./redux/actions/userActions";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";
import { Provider } from "react-redux";
import theme from "./theme";
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from "@mui/material/styles";

// import SignupLand from "./components/signup + onboard/SignupLand";

import AppRoutes from "./AppRoutes";

const deployed_api =
  "https://us-central1-flumes-company.cloudfunctions.net/api";
// const local_api = "http://localhost:5000/flumes-company/us-central1/api";

axios.defaults.baseURL = deployed_api;

export const store = configureStore({
  reducer: rootReducer,
});



function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        store.dispatch(logout());
        window.location.href = "/";
        store.dispatch({ type: "FULLY_MOUNTED" });
      } else {
        if (window.location.pathname === "/") {
          window.location.href = `/${decoded.handle}`;
        }
        store.dispatch({ type: "SET_AUTHENTICATED" });
        axios.defaults.headers.common["Authorization"] = token;
        store.dispatch(getAuthenticatedUserData());
      }
    } else {
      store.dispatch({ type: "FULLY_MOUNTED" });
    }
  }, []);
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <AppRoutes />
        </MuiThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
