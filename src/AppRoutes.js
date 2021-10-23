import React from "react";
import theme from "./theme";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Featured from "./components/pages/Featured";
import Search from "./components/pages/Search";
import SpotifyUtil from "./components/SpotifyUtil";
import User from "./components/pages/User";
import Playlist from "./components/pages/Playlist";
import Edit from "./components/pages/Edit";
import StreamingProvider from "./components/signup + onboard/StreamingProvider";
import Customize from "./components/signup + onboard/Customize";
import NewPlaylist from "./components/pages/NewPlaylist";
import { makeStyles } from "@mui/styles";
import LandingStreaming from "./components/pages/new signup/LandingStreaming";
import CreateProfile from "./components/pages/new signup/CreateProfile";
import EditSongs from "./components/pages/EditSongs";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('lg')]: {
      marginBottom: "17%",
    },
  },
}));

const AppRoutes = () => {
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
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
          <Route path="/editsongs">
            <EditSongs />
          </Route>
          {/* Might need to protect these routes */}
          <Route
            path="/welcome/streamingProvider"
            component={StreamingProvider}
          />
          <Route path="/welcome/customize" component={Customize} />
          {/* <Route path="/:handle/playlist/:playlistId/edit" component={EditPlaylist} />
            <Route path="/:handle/playlist/:playlistId/add" component={AddSongToPlaylist} /> */}
          <Route path="/:handle/playlist/:playlistId" component={Playlist} />
          <Route path="/editprofile" component={Edit} />
          <Route path="/newplaylist" component={NewPlaylist} />
          <Route path="/featured" component={Featured} />
          <Route path="/search" component={Search} />
          <Route path="/profile" component={User} />
          <Route path="/:handle" component={User} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
};

export default AppRoutes;
