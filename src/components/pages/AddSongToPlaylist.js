import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import theme from "../../theme";
import { SearchSpotify } from "../small components/SearchSpotify";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { SiSoundcloud } from "react-icons/si";
import Button from "@mui/material/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  search: {},
  or: {
    textTransform: "uppercase",
    margin: "3rem 0",
  },
  soundcloud: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  textField: {
    width: "95%",
    [theme.breakpoints.up("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "35%",
    },
  },
  button: {
    margin: "1rem 0",
  },
}));
const AddSongToPlaylist = ({ playlist, id, user }) => {
  const classes = useStyles(theme);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const addSoundCloudSong = () => {
    setLoading(true);
    axios
      .post(`/scrapesoundcloud/${id}`, { url: text })
      .then((res) => {
        // setLoading(false);
        // window.location.reload();
        axios
          .post(`/addsongs/${id}`, { songs: [res.data] })
          .then((response) => {
            window.location.reload();
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <SearchSpotify
          fromAddSongComponent={true}
          playlistId={id}
          hasSpotify={user.data.streamingProvider === "spotify"}
        />
      </div>
      <div className={classes.or}>
        <Typography align="center" color="textPrimary" variant="h5">
          —&nbsp;OR&nbsp;—
        </Typography>
      </div>
      <div className={classes.soundcloud}>
        <TextField
          label="Paste a Soundcloud Url"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SiSoundcloud />
              </InputAdornment>
            ),
          }}
          className={classes.textField}
          variant="filled"
          fullWidth
          value={text}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          size="small"
          disabled={text === "" || loading}
          className={classes.button}
          onClick={addSoundCloudSong}
        >
          add soundcloud song
        </Button>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(AddSongToPlaylist);
