import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import theme from "../theme";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
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
  button: {
    borderColor: theme.palette.primary.light,
    textTransform: "capitalize",
  },
  title: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    padding: "0 1rem",
    borderBottom: `1px solid ${theme.palette.primary.light}`
  },
  textOverflow: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "65%",
  },
}));
const MobileProfile = ({ user, playlistsLength }) => {
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      {/* <div className={classes.title}>
        <Typography
          variant="h6"
          color="textPrimary"
          align="center"
          className={classes.textOverflow}
        >
          @{user.handle}'s&nbsp;
        </Typography>
        <Typography variant="h6" color="textPrimary" align="center">
          music taste
        </Typography>
      </div> */}
      <div className={classes.basic}>
        <div>
          <Avatar
            alt={user.info.displayName}
            src={user.info.imageUrl}
            style={{ width: theme.spacing(11), height: theme.spacing(11) }}
          />
        </div>
        <div style={{ marginLeft: "2rem", width: "100%" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              // color="secondary"
              style={{
                borderColor: theme.palette.primary.light,
                textTransform: "capitalize",
                marginRight: "1rem",
              }}
              fullWidth
            >
              follow
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              fullWidth
            >
              playlist
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.socialAndName}>
        <Typography variant="body1" color="textPrimary">
          {user.handle}
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
