import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import theme from "../../../theme";
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
}));

// Default to Top Artists

const AutoArtists = ({ ownProf, data }) => {
  const [timeRange, setTimeRange] = useState("short_term");
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      {ownProf && (
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
        {data[timeRange].map((artist, index) => {
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
};

const mapState = (state) => {
  return {
    user: state.user,
    ui: state.ui,
  };
};

export default connect(mapState)(AutoArtists);
