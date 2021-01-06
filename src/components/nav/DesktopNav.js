import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SearchIcon from "@material-ui/icons/Search";

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
    "&:hover": {
      backgroundColor: "red",
    },
  },
}));

function DeskTopNav() {
  const classes = useStyles(theme);

  return (
    <div className={classes.sidebar}>
      <div to="/profile" className={classes.item}>
        <PersonIcon style={{ paddingRight: 5, fontSize: 40 }} />
        <Typography>My taste</Typography>
      </div>
      <div className={classes.item}>
        <WhatshotIcon style={{ paddingRight: 5, fontSize: 40 }} />
        <Typography>Featured</Typography>
      </div>
      <div className={classes.item}>
        <SearchIcon style={{ paddingRight: 5, fontSize: 40 }} />
        <Typography>Search</Typography>
      </div>
    </div>
  );
}

export default DeskTopNav;
