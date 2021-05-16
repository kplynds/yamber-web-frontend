import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../theme";
import Hidden from "@material-ui/core/Hidden";
import DesktopNav from "./nav/DesktopNav";
import MobileNav from "./nav/MobileNav";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
  },
}));
const NotFound = ({ user }) => {
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <Hidden smDown>
        <DesktopNav />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
      </Hidden>
      <div className={classes.content}>
        <Typography color="textPrimary" gutterBottom>
          This page could not be found you suck :(
        </Typography>
        <Typography color="textSecondary">
          Just kidding, the page actually doesn't exist though
        </Typography>
      </div>
    </div>
  );
};

export default NotFound;
