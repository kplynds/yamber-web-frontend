import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import Hidden from "@mui/material/Hidden";
import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";
import theme from "../../theme";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MobileProfile from "../MobileProfile";
import { playButtonClick } from "../../redux/actions/dataActions";
import Playlists from "../profile content/Playlists";
import Recent from "../profile content/Recent";
import Artists from "../profile content/Artists";
import {
  Route,
  Switch,
  useRouteMatch,
  Link,
  useLocation,
} from "react-router-dom";
import { SiApplemusic, SiSoundcloud, SiSpotify } from "react-icons/si";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import axios from "axios";

const icons = {
  twitter: <TwitterIcon />,
  instagram: <InstagramIcon />,
  spotify: <SiSpotify />,
  apple: <SiApplemusic />,
  soundcloud: <SiSoundcloud />,
};

const useStyles = makeStyles((theme) => ({
  tabs: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      marginBottom: "1rem",
    },
  },
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
    [theme.breakpoints.down("lg")]: {
      width: "30%",
    },
  },
  name: {
    // display: "flex",
    // alignItems: "center",
    paddingTop: theme.spacing(1),
    // maxWidth: "90%",
    minWidth: "25rem",
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
  title: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: "60%",
  },
}));

const UserProfile = ({ profile, user }) => {
  const classes = useStyles(theme);
  const [following, setFollowing] = useState(null);
  const followUser = () => {
    if (user.authenticated) {
      if (following === "follow") {
        setFollowing("following");
        axios
          .get(`/follow/${profile.handle}`)
          .then((res) => {})
          .catch((err) => {
            alert(`error trying to follow ${profile.handle}`);
            setFollowing("follow");
          });
      } else if (following === "following") {
        setFollowing("follow");
        axios
          .get(`/unfollow/${profile.handle}`)
          .then((res) => {})
          .catch((err) => {
            alert(`error trying to unfollow ${profile.handle}`);
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
        if (user.data.following.includes(profile.handle)) {
          setFollowing("following");
        } else {
          setFollowing("follow");
        }
      } else {
        setFollowing("follow");
      }
    }
  }, [user]);
  const DesktopProfile = () => {
    return (
      <div className={classes.root}>
        <div className={classes.photo}>
          <Avatar
            alt={profile.info.displayName}
            src={profile.info.imageUrl}
            style={{ width: theme.spacing(15), height: theme.spacing(15) }}
          />
        </div>
        <div className={classes.content}>
          <div className={classes.name}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: ".8rem",
                whiteSpace: "nowrap",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderColor: theme.palette.primary.light,
                  textTransform: "capitalize",
                  marginRight: "1rem",
                  color: theme.palette.text.primary,
                }}
                fullWidth
                onClick={followUser}
              >
                {!following ? "loading" : following}
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderColor: theme.palette.primary.light,
                  textTransform: "capitalize",
                  marginRight: "1rem",
                  color: theme.palette.text.primary,
                }}
                fullWidth
              >
                make a common playlist
              </Button>
            </div>
          </div>
          <div className={classes.displayNameAndSocials}>
            <Typography
              variant="body1"
              color="textPrimary"
              style={{ fontWeight: 600 }}
            >
              {profile.handle}
            </Typography>
            {Object.keys(profile.socials).map((social) => {
              if (profile.socials[social] && profile.socials[social] !== "") {
                return (
                  <div
                    style={{ display: "flex", marginLeft: "1%" }}
                    key={social}
                  >
                    <a
                      style={{
                        textDecoration: "none",
                        color: theme.palette.text.primary,
                      }}
                      href={`https://${social}.com/${
                        profile.socials[`${social}`]
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
              {profile.info.bio}
            </Typography>
          </div>
        </div>
      </div>
    );
  };
  let match = useRouteMatch();
  let location = useLocation();
  return (
    <div className={classes.base}>
      <Hidden mdDown>
        <DesktopNav />
        <DesktopProfile />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
        <MobileProfile profile_p={profile} />
      </Hidden>
      <div className={classes.tabs}>
        <Tabs
          value={location.pathname}
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              background: theme.palette.text.primary,
            },
          }}
        >
          <Tab
            disableRipple
            label="recent"
            component={Link}
            to={`${match.url}`}
            value={`${match.url}`}
          />
          <Tab
            disableRipple
            label="artists"
            component={Link}
            to={`${match.url}/artists`}
            value={`${match.url}/artists`}
          />
          <Tab
            disableRipple
            label="playlists"
            to={`${match.url}/playlists`}
            component={Link}
            value={`${match.url}/playlists`}
          />
        </Tabs>
      </div>
      <div className={classes.stuff}>
        <Switch>
          <Route path={`${match.path}/artists`}>
            <Artists data={profile.topArtists} auto={profile.artistsAuto} />
          </Route>
          <Route path={`${match.path}/playlists`}>
            <Playlists handle={profile.handle} />
          </Route>
          <Route path={match.path}>
            <Recent data={profile} />
          </Route>
        </Switch>

        {/* {tabValue === 0 && <Recent data={profile} />}
        {tabValue === 1 && <Artists data={profile.topArtists} />}
        {tabValue === 2 && <Playlists handle={profile.handle} />} */}
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

const mapDispatch = {
  playButtonClick,
};

export default connect(mapState, mapDispatch)(UserProfile);
