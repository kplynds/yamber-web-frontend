import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import theme from "../theme";
import Button from "@material-ui/core/Button";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import { SiApplemusic, SiSoundcloud, SiSpotify } from "react-icons/si";
import { useHistory } from "react-router-dom";

const icons = {
  twitter: <TwitterIcon />,
  instagram: <InstagramIcon />,
  spotify: <SiSpotify />,
  apple: <SiApplemusic />,
  soundcloud: <SiSoundcloud />,
};

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
  },
  photo: {
    width: "40%",
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "5rem",
    alignItems: "center",
  },
  name: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(1),
  },
  stats: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "1rem 0",
  },
  displayNameAndSocials: {
    display: "flex",
  },
}));

const DesktopProfile = ({ user }) => {
  const classes = useStyles(theme);
  const history = useHistory();

  return (
    <div className={classes.root}>
      {/* <Container style={{display: "flex"}}> */}
      <div className={classes.photo}>
        <Avatar
          alt={user.data.info.displayName}
          src={user.data.info.imageUrl}
          style={{ width: theme.spacing(15), height: theme.spacing(15) }}
        />
      </div>
      <div className={classes.content}>
        <div className={classes.name}>
          <Typography variant="h4" color="textPrimary">
            @{user.data.handle}
          </Typography>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            style={{ marginLeft: "1.5rem" }}
            onClick={() => {
              history.push("/editprofile");
            }}
          >
            Edit Profile
          </Button>
        </div>
        {/* <div className={classes.stats}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "3rem",
            }}
          >
            <Typography
              variant="body1"
              color="textPrimary"
              style={{ marginRight: ".3rem" }}
            >
              {user.playlists.length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              playlists
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "3rem",
            }}
          >
            <Typography
              variant="body1"
              color="textPrimary"
              style={{ marginRight: ".3rem" }}
            >
              {user.data.following.length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              following
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              color="textPrimary"
              style={{ marginRight: ".3rem" }}
            >
              {user.data.followers.length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              followers
            </Typography>
          </div>
        </div> */}
        <div className={classes.displayNameAndSocials}>
          <Typography
            variant="body1"
            color="textPrimary"
            style={{ fontWeight: 600 }}
          >
            {user.data.info.displayName}
          </Typography>
          {Object.keys(user.data.socials).map((social) => {
            if (user.data.socials[social] && user.data.socials[social] !== "") {
              return (
                <div style={{ display: "flex", marginLeft: "1%" }} key={social}>
                  <a
                    style={{
                      textDecoration: "none",
                      color: theme.palette.text.primary,
                    }}
                    href={`https://${social}.com/${
                      user.data.socials[`${social}`]
                    }`}
                  >
                    {icons[`${social}`]}
                  </a>
                </div>
              );
            } else return null;
          })}
        </div>
        <div className={classes.bio}>
          <Typography variant="body1" color="textPrimary">
            {user.data.info.bio}
          </Typography>
        </div>
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
