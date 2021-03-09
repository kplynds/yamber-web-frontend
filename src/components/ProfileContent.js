import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../theme";
import Spotify from "spotify-web-api-js";
import axios from "axios";
const spotify = new Spotify();

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.dark,
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
  },
  playlistsRoot: {
    background: theme.palette.primary.dark,
  },
}));
//1615322891210
const ProfileContent = ({ user }) => {
  const classes = useStyles(theme);
  const [tabValue, setTabValue] = useState(0);
  const [recentListening, setRecentListening] = useState(null);
  const setNewSpotifyToken = (token) => {
    const body = {
      token: token,
    };
    axios
      .post("/setnewspotifytoken", body)
      .then((res) => {
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSpotifyRecentData = useCallback(() => {
    const now = Date.now();
    if (user.data.spotify.expireTime > now) {
      spotify.setAccessToken(user.data.spotify.access_token);
      spotify
        .getMyTopTracks({
          time_range: "short_term",
          limit: 15,
        })
        .then((res) => {
          const finished = [];
          res.items.forEach((item) => {
            const song = {
              name: item.name,
              artists: item.artists,
              preview: item.preview_url,
              href: item.href,
              images: item.album.images,
            };
            finished.push(song);
          });
          setRecentListening(finished);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const payload = { refresh_token: user.data.spotify.refresh_token };
      axios
        .post("/spotifyrefreshtoken", payload)
        .then((res) => {
          const body = { token: res.data.access_token };
          axios
            .post("/setnewspotifytoken", body)
            .then((res) => {
              spotify.setAccessToken(res.data);
              spotify
                .getMyTopTracks({
                  time_range: "short_term",
                  limit: 15,
                })
                .then((res) => {
                  const finished = [];
                  res.items.forEach((item) => {
                    const song = {
                      name: item.name,
                      artists: item.artists,
                      preview: item.preview_url,
                      href: item.href,
                      images: item.album.images,
                      id: item.id,
                    };
                    finished.push(song);
                  });
                  setRecentListening(finished);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [
    user.data.spotify.access_token,
    user.data.spotify.expireTime,
    user.data.spotify.refresh_token,
  ]);
  const getArtistNames = (arr) => {
    const ret = [];
    arr.forEach((artist) => {
      ret.push(artist.name);
    });
    return ret;
  };

  useEffect(() => {
    if (user.data.spotify.authenticated) {
      getSpotifyRecentData();
    }
  }, [user.data.spotify.authenticated, getSpotifyRecentData]);
  const Playlists = () => {
    return <div className={classes.playlistsRoot}>playlists</div>;
  };

  const Overview = () => {
    return (
      <div className={classes.overviewRoot}>
        <div className={classes.listeningRecently}>
          <h4>Listening Recently</h4>
          {recentListening && (
            <div className={classes.recentSongs}>
              {recentListening.map((song, index) => {
                return (
                  <div className={classes.recentSong} key={index}>
                    <h4>
                      {index + 1}. {song.name}
                    </h4>
                    <p>{getArtistNames(song.artists).join(", ")}</p>
                    <img src={song.images[2].url} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {user.playlists.map((playlist, index) => {
          return (
            <div className={classes.playlist} key={playlist.id}>
              <h4>{playlist.data.title}</h4>
              <p>{index + 1}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <Tabs
          value={tabValue}
          onChange={(e, v) => {
            setTabValue(v);
          }}
        >
          <Tab label="overview" />
          <Tab label="playlists" />
        </Tabs>
      </div>
      <div className={classes.content}>
        {tabValue === 0 && <Overview />}
        {tabValue === 1 && <Playlists />}
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

// const mapDispatch = {

// };

export default connect(mapState)(ProfileContent);
