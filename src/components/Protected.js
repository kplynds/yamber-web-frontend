import React from "react";

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
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Profile from "./protected/Profile"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function Protected() {
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <Router>
        <Route path="/profile">
          <Profile />
        </Route>
      </Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            yamber
          </Typography>
        </Toolbar>
      </AppBar>
      <Hidden xsDown>
        <DesktopNav />
      </Hidden>
      <Hidden smUp>
        <MobileNav />
      </Hidden>
    </div>
  );
}

export default Protected;
