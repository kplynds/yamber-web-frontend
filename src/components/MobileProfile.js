import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import theme from "../theme";
import Button from "@material-ui/core/Button";
import { Avatar } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import { SiApplemusic, SiSoundcloud, SiSpotify } from "react-icons/si";

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
}));
const MobileProfile = ({ user, playlistsLength }) => {
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <div className={classes.basic}>
        <div>
          <Avatar
            alt={user.info.displayName}
            src={user.info.imageUrl}
            style={{ width: theme.spacing(11), height: theme.spacing(11) }}
          />
        </div>
        <div style={{ marginLeft: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: ".5rem",
            }}
          >
            <Typography variant="body1" color="textPrimary">
              @{user.handle}
            </Typography>
          </div>
          <Button>Follow</Button>
          <Button>Playlist</Button>
        </div>
      </div>
      <div className={classes.socialAndName}>
        <Typography variant="body1" color="textPrimary">
          {user.info.displayName}
        </Typography>
        {Object.keys(user.socials).map((social) => {
          return (
            <div style={{ display: "flex", marginLeft: "1%" }} key={social}>
              <a
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
                href={`https://${social}.com/${user.socials[`${social}`]}`}
              >
                {icons[`${social}`]}
              </a>
            </div>
          );
        })}
      </div>
      <div className={classes.bio}>
        <Typography variant="body1" color="textPrimary">
          {user.info.bio}
        </Typography>
      </div>
    </div>
  );
};

export default MobileProfile;
