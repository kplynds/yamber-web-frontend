import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import theme from "../../theme";
import { connect } from "react-redux";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomizeCard from "./CustomizeCard";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingTop: "1rem",
  },
  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const Customize = ({ user }) => {
  const [longTermArtists, setLongTermArtists] = useState([]);
  const [mediumTermArtists, setMediumTermArtists] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles(theme);
  useEffect(() => {
    if (Object.keys(user.data).length > 0) {
      if (user.data.streamingProvider === "spotify") {
        if (user.data.spotify.expireTime > Date.now()) {
          axios
            .post("/getwelcomespotifydata", {
              token: user.data.spotify.access_token,
            })
            .then((res) => {
              setLongTermArtists(res.data.longTermArtists);
              setMediumTermArtists(res.data.mediumTermArtists);
              setUserPlaylists(res.data.playlists);
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
                  axios
                    .post("/getwelcomespotifydata", { token: res.data })
                    .then((res) => {
                      setLongTermArtists(res.data.longTermArtists);
                      setMediumTermArtists(res.data.mediumTermArtists);
                      setUserPlaylists(res.data.playlists);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log("error setting spotify token");
                });
            })
            .catch((err) => {
              console.log("error getting new spotify token");
            });
        }
      }
      setLoading(false);
    }
  }, [user.data]);
  if (Object.keys(user.data).length > 0 && !loading) {
    return (
      <div className={classes.root}>
        <Typography color="textPrimary">Set Up Your Profile</Typography>
        <CustomizeCard
          data={{
            longTermArtists: longTermArtists,
            mediumTermArtists: mediumTermArtists,
            playlists: userPlaylists,
          }}
        />
      </div>
    );
  } else {
    return (
      <div className={classes.loading}>
        <CircularProgress style={{ color: "#fff" }} />
      </div>
    );
  }
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(Customize);
