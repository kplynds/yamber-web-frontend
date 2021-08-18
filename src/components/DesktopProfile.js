import React, { useState } from "react";
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
import SettingsIcon from "@material-ui/icons/Settings";
import Modal from "@material-ui/core/Modal";
import { logout } from "../utils/cheekyAlgos";

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
    width: "37%",
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "5rem",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "30%",
    },
  },
  name: {
    alignItems: "center",
    paddingTop: theme.spacing(1),
    maxWidth: "90%",
  },
  stats: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "1rem 0",
  },
  displayNameAndSocials: {
    display: "flex",
    marginTop: ".8rem",
    // backgroundColor:"red",
    marginBottom: ".6rem",
  },
  bio: { maxWidth: "30rem" },
  hover: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  modal: {
    position: "absolute",
    left: "50%",
    top: "50%",
    padding: "2rem 6rem",
    transform: `translate(-50%, -50%)`,
    backgroundColor: theme.palette.primary.dark,
  },
  title: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: "60%",
  },
}));

const DesktopProfile = ({ user }) => {
  const classes = useStyles(theme);
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const modalSwitch = () => {
    setModal(!modal);
  };
  const logoutClick = () => {
    logout();
  };
  return (
    <div className={classes.root}>
      {/* <Container style={{display: "flex"}}> */}
      <Modal open={modal} onClose={modalSwitch}>
        <div className={classes.modal}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={logoutClick}
          >
            logout
          </Button>
        </div>
      </Modal>
      <div className={classes.photo}>
        <Avatar
          alt={user.data.info.displayName}
          src={user.data.info.imageUrl}
          style={{ width: theme.spacing(15), height: theme.spacing(15) }}
        />
      </div>
      <div className={classes.content}>
        <div className={classes.name}>
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              display: "flex",
            }}
          >
            <Typography
              variant="h5"
              color="textPrimary"
              className={classes.title}
            >
              @{user.data.handle}'s&nbsp;
            </Typography>
            <Typography
              variant="h5"
              color="textPrimary"
              // className={classes.title}
            >
              music taste
            </Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: ".8rem" }}>
            <Button
              variant="outlined"
              size="small"
              style={{
                marginRight: "1rem",
                borderColor: theme.palette.primary.light,
              }}
              onClick={() => {
                history.push("/editprofile");
              }}
            >
              Edit Profile
            </Button>
            <SettingsIcon
              fontSize="large"
              onClick={modalSwitch}
              className={classes.hover}
            />
          </div>
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
