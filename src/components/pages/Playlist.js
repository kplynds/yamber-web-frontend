import React, { useState, useEffect } from "react";
import DesktopNav from "../nav/DesktopNav";
import Hidden from "@material-ui/core/Hidden";
import MobileNav from "../nav/MobileNav";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../theme";
import { connect } from "react-redux";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { playButtonClick } from "../../redux/actions/dataActions";
import StopIcon from "@material-ui/icons/Stop";
import NotFound from "../NotFound";
import { getPlaylistCover } from "../../utils/cheekyAlgos";

const useStyles = makeStyles((theme) => ({
  root: {},
  playlistTop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: "2.5rem",
    marginBottom: "1rem",
  },
  span: {
    "&:hover": {
      textDecoration: "underline",
      color: theme.palette.text.primary,
      cursor: "pointer",
    },
  },
  songsContainer: {
    width: "70%",
    margin: "0 auto",
    padding: "1rem 0",
    [theme.breakpoints.down("md")]: {
      width: "80%"
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%"
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
  },
  albumImages: {
    height: "3.75rem",
    width: "3.75rem",
    margin: "0 1rem",
  },
}));

const Playlist = ({ user, match, ui, playButtonClick }) => {
  const classes = useStyles(theme);
  const history = useHistory();
  const id = match.params.playlistId;
  const handle = match.params.handle;
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
      axios
        .get(`/userbase/${handle}`)
        .then((res) => {
          setPlaylist({
            songs: res.data.user.recentListening.data,
            title: "Recent Listening",
            user: res.data.user.handle,
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
  const Content = () => {
    if (state.error) {
      return <NotFound />;
    } else if (playlist) {
      return (
        <div>
          {" "}
          <div className={classes.playlistTop}>
            <div style={{ margin: "0 .1rem" }}>
              {getPlaylistCover(playlist)}
            </div>
            <div style={{ marginLeft: "1rem" }}>
              <Typography variant="h4" color="textPrimary">
                {playlist.title}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                By{" "}
                <span
                  className={classes.span}
                  onClick={() => history.push(`/${playlist.user}`)}
                >
                  @{playlist.user}
                </span>
              </Typography>
            </div>
          </div>
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
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
  };
  return (
    <div className={classes.root}>
      <Hidden smDown>
        <DesktopNav />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
      </Hidden>
      <div>{state.loading ? <div>loading...</div> : <Content />}</div>
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
