import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SearchIcon from "@material-ui/icons/Search";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { logout, seedWithSpotify } from "../../redux/actions/userActions";

import theme from "../../theme";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "5rem",
    background: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-between",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    margin: "0 10%",
    padding: "10%",
    borderRadius: "15px",
    alignItems: "center",
    textDecoration: "none",
    color: theme.palette.text.secondary,
    "&:visited": {
      textDecoration: "none",
    },
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
  active: {
    borderBottom: `5px solid ${theme.palette.secondary.light}`,
    borderBottomRightRadius: "0px",
    borderBottomLeftRadius: "0px",
    color: theme.palette.text.primary,
  },
  navItems: {
    display: "flex",
    justifyContent: "space-evenly",
    paddingRight: "5%"
  },
  logo: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.primary,
    paddingLeft: "5%"
  },
  iconText: {
    fontWeight: "bold",
  }
}));

function DeskTopNav({ user, logout, seedWithSpotify }) {
  const classes = useStyles(theme);
  const history = useHistory();
  const logoutUser = (e) => {
    e.preventDefault();
    logout(history);
  };
  const spotifyRefresh = (e) => {
    e.preventDefault()
    seedWithSpotify(user.data, { type: "refresh" })
  }
  const testingApple = (e) => {
    e.preventDefault()
    let music = window.MusicKit.getInstance();
    music.authorize()
      .then((res) => {
        music.Library.album("p.kGoq3xdHR10Rd6a")
          .then((res) => {
            console.log(res)
          })
      })
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.logo}>
        <Typography variant="h6" className={classes.logo}>
          yamber!
        </Typography>
      </div>
      <div className={classes.navItems}>
        <NavLink
          to={`/${user.data.handle}`}
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
      <div style={{display: "flex", flexDirection: "column"}}>
        <button onClick={logoutUser}>logout</button>
        <button onClick={spotifyRefresh}>Refresh Spotify Data</button>
        <button onClick={testingApple}>Apple music testing</button>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = {
  logout,
  seedWithSpotify
}

export default connect(mapState, mapDispatch)(DeskTopNav);
