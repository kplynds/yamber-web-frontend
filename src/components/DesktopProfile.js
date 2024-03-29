import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import theme from "../theme";
import Button from "@mui/material/Button";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { SiApplemusic, SiSoundcloud, SiSpotify } from "react-icons/si";
import { useHistory } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import Modal from "@mui/material/Modal";
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
    [theme.breakpoints.down('lg')]: {
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
          <div style={{ display: "flex", alignItems: "center", marginTop: ".8rem" }}>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: theme.palette.primary.light,
                textTransform: "capitalize",
                marginRight: "1rem",
                color: theme.palette.text.primary,
              }}
              onClick={() => {
                history.push("/editprofile");
              }}
              fullWidth
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
        <div className={classes.displayNameAndSocials}>
          <Typography
            variant="body1"
            color="textPrimary"
            style={{ fontWeight: 600 }}
          >
            {user.data.handle}
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
