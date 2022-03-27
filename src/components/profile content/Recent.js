import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import theme from "../../theme";
import { playButtonClick } from "../../redux/actions/dataActions";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import { getTopArtists } from "../../utils/cheekyAlgos";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {},
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
  songs: {
    background: theme.palette.primary.main,
    width: "70%",
    borderRadius: "12px",
    margin: "0 auto",
    padding: "1rem 0",
    [theme.breakpoints.down("lg")]: {
      width: "80%",
    },
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
    marginTop: ".5rem",
  },
  albumImages: {
    height: "3.75rem",
    width: "3.75rem",
    margin: "0 1rem",
    borderRadius: "4px",
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
  centerText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  spotlight: {
    // background: theme.palette.primary.main,
    width: "70%",
    margin: "0rem auto",
    // padding: "1rem 0",
    [theme.breakpoints.down("lg")]: {
      width: "80%",
    },
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
    borderRadius: "12px",
  },
  editIcon: {
    display: "flex",
    justifyContent: "space-between",
    margin: ".1rem 2rem",
    [theme.breakpoints.down("lg")]: {
      margin: ".1rem 1rem",
    },
  },
  select: {
    "&:before": {
      borderColor: theme.palette.text.primary,
    },
    "&:after": {
      borderColor: theme.palette.text.primary,
    },
  },
  icon: {
    fill: theme.palette.text.primary,
  },
  selectOther: {
    padding: ".1rem 2rem",
  },
  selected: {
    borderTop: `1px solid ${theme.palette.text.secondary}`,
    borderRight: `1px solid ${theme.palette.text.secondary}`,
    borderLeft: `1px solid ${theme.palette.text.secondary}`,
    color: theme.palette.text.primary,
    borderBottom: "0px solid red",
  },
  notSelected: {
    borderBottom: `1px solid ${theme.palette.text.secondary}`,
    color: theme.palette.text.secondary,
    borderTop: `1px solid transparent`,
    borderRight: `1px solid transparent`,
    borderLeft: `1px solid transparent`,
  },
  tabDiv: {
    borderRadius: "2px",
    display: "flex",
    justifyContent: "center",
    width: "33%",
    padding: ".6rem 0",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      borderRight: "1px solid #D3D3D3",
      borderLeft: "1px solid #D3D3D3",
      borderTop: "1px solid #D3D3D3",
    },
  },
  tabs: {
    display: "flex",
    margin: "0 auto",
    justifyContent: "center",
  },
  bruh: {
    textDecoration: "none",
  },
}));
const n = 8;

