import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import theme from "../../theme";

import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
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
    margin: ".6rem auto",
    justifyContent: "center",
  },
  albumImages: {
    height: "3.75rem",
    width: "3.75rem",
    // margin: "0 1rem",
  },
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
  artistContainer: {
    background: "blue",
  },
  sectionContainer: {
    display: "flex",
    justifyContent: "center",
  },
  nothing: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
    margin: "0 2rem",
  },
}));
const Artists = ({ user, data, auto, artists_loading }) => {
  let a;
  let own;
  const [timeRange, setTimeRange] = useState("short_term");
  if (data) {
    a = data;
    own = false;
  } else {
    a = user.data.topArtists;
    own = true;
  }
  const classes = useStyles(theme);
  if (a.length < 0) {
    return (
      <div className={classes.nothing}>
        <Typography color="textPrimary">
          this user has no top artists set. they probably like country music
          hahahah
        </Typography>
      </div>
    );
  } else if (artists_loading) {
    return (
      <div
        style={{ display: "flex", marginTop: "2rem", justifyContent: "center" }}
      >
        <Typography color="textPrimary">
          Loading Artists right now chill out...
        </Typography>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        {own && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: ".2rem 1rem",
            }}
          >
            <a href="/editartists" style={{ textDecoration: "none" }}>
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6" color="textPrimary">
            Most Streamed Artists
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
        <Grid container spacing={0}>
          {a[timeRange].map((artist, index) => {
            return (
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: ".5rem 0",
                }}
                key={index}
              >
                <Avatar
                  src={artist.images[0].url}
                  alt={artist.name}
                  sx={{
                    width: 180,
                    height: 180,
                    [theme.breakpoints.down("md")]: {
                      width: 100,
                      height: 100,
                    },
                  }}
                />
                <Typography variant="body2">
                  {index + 1}. {artist.name}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
  /* if (!auto) {
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
  } */
};

const mapState = (state) => {
  return {
    user: state.user,
    ui: state.ui,
  };
};

export default connect(mapState)(Artists);
