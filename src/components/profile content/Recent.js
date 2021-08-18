import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import theme from "../../theme";
import { playButtonClick } from "../../redux/actions/dataActions";
import StopIcon from "@material-ui/icons/Stop";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { getTopArtists } from "../../utils/cheekyAlgos";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

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
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
    marginTop: ".5rem",
  },
  albumImages: {
    height: "3.75rem",
    width: "3.75rem",
    margin: "0 1rem",
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
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
    borderRadius: "12px",
  },
  editIcon: {
    display: "flex",
    justifyContent: "flex-end",
    margin: ".1rem 2rem",
    [theme.breakpoints.down("md")]: {
      margin: ".1rem 1rem",
    },
  },
}));
const Recent = ({ user, ui, playButtonClick, data }) => {
  let a;
  let own;
  if (data) {
    a = data;
    own = false;
  } else {
    a = user.data;
    own = true;
  }
  const classes = useStyles(theme);
  if (a !== undefined)
    return (
      <div className={classes.root}>
        <div className={classes.songs}>
          {own && (
            <div className={classes.editIcon}>
              <Button size="small" endIcon={<EditIcon />}>edit</Button>
            </div>
          )}
          <div className={classes.centerText}>
            <Typography
              variant="body1"
              mx="auto"
              align="center"
              style={{ margin: "0 1rem" }}
            >
              {getTopArtists(a.recentListening.data).join(", ")} &amp; more...
            </Typography>
            <Link
              to={`/${a.handle}/playlist/recentlistening`}
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
          {a.recentListening.data.map((song, index) => {
            if (index < 8) {
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
              to={`/${a.handle}/playlist/recentlistening`}
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
              {a.recentListening.lastUpdated} PST
            </Typography>
          </div>
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

export default connect(mapState, mapDispatch)(Recent);
