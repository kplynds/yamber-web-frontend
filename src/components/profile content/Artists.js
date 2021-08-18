import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import theme from "../../theme";
import { FaSpotify } from "react-icons/fa";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    borderRadius: "12px",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    width: "70%",
    margin: "0rem auto",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
  },
  artist: {
    display: "flex",
    alignItems: "center",
    textOverflow: "ellipsis",
    padding: ".3rem 0",
  },
}));
const Artists = ({ user, data }) => {
  let a;
  let own;
  if (data) {
    a = data;
    own = false;
  } else {
    a = user.data.topArtists;
    own = true;
  }
  const classes = useStyles(theme);
  const [popoverState, setPopoverState] = useState({
    open: false,
    anchorEl: null,
  });
  const handlhandlePopoverOpen = (e, name) => {
    setPopoverState({
      openedPopoverId: name,
      anchorEl: e.target,
    });
  };
  const openInSpotify = (artist) => {
    window.location.href = artist.spotifyHref;
  };
  return (
    <div className={classes.root}>
      {a.map((artist, index) => {
        return (
          <div key={index}>
            <div
              className={classes.artist}
              key={index}
              onClick={(e) => {
                handlhandlePopoverOpen(e, artist.name);
              }}
            >
              <Typography>{own ? "own profile" : "not own"}</Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ paddingLeft: "1rem" }}
              >
                {index + 1}
              </Typography>
              <img
                src={artist.images[0].url}
                alt={artist.name}
                style={{
                  height: "4rem",
                  borderRadius: "15px",
                  width: "4rem",
                  margin: "0 1rem",
                }}
              />
              <div>
                <Typography variant="body2">{artist.name}</Typography>
                {artist.genres && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{
                      marginRight: ".2rem",
                    }}
                  >
                    {artist.genres.join(", ")}
                  </Typography>
                )}
              </div>
            </div>
            <Popover
              open={popoverState.openedPopoverId === artist.name}
              anchorEl={popoverState.anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              PaperProps={{
                style: {
                  background: theme.palette.primary.main,
                },
              }}
              onClose={handlhandlePopoverOpen}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<FaSpotify />}
                onClick={() => {
                  openInSpotify(artist);
                }}
              >
                Open in Spotify
              </Button>
            </Popover>
          </div>
        );
      })}
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    ui: state.ui,
  };
};

export default connect(mapState)(Artists);
