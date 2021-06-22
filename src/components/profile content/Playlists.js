import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import theme from "../../theme";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  covers: {
    height: "10rem",
    width: "10rem",
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
const Playlists = ({ handle }) => {
  const classes = useStyles(theme);
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
      <div className={classes.root}>
        <Grid container justify="center">
          {playlists.map((a, i) => {
            return (
              <Grid item xs={6} md={4} key={i} className={classes.gridItem}>
                <img
                  src={a.data.images[0].url}
                  alt={a.data.description}
                  className={classes.covers}
                />
                <p>{i}</p>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem"
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
