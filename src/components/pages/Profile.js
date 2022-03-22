import React from "react";
import { makeStyles } from "@mui/styles";
import theme from "../../theme";
import Hidden from "@mui/material/Hidden";
import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";
import DesktopProfile from "../DesktopProfile";
import ProfileContent from "../ProfileContent";
import MobileUserProfile from "./MobileUserProfile";
const useStyles = makeStyles((theme) => ({
  root: {},
  profileContainer: {},
}));

const Profile = ({ songsLoading, artistsLoading }) => {
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <Hidden mdDown>
        <DesktopNav />
        <DesktopProfile />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
        <MobileUserProfile />
      </Hidden>
      <ProfileContent loadingArtists={artistsLoading} loadingSongs={songsLoading} />
    </div>
  );
};

export default Profile;
