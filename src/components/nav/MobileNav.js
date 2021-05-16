import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink, useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import theme from "../../theme";

const useStyles = makeStyles((theme) => ({
  nav: {
    position: "fixed",
    width: "100%",
    bottom: "0%",
    paddingBottom: "1%",
    display: "flex",
    justifyContent: "space-evenly",
    background: theme.palette.primary.dark,
    zIndex: "99"
  },
  back: {
    zIndex: "99",
    width: "100%",
    height: "6%",
    top: "6%",
    padding: "0 5%",
    marginTop: "2%",
    borderBottom: `1px solid ${theme.palette.primary.light}`
  },
  item: {
    fontSize: "large",
    color: theme.palette.text.secondary,
    marginTop: ".5rem"
  },
  active: {
    color: theme.palette.text.primary
  },
}));

function MobileNav({ user }) {
  const classes = useStyles(theme);
  const history = useHistory();
  return (
    <div className="root">
      <CssBaseline />
      <div className={classes.back}>
        <ArrowBackIcon onClick={() => history.goBack()} />
      </div>
      <div className={classes.nav}>
        <NavLink
          to={`/${user.data.handle}`}
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

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(MobileNav);

