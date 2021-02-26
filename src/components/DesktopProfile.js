import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import theme from "../theme";
import { FaSpotify } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import { colors } from "../utils/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    borderBottom: "1px solid grey",
    background: colors.dark
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  profilePhoto: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  name: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(1)
  },
}));

const DesktopProfile = ({ user }) => {
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <div className={classes.profilePhoto}>
        <Avatar
          alt={user.data.info.displayName}
          src={user.data.info.imageUrl}
          style={{ width: theme.spacing(15), height: theme.spacing(15) }}
        />
        <div className={classes.name}>
          <Typography variant="h4" style={{marginRight: theme.spacing(1), color: colors.text}}>{user.data.info.displayName}</Typography>
          <FaSpotify size={30} color={colors.text} />
        </div>
      </div>
      <div className={classes.content}>
        <Typography variant="h2" style={{color: colors.text}}>@{user.data.handle}</Typography>
        <Button>Make a Playlist</Button>
        <Typography variant="body1">{user.data.info.bio}</Typography>
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
