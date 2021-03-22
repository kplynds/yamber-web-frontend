import React, { useState, useEffect } from "react";
import DesktopNav from "../nav/DesktopNav";
import Hidden from "@material-ui/core/Hidden";
import MobileNav from "../nav/MobileNav";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../theme";
import { connect } from "react-redux";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getPlaylistCover, getArtistNames } from "../ProfileContent";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { getSpotifyRecentData } from "./UserProfile";

const useStyles = makeStyles((theme) => ({
  root: {},
  playlist: {},
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
  song: {
    display: "flex",
    alignItems: "center",
    padding: ".15rem 0",
    "&:hover": {
      background: theme.palette.primary.light,
      cursor: "pointer",
    },
    width: "30rem",
    margin: "0 auto",
  },
}));

const Playlist = ({ user, match }) => {
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
    if (id === "recent") {
      axios
        .get(`/userbase/${handle}`)
        .then((res) => {
          getSpotifyRecentData(res.data.user, setPlaylist, true);
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
      return <div>playlist does not exist</div>;
    } else if (playlist) {
      console.log(playlist);
      return (
        <div className={classes.playlist}>
          <div className={classes.playlistTop}>
            <div style={{ marginRight: "1rem" }}>
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
          {playlist.songs.map((song, index) => {
            return (
              <div className={classes.song} key={index}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "1rem",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ paddingLeft: "1rem" }}
                  >
                    {index + 1}
                  </Typography>
                  <img
                    src={song.images[0].url}
                    alt={song.name}
                    style={{
                      marginLeft: "1rem",
                      height: "3.75rem",
                      width: "3.75rem",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "72%",
                  }}
                >
                  <Typography variant="body2">{song.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {state.recentPlaylist
                      ? getArtistNames(song.artists).join(", ")
                      : song.artists.join(", ")}
                  </Typography>
                </div>
                <PlayArrowIcon style={{ marginRight: ".7rem" }} />
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
  };
  return (
    <div className={classes.root}>
      <Hidden xsDown>
        <DesktopNav />
      </Hidden>
      <Hidden smUp>
        <MobileNav />
      </Hidden>
      <div>{state.loading ? <div>loading...</div> : <Content />}</div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(Playlist);
