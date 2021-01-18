import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Hidden from "@material-ui/core/Hidden";
import { logout, hashParams } from "../../redux/actions/userActions";
import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";
import theme from "../../theme";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {},
}));

const Profile = ({ user, logout, hashParams }) => {
  const classes = useStyles(theme);
  const history = useHistory();
  const logoutUser = (e) => {
    e.preventDefault();
    logout(history);
  };

  useEffect(() => {
    if (window.location.search) {
      console.log("hashed")
      hashParams(window.location.search)
    } else {
      console.log("not found")
    }
  }, [hashParams])
  return (
    <div className={classes.root}>
      <Hidden xsDown>
        <DesktopNav />
      </Hidden>
      <Hidden smUp>
        <MobileNav />
      </Hidden>
      <div className={classes.content}>
        <div>Welcome {user.handle}!</div>
        <button onClick={logoutUser}>Log out</button>
        <a href="http://localhost:5000/flumes-company/us-central1/api/spotifylogin">Sync with Spotify</a>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user.credentials,
  };
};

const mapDispatch = {
    logout, hashParams,
}

export default connect(mapState, mapDispatch)(Profile);
