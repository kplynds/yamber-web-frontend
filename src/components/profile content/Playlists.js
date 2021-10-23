import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import theme from "../../theme";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { getPlaylistCover } from "../../utils/cheekyAlgos";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 5rem",
    [theme.breakpoints.down('lg')]: {
      margin: "0 3rem",
    },
    [theme.breakpoints.down('md')]: {
      margin: "0 1rem",
    },
  },
  nonMobile: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    [theme.breakpoints.down('md')]: {
      display: "none",
    },
  },
  playlistContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    padding: "1rem",
    paddingBottom: "2rem",
    margin: "1rem 2rem",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
    width: "13rem",
    textOverflow: "ellipsis",
    // wordWrap: "break-word",
    whiteSpace: "nowrap",
    overflow: "clip",
    // boxShadow: "10px 10px 5px #ccc",
  },
  mobile: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  mobilePlaylistContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    padding: "1rem",
    paddingBottom: "2rem",
    marginBottom: "1rem",
    width: "9rem",
    wordWrap: "break-word",
    whiteSpace: "nowrap",
    overflow: "scroll",
  },
}));
const Playlists = ({ handle, user }) => {
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
        <div className={classes.nonMobile}>
          {playlists.map((playlist, i) => {
            return (
              <div
                key={i}
                className={classes.playlistContainer}
                onClick={() => {
                  window.location.href = `/${user.data.handle}/playlist/${playlist.id}`;
                }}
              >
                {getPlaylistCover(playlist.data, 5)}
                <Typography color="textPrimary" align="left">
                  {playlist.data.title}
                </Typography>
              </div>
            );
          })}
        </div>
        <div className={classes.mobile}>
          {playlists.map((playlist, i) => {
            return (
              <div
                key={i}
                className={classes.mobilePlaylistContainer}
                onClick={() => {
                  window.location.href = `/${user.data.handle}/playlist/${playlist.id}`;
                }}
              >
                {getPlaylistCover(playlist.data, 4)}
                <Typography
                  color="textPrimary"
                  align="left"
                  variant="body2"
                  style={{
                    marginTop: ".2rem",
                    fontSize: ".75rem",
                    margin: "0 3rem",
                    whiteSpace: "nowrap",
                    overflow: "clip",
                    textOverflow: "ellipsis",
                  }}
                >
                  {playlist.data.title}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
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
