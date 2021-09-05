import React, { useState, useEffect } from "react";
import DesktopNav from "../nav/DesktopNav";
import Hidden from "@material-ui/core/Hidden";
import MobileNav from "../nav/MobileNav";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../theme";
import { connect } from "react-redux";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { useHistory, Switch, Route, Link } from "react-router-dom";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { playButtonClick } from "../../redux/actions/dataActions";
import StopIcon from "@material-ui/icons/Stop";
import NotFound from "../NotFound";
import { getPlaylistCover } from "../../utils/cheekyAlgos";
import EmptyPlaylist from "../EmptyPlaylist";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import EditPlaylist from "./EditPlaylist";
import AddSongToPlaylist from "./AddSongToPlaylist";

const useStyles = makeStyles((theme) => ({
  root: {},
  playlistTop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: "2.5rem",
    marginBottom: "1rem",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  },
  margin: {
    [theme.breakpoints.down("md")]: {
      margin: "1rem 0",
    },
  },
  span: {
    "&:hover": {
      textDecoration: "underline",
      color: theme.palette.text.primary,
      cursor: "pointer",
    },
  },
  playlistInfo: {
    justifyContent: "center",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
  },
  songsContainer: {
    width: "70%",
    margin: "0 auto",
    padding: "1rem 0",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  recentsSong: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: ".15rem 1rem",
    "&:hover": {
      background: theme.palette.primary.light,
      cursor: "pointer",
    },
    // backgroundColor: "red",
  },
  albumImages: {
    height: "3.75rem",
    width: "3.75rem",
    margin: "0 1rem",
  },
  editButtons: {
    display: "flex",
    justifyContent: "center",
    marginTop: ".5rem",
  },
  noLinkStyles: {
    textDecoration: "none"
  }
}));

const Playlist = ({ user, match, ui, playButtonClick }) => {
  const classes = useStyles(theme);
  const history = useHistory();
  const id = match.params.playlistId;
  const handle = match.params.handle;
  const own = handle === user.data.handle;
  const [state, setState] = useState({
    loading: false,
    error: false,
    recentPlaylist: false,
  });
  const [playlist, setPlaylist] = useState(null);
  useEffect(() => {
    setState({
      loading: true,
      error: false,
      recentPlaylist: false,
    });
    if (id === "recentlistening") {
      const querystring = new URLSearchParams(window.location.search)
      const timeRange = querystring.get("timeRange")
      axios
        .get(`/userbase/${handle}`)
        .then((res) => {
          setPlaylist({
            songs: res.data.user.recentListening.data[timeRange],
            title: "Recent Listening",
            user: res.data.user.handle,
            images: [],
          });
          setState({
            loading: false,
            error: false,
            recentPlaylist: true,
          });
        })
        .catch((err) => {
          console.log("error");
          console.log(err);
          setState({
            loading: false,
            error: true,
            recentPlaylist: false,
          });
        });
    } else {
      axios
        .get(`/playlist/${id}`)
        .then((res) => {
          setState({
            loading: false,
            error: false,
            recentPlaylist: false,
          });
          setPlaylist(res.data);
        })
        .catch((err) => {
          setState({
            loading: false,
            error: true,
            recentPlaylist: false,
          });
        });
    }
  }, [id, handle]);
  const Loading = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress style={{ color: "#fff" }} />
      </div>
    );
  };
  const Content = () => {
    if (state.error) {
      return <NotFound />;
    } else if (playlist) {
      return (
        <div>
          {" "}
          <div className={classes.playlistTop}>
            <div style={{ margin: "0 .1rem" }}>
              {getPlaylistCover(playlist, 6)}
            </div>
            <div style={{ marginLeft: "1rem" }}>
              <Typography
                variant="h4"
                color="textPrimary"
                className={classes.margin}
              >
                {playlist.title}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {playlist.description}
              </Typography>
            </div>
          </div>
          <div className={classes.playlistInfo}>
            <Typography variant="subtitle2" color="textSecondary">
              By{" "}
              <span
                className={classes.span}
                onClick={() => history.push(`/${playlist.user}`)}
              >
                @{playlist.user}
              </span>
            </Typography>
            &nbsp;
            <span
              style={{ fontSize: "5px", color: theme.palette.text.secondary }}
            >
              {"\u2B24"}
            </span>
            &nbsp;
            <Typography variant="subtitle2" color="textSecondary">
              {playlist.songs.length}&nbsp;songs
            </Typography>
          </div>
          {own && (
            <div className={classes.editButtons}>
              <Link to={`${window.location.pathname}/add`} className={classes.noLinkStyles}>
                <Button startIcon={<AddIcon />}>add songs</Button>
              </Link>
              <Link to={`${window.location.pathname}/edit`} className={classes.noLinkStyles}>
                <Button startIcon={<EditIcon />}>edit details</Button>
              </Link>
            </div>
          )}
          {playlist.songs.length < 1 ? (
            <EmptyPlaylist user={user} id={id} />
          ) : (
            <div className={classes.songsContainer}>
              {playlist.songs.map((song, index) => {
                return (
                  <div className={classes.recentsSong} key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        {index + 1}
                      </Typography>
                      <img
                        src={song.images[0].url}
                        alt={song.name}
                        className={classes.albumImages}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="body2">{song.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {song.artists.join(", ")}
                        </Typography>
                      </div>
                    </div>

                    {ui.audio.active && ui.audio.src === song.preview ? (
                      <StopIcon
                        onClick={() => {
                          playButtonClick(song.preview, ui.audio);
                        }}
                      />
                    ) : (
                      <PlayArrowIcon
                        onClick={() => {
                          playButtonClick(song.preview, ui.audio);
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    } else {
      return <Loading />;
    }
  };
  // let match = useRouteMatch();
  // let location = useLocation();
  return (
    <div className={classes.root}>
      <Hidden smDown>
        <DesktopNav />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
      </Hidden>
      <div>
        {state.loading ? (
          <Loading />
        ) : (
          <Switch>
            <Route path={`${match.path}/edit`}>
              <EditPlaylist playlist={playlist} id={id} />
            </Route>
            <Route path={`${match.path}/add`}>
              <AddSongToPlaylist playlist={playlist} id={id} />
            </Route>
            <Route path={match.path}>
              <Content />
            </Route>
          </Switch>
        )}
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

export default connect(mapState, mapDispatch)(Playlist);
