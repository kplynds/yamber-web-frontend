import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/material";
import theme from "../../theme";
import { connect } from "react-redux";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import CustomizeCard from "./CustomizeCard";
import Typography from "@mui/material/Typography";

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
    flexDirection: "column"
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
        axios
          .get("/getwelcomespotifydata")
          .then((res) => {
            setLongTermArtists(res.data.longTermArtists);
            setMediumTermArtists(res.data.mediumTermArtists);
            setUserPlaylists(res.data.playlists);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
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
        <Typography color="textPrimary">Talking to Spotify...</Typography>
        <CircularProgress style={{ color: "#fff", marginTop: "1rem" }} />
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
