import React from "react";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SearchIcon from "@material-ui/icons/Search";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";

import theme from "../../theme";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "5rem",
    background: "grey",
    display: "flex",
    justifyContent: "space-between",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    margin: "0 10%",
    padding: "10%",
    alignItems: "center",
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
    borderBottom: "5px solid red"
  },
  navItems: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  logo: {
    display: "flex",
    alignItems: "center"
  },
  iconText: {
    fontWeight: "bold",
  }
}));

function DeskTopNav({ user }) {
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.logo}>
        <Typography variant="h6">
          yamber!
        </Typography>
      </div>
      <div className={classes.navItems}>
        <NavLink
          to={`${user.data.handle}`}
          className={classes.item}
          activeClassName={classes.active}
        >
          <PersonIcon fontSize="large" />
          <Typography variant="h6" className={classes.iconText}>Profile</Typography>
        </NavLink>
        <NavLink
          to="/featured"
          className={classes.item}
          activeClassName={classes.active}
        >
          <WhatshotIcon fontSize="large" />
          <Typography variant="h6" className={classes.iconText}>Featured</Typography>
        </NavLink>
        <NavLink
          to="/search"
          className={classes.item}
          activeClassName={classes.active}
        >
          <SearchIcon fontSize="large" />
          <Typography variant="h6" className={classes.iconText}>Search</Typography>
        </NavLink>
      </div>
      <div></div>
      {/* <AppBar position="static">
        <Typography variant="h6" className={classes.title}>
          yamber
        </Typography>
        <Toolbar className={classes.navItems}>
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
        </Toolbar>
      </AppBar> */}
      {/* <div className={classes.sidebar}>
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
      </div> */}
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(DeskTopNav);
