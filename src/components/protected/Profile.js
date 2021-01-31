import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Hidden from "@material-ui/core/Hidden";
import { logout, setSpotify } from "../../redux/actions/userActions";
import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";
import theme from "../../theme";
// import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {},
}));

const Profile = ({ user, logout, hashParams, user_loading }) => {
  const classes = useStyles(theme);
  const history = useHistory();
  const logoutUser = (e) => {
    e.preventDefault();
    logout(history);
  };

  useEffect(() => {
    if (window.location.search) {
      setSpotify(window.location.search);
    }
  }, []);
  return (
    <div className={classes.root}>
      <Hidden xsDown>
        <DesktopNav />
      </Hidden>
      <Hidden smUp>
        <MobileNav />
      </Hidden>
      <div className={classes.content}>
        { user_loading ? <div> loading... </div> : <div> Welcome {user.handle}! </div> }
        <button onClick={logoutUser}>Log out</button>
        <a href="http://localhost:5000/flumes-company/us-central1/api/spotifylogin">
          Sync with Spotify
        </a>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user.data,
    user_loading: state.user.loading
  };
};

const mapDispatch = {
  logout,
  setSpotify,
};

export default connect(mapState, mapDispatch)(Profile);
