import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import theme from "../../theme";

const useStyles = makeStyles((theme) => ({
  nav: {
    position: "fixed",
    width: "100%",
    height: "8%",
    top: "92%",
    display: "flex",
    justifyContent: "space-evenly",
  },
  item: {
    fontSize: "large",
    color: "black",
  },
  active: {
    color: "blue",
  },
}));

function MobileNav() {
  const classes = useStyles(theme);

  return (
    <div className="root">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            yamber
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.nav}>
        <NavLink
          to="/profile"
          className={classes.item}
          activeClassName={classes.active}
        >
          <PersonIcon fontSize="large" />
        </NavLink>
        <NavLink
          to="/featured"
          className={classes.item}
          activeClassName={classes.active}
        >
          <WhatshotIcon fontSize="large" />
        </NavLink>
        <NavLink
          to="/search"
          className={classes.item}
          activeClassName={classes.active}
        >
          <SearchIcon fontSize="large" />
        </NavLink>
      </div>
    </div>
  );
}

export default MobileNav;
