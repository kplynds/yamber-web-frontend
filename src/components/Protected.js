import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

// mui imports
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import theme from "../theme";
import DesktopNav from "./nav/DesktopNav";
import MobileNav from "./nav/MobileNav";

import { logout } from "../redux/actions/userActions"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function Protected(props) {
  const history = useHistory();
  const logoutUser = (e) => {
    e.preventDefault()
    props.logout()
    history.push("/")
  }
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            yamber
          </Typography>
        </Toolbar>
      </AppBar>
      <button onClick={logoutUser}>sign out</button>
      <Hidden xsDown>
        <DesktopNav />
      </Hidden>
      <Hidden smUp>
        <MobileNav />
      </Hidden>
    </div>
  );
}

const mapState = (state) => {
  return state
}

const mapDispatch = {
  logout,
}

export default connect(mapState, mapDispatch) (Protected);
