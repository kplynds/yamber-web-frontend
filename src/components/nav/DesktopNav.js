import React from "react";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SearchIcon from "@material-ui/icons/Search";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import theme from "../../theme";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    height: "50%",
    position: "fixed",
    width: "15%",
    top: "20%",
    bottom: "30%",
    left: "3%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid grey",
    borderRadius: "10px",
    textDecoration: "none",
    color: "black",
    "&:visited": {
      textDecoration: "none",
      color: "black",
    },
    "&:hover": {
      backgroundColor: "red",
    },
  },
  active: {
    backgroundColor: "blue",
  },
}));

function DeskTopNav() {
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
      <div className={classes.sidebar}>
        <NavLink
          to="/profile"
          className={classes.item}
          activeClassName={classes.active}
        >
          <PersonIcon style={{ paddingRight: 5, fontSize: 40 }} />
          <Typography>My taste</Typography>
        </NavLink>
        <NavLink
          to="/featured"
          className={classes.item}
          activeClassName={classes.active}
        >
          <WhatshotIcon style={{ paddingRight: 5, fontSize: 40 }} />
          <Typography>Featured</Typography>
        </NavLink>
        <NavLink
          to="/search"
          className={classes.item}
          activeClassName={classes.active}
        >
          <SearchIcon style={{ paddingRight: 5, fontSize: 40 }} />
          <Typography>Search</Typography>
        </NavLink>
      </div>
    </div>
  );
}

export default DeskTopNav;
