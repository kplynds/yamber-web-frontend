import React from "react";
import { makeStyles } from "@mui/styles";
import theme from "../theme";
import Hidden from "@mui/material/Hidden";
import DesktopNav from "./nav/DesktopNav";
import MobileNav from "./nav/MobileNav";
import CircularProgress from "@mui/material/CircularProgress";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
  },
}));
const CenterLoadingWithNav = ({ user }) => {
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <Hidden mdDown>
        <DesktopNav />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
      </Hidden>
      <div className={classes.content}>
        <CircularProgress style={{ color: "#fff" }} />
      </div>
    </div>
  );
};

export default CenterLoadingWithNav;
