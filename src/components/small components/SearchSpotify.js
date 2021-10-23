import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/material";
import theme from "../../theme";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckIcon from '@mui/icons-material/Check';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      cursor: "pointer",
    },
    width: "90%",
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "50%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  artistAvatar: {
    margin: "0 1rem",
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  chips: {
    margin: "0 .5rem",
    maxWidth: "75%",
    textOverflow: "ellipsis",
    background: "red",
  },
}));

export const SearchSpotify = ({ hasSpotify, playlistId, handle, fromAddSongComponent }) => {
  const classes = useStyles(theme);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [songsSelected, setSongsSelected] = useState([]);
  // console.log(playlistId)
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const [searchValue, setSearchValue] = useState("");
  const selectSong = (song) => {
    setSongsSelected((songsSelected) => [...songsSelected, song]);
  };
  const addSongs = () => {
    setSubmitLoading(true)
    axios.post(`/addsongs/${playlistId}`, { songs: songsSelected })
      .then((res) => {
        window.location.reload()
        setSubmitLoading(false)
      })
      .catch(err => {
        console.log(err)
        setSubmitLoading(false)
      })
  };
  const addSong = (song) => {
    setSongsSelected((songsSelected) => [...songsSelected, song]);
  }
  useEffect(() => {
    if (searchValue !== "") {
      setLoading(true);
      if (hasSpotify) {
        axios
          .get(`/searchspotifytracks/${searchValue}`)
          .then((res) => {
            setSearchResults(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      } else {
        axios
          .get(`/searchspotifyclient/${searchValue}/track`)
          .then((res) => {
            setSearchResults(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      }
    }
  }, [searchValue, hasSpotify]);
  return (
    <div className={classes.root}>
      {songsSelected.length > 0 && (
        <div style={{display: "flex", justifyContent: "center", margin: ".8rem 0"}}>
          <Button color="secondary" variant="contained" onClick={addSongs} disabled={submitLoading || songsSelected.length < 1}>{submitLoading ? <CircularProgress /> : "finish adding songs"}</Button>
        </div>
      )}
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon style={{ color: "#fff" }} />
        </div>
        <InputBase
          placeholder="Search for songs"
          inputProps={{ "aria-label": "search" }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={searchValue}
          onChange={handleSearch}
          autoFocus={true}
          onBlur={() => {
            if (searchValue === "") {
              setSearchResults([]);
            }
          }}
        />
      </div>
      
      {loading ? (
        <div
          style={{
            justifyContent: "center",
            marginTop: ".5rem",
            textAlign: "center",
          }}
        >
          <CircularProgress style={{ color: "#fff" }} />
        </div>
      ) : (
        <div>
          {searchResults.map((song, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                key={index}
                className={classes.search}
                onClick={() => {
                  selectSong(song);
                }}
              >
                <Avatar
                  alt={song.name}
                  src={song.images[0].url}
                  className={classes.artistAvatar}
                  variant="square"
                />
                <div style={{ flexGrow: "1" }}>
                  <Typography variant="body2" color="textPrimary">
                    {song.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {song.artists.join(", ")}
                  </Typography>
                </div>
                <IconButton size="small" onClick={() => addSong(song)}>
                  {songsSelected.includes(song) ? (
                    <CheckIcon style={{ color: "#fff", marginRight: ".5rem" }} />
                  ) : (
                    <AddCircleOutlineIcon style={{ color: "#fff", marginRight: ".5rem" }} />
                  )}
                </IconButton>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    handle: state.user.data.handle,
  };
};

export default connect(mapState)(SearchSpotify);
