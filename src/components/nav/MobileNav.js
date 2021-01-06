import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SearchIcon from "@material-ui/icons/Search";

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
  icon: {
    fontSize: "large",
  },
}));

function MobileNav() {
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <PersonIcon fontSize="large" />
      <WhatshotIcon fontSize="large" />
      <SearchIcon fontSize="large" />
    </div>
  );
}

export default MobileNav;