const Recent = ({ user, ui, playButtonClick, data, songs_loading }) => {
  const [timeRange, setTimeRange] = useState("short_term");
  let a;
  let own;
  if (data) {
    a = data;
    own = false;
  } else {
    a = user.data;
    own = true;
  }
  const keys = {
    short_term: 0,
    medium_term: 1,
    long_term: 2,
  };
  if (a.songsPreference[keys[timeRange]] !== "auto") {
    a[timeRange] = a.linkedPlaylists[timeRange].songs;
  }
  const [snack, setSnack] = useState(false);
  const classes = useStyles(theme);
  const [likedSongs, setLikedSongs] = useState([]);
  const favoriteSong = (id) => {
    setLikedSongs([...likedSongs, id]);
    axios
      .post("/likesong/spotify", { ids: [id] })
      .then((res) => {
        setSnack(true);
      })
      .catch((err) => {
        alert("could not add this song to your likes srry bruv");
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack(false);
  };
  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" onClick={handleClose}>
        <CloseIcon
          sx={{ color: theme.palette.text.primary }}
          fontSize="small"
        />
      </IconButton>
    </React.Fragment>
  );
  if (a !== undefined && songs_loading)
    return (
      <div className={classes.root}>
        <Snackbar
          open={snack}
          autoHideDuration={1400}
          onClose={handleClose}
          message="Song Added to Spotify Likes"
          action={action}
        />
        <div className={classes.songs}>
          {own && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: ".2rem 1rem",
              }}
            >
              <a href="/editsongs" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
                  endIcon={<EditIcon />}
                  sx={{
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.text.primary,
                    "&:hover": {
                      background: theme.palette.primary.light,
                    },
                  }}
                >
                  edit
                </Button>
              </a>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: ".5rem",
            }}
          >
            <Typography variant="h6" color="textPrimary">
              Most Streamed Songs
            </Typography>
          </div>
          <div className={classes.tabs}>
            <div
              onClick={() => setTimeRange("short_term")}
              className={`${classes.tabDiv}
                ${
                  timeRange === "short_term"
                    ? classes.selected
                    : classes.notSelected
                }`}
            >
              <Typography variant="body2">last month</Typography>
            </div>
            <div
              onClick={() => setTimeRange("medium_term")}
              className={`${classes.tabDiv}
                ${
                  timeRange === "medium_term"
                    ? classes.selected
                    : classes.notSelected
                }`}
            >
              <Typography variant="body2">last 6 months</Typography>
            </div>
            <div
              onClick={() => setTimeRange("long_term")}
              className={`${classes.tabDiv}
                ${
                  timeRange === "long_term"
                    ? classes.selected
                    : classes.notSelected
                }`}
            >
              <Typography variant="body2">all time</Typography>
            </div>
          </div>

          <div className={classes.centerText}>
            <Link
              to={`/${a.handle}/playlist/recentlistening?timeRange=${timeRange}`}
              className={classes.link}
            >
              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.linkText}
              >
                See Full Playlist
              </Typography>
            </Link>
          </div>
          {[...Array(n)].map((e, i) => {
            if (songs_loading[timeRange]) {
              return (
                <div
                  key={i}
                  style={{ display: "flex", padding: ".15rem 1rem" }}
                >
                  <Skeleton
                    sx={{
                      margin: "0 1rem",
                      height: "3.75rem",
                      width: "3.75rem",
                    }}
                    variant="rectangular"
                  />
                  <Skeleton
                    sx={{ flexGrow: 1, marginRight: "1rem" }}
                    variant="text"
                  />
                </div>
              );
            } else return null;
          })}
          {a[timeRange].map((song, index) => {
            if (index < 8) {
              if (!songs_loading[timeRange]) {
                return (
                  <div className={classes.recentsSong} key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          [theme.breakpoints.down("sm")]: {
                            fontSize: ".8rem",
                          },
                        }}
                      >
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
                        <Typography
                          sx={{
                            [theme.breakpoints.down("sm")]: {
                              fontSize: ".8rem",
                            },
                          }}
                          variant="body2"
                        >
                          {song.name}
                        </Typography>
                        <Typography
                          sx={{
                            [theme.breakpoints.down("sm")]: {
                              fontSize: ".8rem",
                            },
                          }}
                          variant="body2"
                          color="textSecondary"
                        >
                          {song.artists.join(", ")}
                        </Typography>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      {!own && (
                        <IconButton
                          sx={{
                            color: theme.palette.text.primary,
                          }}
                          size="small"
                          onClick={() => {
                            favoriteSong(song.spotifyId);
                          }}
                          name={song.spotifyId}
                        >
                          {(user.data.likedSongs &&
                            user.data.likedSongs.includes(song.spotifyId)) ||
                          likedSongs.includes(song.spotifyId) ? (
                            <FavoriteIcon style={{ color: "white" }} />
                          ) : (
                            <FavoriteBorderIcon style={{ color: "white" }} />
                          )}
                        </IconButton>
                      )}
                      {ui.audio.active && ui.audio.src === song.preview ? (
                        <IconButton
                          onClick={() => {
                            playButtonClick(song.preview, ui.audio);
                          }}
                          size="small"
                          sx={{
                            color: theme.palette.text.primary,
                          }}
                        >
                          <StopIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => {
                            playButtonClick(song.preview, ui.audio);
                          }}
                          size="small"
                          sx={{
                            color: theme.palette.text.primary,
                          }}
                        >
                          <PlayArrowIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>
                );
              } else return null;
            } else {
              return null;
            }
          })}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color="textSecondary" variant="body2">
              ... and more,&nbsp;
            </Typography>
            <Link
              to={`/${a.handle}/playlist/recentlistening?timeRange=${timeRange}`}
              className={classes.link}
            >
              <Typography
                variant="body2"
                color="textSecondary"
                className={classes.linkText}
              >
                see full playlist
              </Typography>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color="textSecondary" variant="body2">
              last updated&nbsp;
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {a.songsUpdateTime_english} PST
            </Typography>
          </div>
        </div>
      </div>
    );
  else {
    return null;
  }
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

export default connect(mapState, mapDispatch)(Recent);
