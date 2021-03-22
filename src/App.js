import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Featured from "./components/pages/Featured";
import Search from "./components/pages/Search";
import AuthRoute from "./utils/AuthRoute";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { logout, getAuthenticatedUserData } from "./redux/actions/userActions";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";
import { Provider } from "react-redux";
import SpotifyUtil from "./components/SpotifyUtil";
import User from "./components/pages/User";
import theme from "./theme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import Playlist from "./components/pages/Playlist";

// const jwtSecret = process.env.JWT_SECRET || 'foofdytdyd';

const deployed_api = "https://us-central1-flumes-company.cloudfunctions.net/api";
// const local_api = "http://localhost:5000/flumes-company/us-central1/api";

axios.defaults.baseURL = deployed_api;

export const store = configureStore({
  reducer: rootReducer,
});

const token = localStorage.getItem("token");
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logout());
    window.location.href = "/";
  } else {
    store.dispatch({ type: "SET_AUTHENTICATED" });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getAuthenticatedUserData());
    store.dispatch({ type: "TEST" });
  }
}

function App() {
  // console.log(state);
  // const handle = state.user.test;
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
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
            <Route path="/:handle/:playlistId" component={Playlist} />
            <AuthRoute path="/featured" component={Featured} />
            <AuthRoute path="/search" component={Search} />
            <AuthRoute path="/profile" component={User} />
            <Route path="/:handle" component={User} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
