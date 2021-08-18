import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../theme";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { FaSpotify } from "react-icons/fa";
import { SiApplemusic, SiSoundcloud } from "react-icons/si";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import SearchSpotify from "./small components/SearchSpotify";
import UserPlaylistsSelect from "./small components/UserPlaylistsSelect";
import SpotifyInsightsPlaylist from "./small components/SpotifyInsightsPlaylist";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      margin: "0 15%",
    },
  },
  buttonStyles: { borderRadius: "16px", background: "white", color: "black" },
  buttonDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.dark,
  },
  top: {
    margin: ".2rem",
    marginBottom: ".4rem",
  },
}));

const buttons = [
  {
    label: "add songs",
    icon: <AddCircleOutlineIcon />,
    id: 0,
  },
  {
    label: "import playlist",
    icon: {
      spotify: <FaSpotify />,
      apple: <SiApplemusic />,
      soundcloud: <SiSoundcloud />,
    },
    id: 1,
  },
];
const EmptyPlaylist = ({ user, id }) => {
  const classes = useStyles(theme);
  const [content, setContent] = useState(null);
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <Typography color="textPrimary" align="center">
          there are no songs in this playlist yet, would you like to:
        </Typography>
      </div>
      <Grid container spacing={3} justify="center">
        {buttons.map((item, index) => {
          return (
            <Grid item xs={6} md={4} className={classes.buttonDiv} key={index}>
              <Button
                startIcon={
                  index === 1
                    ? item.icon[user.data.streamingProvider]
                    : item.icon
                }
                variant="contained"
                className={classes.buttonStyles}
                size="small"
                onClick={() => {
                  setContent(item.id);
                }}
              >
                {item.label}
              </Button>
            </Grid>
          );
        })}
        {user.data.streamingProvider === "spotify" && (
          <Grid item xs={6} md={4} className={classes.buttonDiv}>
            <Button
              startIcon={<BubbleChartIcon />}
              variant="contained"
              className={classes.buttonStyles}
              size="small"
              onClick={() => {
                setContent(2);
              }}
            >
              create from spotify stats
            </Button>
          </Grid>
        )}
      </Grid>
      <div className={classes.content}>
        {content === 0 && <SearchSpotify hasSpotify={user.data.streamingProvider === "spotify"} playlistId={id} />}
        {content === 1 && <UserPlaylistsSelect handle={user.data.handle} playlistToDeleteId={id} />}
        {content === 2 && <SpotifyInsightsPlaylist playlistToDeleteId={id} />}
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapState)(EmptyPlaylist);
