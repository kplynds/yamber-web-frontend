import React from "react";
import { NavLink } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CssBaseline from "@mui/material/CssBaseline";
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
    flexDirection: 'column',
    // margin: "0 5%",
    padding: "0 3rem",
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
    width: "60%",
    // backgroundColor: "blue"
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    color: theme.palette.text.primary,
    width: "11%",
  },
  iconText: {
    fontWeight: "bold",
    fontSize: "1rem"
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    width: "11%",
  },
}));

function DeskTopNav({ user, logout, seedWithSpotify }) {
  const classes = useStyles(theme);
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
          <Typography variant="h6" className={classes.iconText}>
            Profile
          </Typography>
        </NavLink>
        <NavLink
          to="/newplaylist"
          className={classes.item}
          activeClassName={classes.active}
        >
          <AddIcon fontSize="large" />
          <Typography variant="h6" className={classes.iconText}>
            new playlist
          </Typography>
        </NavLink>
        <NavLink
          to="/search"
          className={classes.item}
          activeClassName={classes.active}
        >
          <SearchIcon fontSize="large" />
          <Typography variant="h6" className={classes.iconText}>
            explore
          </Typography>
        </NavLink>
      </div>
      <div className={classes.empty}>
        {/* <button onClick={logoutUser}>logout</button>
        <button onClick={spotifyRefresh}>Refresh Spotify Data</button>
        <button onClick={testingApple}>Apple music testing</button> */}
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
  seedWithSpotify,
};

export default connect(mapState, mapDispatch)(DeskTopNav);
