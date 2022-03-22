import React from "react";
import { connect } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@mui/styles";
import theme from "../theme";
import { playButtonClick } from "../redux/actions/dataActions";
import Recent from "./profile content/Recent";
import Playlists from "./profile content/Playlists";
import Artists from "./profile content/Artists";
import {
  Route,
  Switch,
  useRouteMatch,
  Link,
  useLocation,
} from "react-router-dom";

export const getArtistNames = (arr) => {
  const ret = [];
  arr.forEach((artist) => {
    ret.push(artist.name);
  });
  return ret;
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.dark,
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down('md')]: {
      marginBottom: "1rem",
    },
  },
  playlistsRoot: {
    background: theme.palette.primary.dark,
  },
  centerText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  recentsContent: {
    background: theme.palette.primary.main,
    borderRadius: "8px",
    margin: "1rem 4rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    [theme.breakpoints.down('md')]: {
      margin: "1rem",
    },
  },
  recentsSong: {
    display: "flex",
    alignItems: "center",
    padding: ".15rem 0",
    "&:hover": {
      background: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
    padding: ".3rem 0",
  },
  linkText: {
    "&:hover": {
      textDecoration: "underline",
      color: theme.palette.text.primary,
    },
  },
  artist: {
    display: "flex",
    alignItems: "center",
    textOverflow: "ellipsis",
    padding: ".3rem 0",
  },
  playlist: {
    display: "flex",
    flexDirection: "column",
    padding: "1% 2%",
    margin: "1% 10%",
    "&:hover": {
      background: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
  playlistContainer: {
    // going to need to add some css here so it wraps ever 3 playlists
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down('md')]: {
      paddingBottom: "18%",
    },
  },
}));
//1615322891210
const ProfileContent = ({ user, loadingSongs, loadingArtists }) => {
  const classes = useStyles(theme);
  let match = useRouteMatch();
  let location = useLocation();
  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <Tabs
          value={location.pathname}
          textColor="inherit"
          TabIndicatorProps={{ style: {
            background: theme.palette.text.primary
          }}}
        >
          <Tab
            disableRipple
            label="songs"
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
          {/* <Tab
            disableRipple
            label="NFTs"
            to={`${match.url}/nfts`}
            component={Link}
            value={`${match.url}/playlists`}
          /> */}
        </Tabs>
      </div>
      <div className={classes.content}>
        <Switch>
          <Route path={`${match.path}/artists`}>
            <Artists artists_loading={loadingArtists} auto={user.data.artistsAuto}/>
          </Route>
          <Route path={`${match.path}/playlists`}>
            <Playlists handle={user.data.handle} />
          </Route>
          <Route path={match.path}>
            <Recent songs_loading={loadingSongs} />
          </Route>
        </Switch>
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

export default connect(mapState, mapDispatch)(ProfileContent);
