import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { getPlaylistCover } from "../../utils/cheekyAlgos";
import Grid from "@mui/material/Grid";

const Playlists = ({ handle, user }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (handle) {
      setLoading(true);
      axios
        .get(`/playlists/${handle}`)
        .then((res) => {
          setPlaylists(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [handle]);
  if (!loading) {
    if (playlists.length < 1) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "1rem",
          }}
        >
          <Typography color="textPrimary">User has no playlists :(</Typography>
          <Typography color="textSecondary" variant="body2">
            you should contact them and tell them they suck
          </Typography>
        </div>
      );
    }
    return (
      <Grid container spacing={2}>
        {playlists.map((playlist) => {
          return (
            <Grid
              item
              key={playlist.id}
              xs={6}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <a href={`/${playlist.data.user}/playlist/${playlist.id}`}>
                {getPlaylistCover(playlist.data, 5)}
              </a>
              <Typography
                sx={{ marginTop: ".4rem", padding: "0 1rem" }}
                align="center"
              >
                {playlist.data.title}
              </Typography>
              <div>{playlist.data.user}</div>
            </Grid>
          );
        })}
      </Grid>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <CircularProgress style={{ color: "#fff" }} fontSize="small" />
      </div>
    );
  }
};

const mapState = (state) => {
  return {
    user: state.user,
    ui: state.ui,
  };
};

export default connect(mapState)(Playlists);
