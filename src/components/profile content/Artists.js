import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import theme from "../../theme";
import { FaSpotify } from "react-icons/fa";
import Popover from "@mui/material/Popover";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AutoArtists from "./components/AutoArtists";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    borderRadius: "12px",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    width: "70%",
    margin: "0rem auto",
    [theme.breakpoints.down("lg")]: {
      width: "80%",
    },
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },
  artist: {
    display: "flex",
    alignItems: "center",
    textOverflow: "ellipsis",
    padding: ".3rem 0",
  },
  editIcon: {
    display: "flex",
    justifyContent: "flex-end",
    padding: ".2rem 1rem",
  },
  nothing: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
    margin: "0 2rem",
  },
}));
const Artists = ({ user, data, auto }) => {
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
  if (!auto) {
    if (a.length < 0) {
      return (
        <div className={classes.nothing}>
          <Typography color="textPrimary">
            this user has no top artists set. they probably like country music
            hahahah
          </Typography>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <div>penis</div>
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
    }
  } else {
    return <AutoArtists ownProf={own} data={a} />;
  }
};

const mapState = (state) => {
  return {
    user: state.user,
    ui: state.ui,
  };
};

export default connect(mapState)(Artists);
