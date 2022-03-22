import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import theme from "../theme";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { SiApplemusic, SiSoundcloud, SiSpotify } from "react-icons/si";
import { connect } from "react-redux";
import axios from "axios";

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
  },
  bio: {
    marginLeft: "1.7rem",
  },
  stats: {
    display: "flex",
    justifyContent: "space-evenly",
    borderTop: `1px solid ${theme.palette.primary.light}`,
    padding: ".2rem 0",
  },
  button: {
    borderColor: theme.palette.primary.light,
    textTransform: "capitalize",
  },
  title: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    padding: "0 1rem",
    borderBottom: `1px solid ${theme.palette.primary.light}`,
  },
  textOverflow: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "65%",
  },
}));
const MobileProfile = ({ profile_p, user }) => {
  const classes = useStyles(theme);
  const [following, setFollowing] = useState(null);
  const followUser = () => {
    if (user.authenticated) {
      if (following === "follow") {
        setFollowing("following");
        axios
          .get(`/follow/${profile_p.handle}`)
          .then((res) => {})
          .catch((err) => {
            alert(`error trying to follow ${profile_p.handle}`);
            setFollowing("follow");
          });
      } else if (following === "following") {
        setFollowing("follow");
        axios
          .get(`/unfollow/${profile_p.handle}`)
          .then((res) => {})
          .catch((err) => {
            alert(`error trying to unfollow ${profile_p.handle}`);
            setFollowing("following");
          });
      }
    } else {
      alert("make an account to follow people!");
    }
  };
  useEffect(() => {
    if (Object.keys(user.data).length > 0) {
      if (user.authenticated) {
        if (profile_p.followers.includes(user.data.handle)) {
          setFollowing("following");
        } else {
          setFollowing("follow");
        }
      } else {
        setFollowing("follow");
      }
    }
  }, [user]);
  return (
    <div className={classes.root}>
      <div className={classes.basic}>
        <div>
          <Avatar
            alt={profile_p.info.displayName}
            src={profile_p.info.imageUrl}
            style={{ width: theme.spacing(11), height: theme.spacing(11) }}
          />
        </div>
        <div style={{ marginLeft: "2rem", width: "100%" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column"
            }}
          >
            <Button
              variant="outlined"
              size="small"
              // color="secondary"
              sx={{
                borderColor: theme.palette.primary.light,
                textTransform: "capitalize",
                marginRight: "1rem",
                color: theme.palette.text.primary,
                "&:hover": {
                  borderColor: theme.palette.text.primary
                },
                marginBottom: "1rem"
              }}
              fullWidth
              onClick={followUser}
            >
              {!following ? "loading" : following}
            </Button>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                borderColor: theme.palette.primary.light,
                textTransform: "capitalize",
                marginRight: "1rem",
                color: theme.palette.text.primary,
                "&:hover": {
                  borderColor: theme.palette.text.primary
                }
              }}
              onClick={() => {
                window.location.href = `/${user.data.handle}/playlist/commonplaylist?otheruser=${profile_p.handle}`;
              }}
            >
              find shared songs
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.socialAndName}>
        <Typography variant="body1" color="textPrimary">
          {profile_p.handle}
        </Typography>
        {Object.keys(profile_p.socials).map((social) => {
          return (
            <div style={{ display: "flex", marginLeft: "1%" }} key={social}>
              <a
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
                href={`https://${social}.com/${profile_p.socials[`${social}`]}`}
              >
                {icons[`${social}`]}
              </a>
            </div>
          );
        })}
      </div>
      <div className={classes.bio}>
        <Typography variant="body1" color="textPrimary">
          {profile_p.info.bio}
        </Typography>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    ui: state.ui,
  };
};

export default connect(mapState)(MobileProfile);
