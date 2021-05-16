import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import theme from "../../theme";
import Button from "@material-ui/core/Button";
import { Avatar } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import { SiApplemusic, SiSoundcloud, SiSpotify } from "react-icons/si";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";

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
    marginTop: "1%",
  },
}));
const MobileUserProfile = ({ user, logout }) => {
  const history = useHistory();
  const classes = useStyles(theme);
  const logoutUser = (e) => {
    e.preventDefault();
    logout(history);
  };
  return (
    <div className={classes.root}>
      <button onClick={logoutUser}>logout</button>
      <div className={classes.basic}>
        <div>
          <Avatar
            alt={user.data.info.displayName}
            src={user.data.info.imageUrl}
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
              @{user.data.handle}
            </Typography>
          </div>
          <Link to="/editprofile">
            <Button
              variant="contained"
              size="small"
              color="secondary"
              fullWidth
            >
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>
      <div className={classes.socialAndName}>
        <Typography variant="body1" color="textPrimary">
          {user.data.info.displayName}
        </Typography>
        {Object.keys(user.data.socials).map((social) => {
          if (user.data.socials[social] && user.data.socials[social] !== "") {
            return (
              <div style={{ display: "flex", marginLeft: "1%" }}>
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
      {/* <div className={classes.stats}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="textPrimary">
            {user.playlists.length}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            playlists
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="textPrimary">
            {user.data.following.length}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            following
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="textPrimary">
            {user.data.followers.length}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            followers
          </Typography>
        </div>
      </div> */}
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
