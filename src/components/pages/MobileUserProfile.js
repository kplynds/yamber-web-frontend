import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import theme from "../../theme";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { SiApplemusic, SiSoundcloud, SiSpotify } from "react-icons/si";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import Modal from "@mui/material/Modal";
import { logout } from "../../utils/cheekyAlgos";

const icons = {
  twitter: <TwitterIcon />,
  instagram: <InstagramIcon />,
  spotify: <SiSpotify />,
  apple: <SiApplemusic />,
  soundcloud: <SiSoundcloud />,
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.primary.light}`,
  },
  basic: {
    display: "flex",
    alignItems: "center",
    marginLeft: ".7rem",
    padding: "1rem",
  },
  socialAndName: {
    display: "flex",
    marginLeft: "1.7rem",
    fontWeight: "bold",
  },
  bio: {
    margin: "0 1.7rem",
    marginBottom: "1rem",
  },
  stats: {
    display: "flex",
    justifyContent: "space-evenly",
    borderTop: `1px solid ${theme.palette.primary.light}`,
    padding: ".2rem 0",
    marginTop: "1%",
  },
  hover: {
    "&:hover": {
      cursor: "pointer",
    },
    marginLeft: ".6rem",
  },
  modal: {
    position: "absolute",
    left: "50%",
    top: "50%",
    padding: "2rem 6rem",
    transform: `translate(-50%, -50%)`,
    backgroundColor: theme.palette.primary.dark,
  },
  textOverflow: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "65%",
  },
  title: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    padding: "0 1rem",
    borderBottom: `1px solid ${theme.palette.primary.light}`
  },
}));
const MobileUserProfile = ({ user, logout }) => {
  const classes = useStyles(theme);
  const [modal, setModal] = useState(false);
  const modalSwitch = () => {
    setModal(!modal);
  };
  const logoutClick = () => {
    logout();
  };
  return (
    <div className={classes.root}>
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
      {/* <div className={classes.title}>
        <Typography
          variant="h6"
          color="textPrimary"
          align="center"
          className={classes.textOverflow}
        >
          @{user.data.handle}'s&nbsp;
        </Typography>
        <Typography variant="h6" color="textPrimary" align="center">
          music taste
        </Typography>
      </div> */}
      <div className={classes.basic}>
        <div>
          <Avatar
            alt={user.data.info.displayName}
            src={user.data.info.imageUrl}
            style={{ width: theme.spacing(11), height: theme.spacing(11) }}
          />
        </div>
        <div style={{ marginLeft: "1rem", width: "100%", display: "flex", alignItems: "center" }}>
          <Link to="/editprofile" style={{ textDecoration: "none", flexGrow: 1 }}>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                borderColor: theme.palette.primary.light,
                textTransform: "capitalize",
                color: theme.palette.text.primary,
              }}
            >
              Edit Profile
            </Button>
          </Link>
          <SettingsIcon
              onClick={modalSwitch}
              className={classes.hover}
            />
        </div>
      </div>
      <div className={classes.socialAndName}>
        <Typography variant="body1" color="textPrimary">
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
        <Typography variant="body2" color="textPrimary">
          {user.data.info.bio}
        </Typography>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = {
  logout,
};

export default connect(mapState, mapDispatch)(MobileUserProfile);
