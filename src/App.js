import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Featured from "./components/protected/Featured";
import Search from "./components/protected/Search";
import Profile from "./components/protected/Profile";
import AuthRoute from "./utils/AuthRoute";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { logout, getAuthenticatedUserData } from "./redux/actions/userActions";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";
import { Provider } from "react-redux";
import SpotifyUtil from "./components/SpotifyUtil";

axios.defaults.baseURL = "http://localhost:5000/flumes-company/us-central1/api";

export const store = configureStore({
  reducer: rootReducer,
});

const token = localStorage.getItem("token");
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logout());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: "SET_AUTHENTICATED" });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getAuthenticatedUserData());
  }
}

function App() {
  const state = store.getState();
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/spotifyauth">
            <SpotifyUtil />
          </Route>
          {/* Might need to protect these routes */}
          <AuthRoute path="/featured" component={Featured} />
          <AuthRoute path="/search" component={Search} />
          <AuthRoute path="/profile" component={Profile} />
          <Route path="/" exact>
            {state.user.authenticated ? <Redirect to="/profile" /> : <Home />}
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
