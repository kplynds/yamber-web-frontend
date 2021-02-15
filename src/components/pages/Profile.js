import { makeStyles } from "@material-ui/core/styles";
import theme from "../../theme";
import Hidden from "@material-ui/core/Hidden";
import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";
import { connect } from "react-redux";
import {
  logout,
  getAuthenticatedUserData,
  redirectToSpotify,
  makePlaylistWithSpotifyData,
} from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import Spotify from "spotify-web-api-js";
import axios from "axios";

const spotify = new Spotify();

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {},
}));

const Profile = ({
  user,
  logout,
  getAuthenticatedUserData,
  user_loading,
  redirectToSpotify,
  makePlaylistWithSpotifyData,
}) => {
  const classes = useStyles(theme);
  const history = useHistory();
  const logoutUser = (e) => {
    e.preventDefault();
    logout(history);
  };
  const syncWithSpotify = () => {
    redirectToSpotify();
  };
  const getSpotifyData = () => {
    // spotify.setAccessToken
    const now = Date.now();
    if (user.data.spotify.expireTime > now) {
      spotify.setAccessToken(user.data.spotify.access_token);
    } else {
      const payload = { refresh_token: user.data.spotify.refresh_token };
      axios
        .post("/spotifyrefreshtoken", payload)
        .then((res) => {
          spotify.setAccessToken(res.data.access_token);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    makePlaylistWithSpotifyData(spotify);
  };

  return (
    <div className={classes.root}>
      <Hidden xsDown>
        <DesktopNav />
      </Hidden>
      <Hidden smUp>
        <MobileNav />
      </Hidden>
      <div className={classes.content}>
        {user_loading ? (
          <div> loading... </div>
        ) : (
          <div> Welcome {user.data.handle}! </div>
        )}
        <button onClick={logoutUser}>Log out</button>
        <button onClick={getSpotifyData}>spotify</button>
        <button onClick={syncWithSpotify}>sync with spotify</button>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    user_loading: state.user.loading,
  };
};

const mapDispatch = {
  logout,
  getAuthenticatedUserData,
  redirectToSpotify,
  makePlaylistWithSpotifyData,
};

export default connect(mapState, mapDispatch)(Profile);
