import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink } from "react-router-dom";

import theme from "../../theme";

const useStyles = makeStyles((theme) => ({
  root: {
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
  }
}));

function MobileNav() {
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <NavLink to="/profile" className={classes.item} activeClassName={classes.active}>
        <PersonIcon fontSize="large" />
      </NavLink>
      <NavLink to="/featured" className={classes.item} activeClassName={classes.active}>
        <WhatshotIcon fontSize="large" />
      </NavLink>
      <NavLink to="/search" className={classes.item} activeClassName={classes.active}>
        <SearchIcon fontSize="large" />
      </NavLink>
    </div>
  );
}

export default MobileNav;
