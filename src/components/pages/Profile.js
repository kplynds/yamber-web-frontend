import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../theme";
import Hidden from "@material-ui/core/Hidden";
import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";
import DesktopProfile from "../DesktopProfile";
import ProfileContent from "../ProfileContent";
import MobileUserProfile from "./MobileUserProfile";
const useStyles = makeStyles((theme) => ({
  root: {},
  profileContainer: {},
}));

const Profile = () => {
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <Hidden smDown>
        <DesktopNav />
        <DesktopProfile />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
        <MobileUserProfile />
      </Hidden>
      <ProfileContent />
    </div>
  );
};

export default Profile;
