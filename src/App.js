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
import NewPlaylist from "./components/pages/NewPlaylist";
import { makeStyles } from "@material-ui/core/styles";
import LandingStreaming from "./components/pages/new signup/LandingStreaming";
import CreateProfile from "./components/pages/new signup/CreateProfile";

// const jwtSecret = process.env.JWT_SECRET || 'foofdytdyd';

const deployed_api =
  "https://us-central1-flumes-company.cloudfunctions.net/api";
// const local_api = "http://localhost:5000/flumes-company/us-central1/api";

axios.defaults.baseURL = deployed_api;

export const store = configureStore({
  reducer: rootReducer,
});

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      marginBottom: "17%"
    }
  }
}));

function App() {
  const classes = useStyles(theme)
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
    <div className={classes.root}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <LandingStreaming />
              </Route>
              <Route path="/spotifyauth">
                <SpotifyUtil />
              </Route>
              <Route path="/signup2">
                <LandingStreaming />
              </Route>
              <Route path="/createprofile">
                <CreateProfile />
              </Route>
              {/* Might need to protect these routes */}
              <Route
                path="/welcome/streamingProvider"
                component={StreamingProvider}
              />
              <Route path="/welcome/customize" component={Customize} />
              {/* <Route path="/:handle/playlist/:playlistId/edit" component={EditPlaylist} />
            <Route path="/:handle/playlist/:playlistId/add" component={AddSongToPlaylist} /> */}
              <Route
                path="/:handle/playlist/:playlistId"
                component={Playlist}
              />
              <Route path="/editprofile" component={Edit} />
              <Route path="/newplaylist" component={NewPlaylist} />
              <Route path="/featured" component={Featured} />
              <Route path="/search" component={Search} />
              <Route path="/profile" component={User} />
              <Route path="/:handle" component={User} />
              <Route exact path="/" component={Home} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
