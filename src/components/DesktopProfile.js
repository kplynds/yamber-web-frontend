import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import theme from "../theme";
import { FaSpotify } from "react-icons/fa";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    borderBottom: "1px solid grey",
    background: theme.palette.primary.dark,
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: theme.palette.primary.main,
    borderRadius: "15px",
    width: "25%",
  },
  basic: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  name: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(1),
  },
}));

const DesktopProfile = ({ user }) => {
  const classes = useStyles(theme);
  const profile = user.data
  return (
    <div className={classes.root}>
      <div className={classes.basic}>
        <Avatar
          alt={profile.info.displayName}
          src={profile.info.imageUrl}
          style={{ width: theme.spacing(15), height: theme.spacing(15) }}
        />
        <Typography variant="h4" color="textPrimary">
          @{profile.handle}
        </Typography>
      </div>
      <div className={classes.content}>
        <div className={classes.name}>
          <Typography
            variant="h4"
            style={{ marginRight: theme.spacing(1) }}
            color="textPrimary"
          >
            {profile.info.displayName}
          </Typography>
          <FaSpotify size={30} color={theme.palette.text.primary} />
        </div>
        <Button>Make a Playlist</Button>
        <Typography variant="body1" color="textPrimary">
          {profile.info.bio}
        </Typography>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    user_loading: state.user.loading,
  };
};

const mapDispatch = {
  //   logout,
  //   getAuthenticatedUserData,
  //   redirectToSpotify,
  //   makePlaylistWithSpotifyData,
};
export default connect(mapState, mapDispatch)(DesktopProfile);
