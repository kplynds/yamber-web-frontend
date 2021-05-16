import React, { useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Featured from "./components/pages/Featured";
import Search from "./components/pages/Search";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { logout, getAuthenticatedUserData } from "./redux/actions/userActions";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";
import { Provider } from "react-redux";
import SpotifyUtil from "./components/SpotifyUtil";
import User from "./components/pages/User";
import theme from "./theme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Playlist from "./components/pages/Playlist";
import Edit from "./components/pages/Edit";
import SignupLand from "./components/signup + onboard/SignupLand";
import StreamingProvider from "./components/signup + onboard/StreamingProvider";
import Customize from "./components/signup + onboard/Customize";

// const jwtSecret = process.env.JWT_SECRET || 'foofdytdyd';

// const deployed_api = "https://us-central1-flumes-company.cloudfunctions.net/api";
const local_api = "http://localhost:5000/flumes-company/us-central1/api";

axios.defaults.baseURL = local_api;

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
        console.log("token expired");
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
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignupLand />
            </Route>
            <Route path="/spotifyauth">
              <SpotifyUtil />
            </Route>
            {/* Might need to protect these routes */}
            <Route
              path="/welcome/streamingProvider"
              component={StreamingProvider}
            />
            <Route path="/welcome/customize" component={Customize} />
            <Route path="/:handle/:playlistId" component={Playlist} />
            <Route path="/editprofile" component={Edit} />
            <Route path="/featured" component={Featured} />
            <Route path="/search" component={Search} />
            <Route path="/profile" component={User} />
            <Route path="/:handle" component={User} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
