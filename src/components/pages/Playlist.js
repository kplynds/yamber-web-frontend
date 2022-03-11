import React, { useState, useEffect } from "react";
import DesktopNav from "../nav/DesktopNav";
import Hidden from "@mui/material/Hidden";
import MobileNav from "../nav/MobileNav";
import { makeStyles } from "@mui/styles";
import theme from "../../theme";
import { connect } from "react-redux";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { useHistory, Switch, Route, Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { playButtonClick } from "../../redux/actions/dataActions";
import StopIcon from "@mui/icons-material/Stop";
import NotFound from "../NotFound";
import { getPlaylistCover } from "../../utils/cheekyAlgos";
import EmptyPlaylist from "../EmptyPlaylist";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import EditPlaylist from "./EditPlaylist";
import AddSongToPlaylist from "./AddSongToPlaylist";
import NotesIcon from "@mui/icons-material/Notes";
import IconButton from "@mui/material/IconButton";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TextField from "@mui/material/TextField";

const useStyles = makeStyles((theme) => ({
  root: {},
  playlistTop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: "2.5rem",
    marginBottom: "1rem",
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  },
  margin: {
    [theme.breakpoints.down("lg")]: {
      margin: "1rem 0",
    },
  },
  span: {
    "&:hover": {
      textDecoration: "underline",
      color: theme.palette.text.primary,
      cursor: "pointer",
    },
  },
  playlistInfo: {
    justifyContent: "center",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
  },
  songsContainer: {
    width: "70%",
    margin: "0 auto",
    padding: "1rem 0",
    [theme.breakpoints.down("lg")]: {
      width: "80%",
    },
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
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
    // backgroundColor: "red",
  },
  albumImages: {
    height: "3.75rem",
    width: "3.75rem",
    margin: "0 1rem",
    borderRadius: "4px",
  },
  editButtons: {
    display: "flex",
    justifyContent: "center",
    marginTop: ".5rem",
  },
  noLinkStyles: {
    textDecoration: "none",
  },
}));

const Playlist = ({ user, match, ui, playButtonClick }) => {
  const classes = useStyles(theme);
  const history = useHistory();
  const id = match.params.playlistId;
  const handle = match.params.handle;
  const own = handle === user.data.handle;
  const [state, setState] = useState({
    loading: false,
    error: false,
    recentPlaylist: false,
  });
  const [playlist, setPlaylist] = useState(null);
  const [openNotes, setOpenNotes] = useState([]);
  const [addingNotes, setAddingNotes] = useState([]);
  const [newNotes, setNewNotes] = useState({});
  const [addNotesLoading, setAddNotesLoading] = useState(false);
  const noteChange = (e, v) => {
    setNewNotes({
      ...newNotes,
      [e.target.name]: e.target.value,
    });
  };
  const [existingNotes, setExistingNotes] = useState({});
  const addNote = () => {
    setAddNotesLoading(true);
    if (id !== "recentlistening") {
      const newNotesIndices = Object.keys(newNotes);
      const newNoteArray = [];
      playlist.songs.forEach((song, ind) => {
        if (newNotesIndices.includes(ind.toString())) {
          newNoteArray.push(newNotes[ind]);
        } else {
          const note = playlist.notes[ind] || null;
          newNoteArray.push(note);
        }
      });
      const body = {
        notes: newNoteArray,
      };
      axios
        .post(`/editplaylist/${id}`, body)
        .then((res) => {
          setPlaylist({
            ...playlist,
            notes: newNoteArray,
          });
          setNewNotes({});
          setAddingNotes([]);
          setOpenNotes([]);
          setAddNotesLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setAddNotesLoading(false);
          alert("error adding notes sorry bruv");
        });
    } else {
      const newNotesIndices = Object.keys(newNotes);
      const querystring = new URLSearchParams(window.location.search);
      const timeRange = querystring.get("timeRange");
      const ref = {
        short_term: "notes_short",
        medium_term: "notes_medium",
        long_term: "notes_long",
      };
      let newRecentNotes = user.data[ref[timeRange]];
      newNotesIndices.forEach((ind) => {
        newRecentNotes[ind] = newNotes[ind];
      });
      axios
        .post("/update", {
          [ref[timeRange]]: newRecentNotes,
        })
        .then((res) => {
          setPlaylist({
            ...playlist,
            notes: newRecentNotes,
          });
          setNewNotes({});
          setAddingNotes([]);
          setOpenNotes([]);
          setAddNotesLoading(false);
        })
        .catch((err) => {
          alert("error!");
        });
    }
  };
  useEffect(() => {
    setState({
      loading: true,
      error: false,
      recentPlaylist: false,
    });
    if (id === "recentlistening") {
      const querystring = new URLSearchParams(window.location.search);
      const timeRange = querystring.get("timeRange");
      const util = {
        short_term: 0,
        medium_term: 1,
        long_term: 2,
      };
      const key = util[timeRange];
      const findNotesUtil = {
        0: "notes_short",
        1: "notes_medium",
        2: "notes_long",
      };
      axios
        .get(`/userbase/${handle}`)
        .then((res) => {
          if (
            res.data.user.songsDataPreference[key] !== "manual" &&
            res.data.user.songsDataPreference[key] !== "auto"
          ) {
            // setOwn(user.data.handle === res.data.user.handle)
            setPlaylist(res.data.user.linkedPlaylists[timeRange]);
            // res.data.user.linkedPlaylists[timeRange].songs.forEach((song, index) => {

            //   if (res.data.user[findNotesUtil[util]])
            // })
          } else {
            const indexesWithNotes = Object.keys(
              res.data.user[findNotesUtil[util[timeRange]]]
            );
            const recentNotes = [];
            res.data.user.recentListening.data[timeRange].forEach(
              (song, ind) => {
                if (indexesWithNotes.includes(ind.toString())) {
                  recentNotes.push(
                    res.data.user[findNotesUtil[util[timeRange]]][ind]
                  );
                } else {
                  recentNotes.push(null);
                }
              }
            );
            setPlaylist({
              songs: res.data.user.recentListening.data[timeRange],
              title: "Recent Listening",
              user: res.data.user.handle,
              images: [],
              notes: recentNotes,
            });
            // setPlaylist({
            //   ...pl
            // })
          }
          setState({
            loading: false,
            error: false,
            recentPlaylist: true,
          });
        })
        .catch((err) => {
          console.log("error");
          console.log(err);
          setState({
            loading: false,
            error: true,
            recentPlaylist: false,
          });
        });
    } else {
      axios
        .get(`/playlist/${id}`)
        .then((res) => {
          setState({
            loading: false,
            error: false,
            recentPlaylist: false,
          });
          setPlaylist(res.data);
          res.data.notes.forEach((note, index) => {
            if (note) {
              setExistingNotes({
                ...existingNotes,
                [index]: note,
              });
            }
          });
        })
        .catch((err) => {
          setState({
            loading: false,
            error: true,
            recentPlaylist: false,
          });
        });
    }
  }, [id, handle]);
  const Loading = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress style={{ color: "#fff" }} />
      </div>
    );
  };
  // let match = useRouteMatch();
  // let location = useLocation();
  return (
    <div className={classes.root}>
      <Hidden mdDown>
        <DesktopNav />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
      </Hidden>
      <div>
        {state.loading ? (
          <Loading />
        ) : (
          <Switch>
            <Route path={`${match.path}/edit`}>
              <EditPlaylist playlist={playlist} id={id} />
            </Route>
            <Route path={`${match.path}/add`}>
              <AddSongToPlaylist playlist={playlist} id={id} />
            </Route>
            <Route path={match.path}>
              {state.error && <NotFound />}
              {!state.error && playlist && (
                <div>
                  <div className={classes.playlistTop}>
                    <div style={{ margin: "0 .1rem" }}>
                      {getPlaylistCover(playlist, 6)}
                    </div>
                    <div style={{ marginLeft: "1rem" }}>
                      <Typography
                        variant="h4"
                        color="textPrimary"
                        className={classes.margin}
                      >
                        {playlist.title}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {playlist.description}
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.playlistInfo}>
                    <Typography variant="subtitle2" color="textSecondary">
                      By{" "}
                      <span
                        className={classes.span}
                        onClick={() => history.push(`/${playlist.user}`)}
                      >
                        @{playlist.user}
                      </span>
                    </Typography>
                    &nbsp;
                    <span
                      style={{
                        fontSize: "5px",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {"\u2B24"}
                    </span>
                    &nbsp;
                    <Typography variant="subtitle2" color="textSecondary">
                      {playlist.songs.length}&nbsp;songs
                    </Typography>
                  </div>
                  {/* <div>{note}</div> */}
                  {own && (
                    <div className={classes.editButtons}>
                      <Link
                        to={`${window.location.pathname}/add`}
                        className={classes.noLinkStyles}
                      >
                        <Button startIcon={<AddIcon />}>add songs</Button>
                      </Link>
                      <Link
                        to={`${window.location.pathname}/edit`}
                        className={classes.noLinkStyles}
                      >
                        <Button startIcon={<EditIcon />}>edit details</Button>
                      </Link>
                    </div>
                  )}
                  {playlist.songs.length < 1 ? (
                    <EmptyPlaylist user={user} id={id} />
                  ) : (
                    <div className={classes.songsContainer}>
                      {playlist.songs.map((song, index) => {
                        return (
                          <div key={index}>
                            <div className={classes.recentsSong} key={index}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: ".5rem",
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
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
                                  <Typography variant="body2">
                                    {song.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {song.artists.join(", ")}
                                  </Typography>
                                </div>
                              </div>
                              <div style={{ display: "flex" }}>
                                {playlist.notes[index] && (
                                  <IconButton
                                    sx={{ color: theme.palette.text.primary }}
                                    size="small"
                                    onClick={() => {
                                      if (!openNotes.includes(index)) {
                                        setOpenNotes([...openNotes, index]);
                                      } else {
                                        setOpenNotes(
                                          openNotes.filter(
                                            (item) => item !== index
                                          )
                                        );
                                      }
                                    }}
                                  >
                                    <NotesIcon />
                                  </IconButton>
                                )}
                                {!playlist.notes[index] && own && (
                                  <IconButton
                                    sx={{ color: theme.palette.text.primary }}
                                    size="small"
                                    onClick={() => {
                                      if (!addingNotes.includes(index)) {
                                        setAddingNotes([...addingNotes, index]);
                                      } else {
                                        setAddingNotes(
                                          addingNotes.filter(
                                            (item) => item !== index
                                          )
                                        );
                                      }
                                    }}
                                  >
                                    <NoteAddIcon />
                                  </IconButton>
                                )}
                                {ui.audio.active &&
                                ui.audio.src === song.preview ? (
                                  <IconButton
                                    onClick={() => {
                                      playButtonClick(song.preview, ui.audio);
                                    }}
                                    sx={{ color: theme.palette.text.primary }}
                                    size="small"
                                  >
                                    <StopIcon />
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    onClick={() => {
                                      playButtonClick(song.preview, ui.audio);
                                    }}
                                    sx={{ color: theme.palette.text.primary }}
                                    size="small"
                                  >
                                    <PlayArrowIcon />
                                  </IconButton>
                                )}
                              </div>
                            </div>
                            {openNotes.includes(index) && !own && (
                              <div
                                style={{ width: "90%", margin: ".3rem auto" }}
                              >
                                <Typography variant="body2" color="textPrimary">
                                  {playlist.notes[index]}
                                </Typography>
                              </div>
                            )}
                            {openNotes.includes(index) && own && (
                              <div
                                style={{
                                  width: "90%",
                                  margin: ".3rem auto",
                                  display: "flex",
                                  alignItems: "flex-end",
                                  marginBottom: ".8rem",
                                }}
                              >
                                <TextField
                                  sx={{
                                    "& .MuiInputBase-root": {
                                      borderBottom: "1px solid white",
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                      color: theme.palette.text.primary,
                                    },
                                  }}
                                  label="Add a Note"
                                  variant="standard"
                                  fullWidth
                                  name={index.toString()}
                                  onChange={noteChange}
                                  value={
                                    newNotes[index] || playlist.notes[index]
                                  }
                                />
                                <Button
                                  variant="contained"
                                  sx={{
                                    backgroundColor: theme.palette.text.primary,
                                    color: theme.palette.primary.dark,
                                    marginLeft: "1rem",
                                  }}
                                  size="small"
                                  onClick={addNote}
                                  // disabled={addNotesLoading}
                                >
                                  {addNotesLoading ? "loading..." : "save"}
                                </Button>
                              </div>
                            )}
                            {addingNotes.includes(index) && (
                              <div
                                style={{
                                  width: "90%",
                                  margin: ".3rem auto",
                                  display: "flex",
                                  alignItems: "flex-end",
                                  marginBottom: ".8rem",
                                }}
                              >
                                <TextField
                                  sx={{
                                    "& .MuiInputBase-root": {
                                      borderBottom: "1px solid white",
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                      color: theme.palette.text.primary,
                                    },
                                  }}
                                  label="Add a Note"
                                  variant="standard"
                                  fullWidth
                                  name={index.toString()}
                                  onChange={noteChange}
                                  value={newNotes[index] || ""}
                                />
                                <Button
                                  variant="contained"
                                  sx={{
                                    backgroundColor: theme.palette.text.primary,
                                    color: theme.palette.primary.dark,
                                    marginLeft: "1rem",
                                  }}
                                  size="small"
                                  onClick={addNote}
                                  // disabled={addNotesLoading}
                                >
                                  {addNotesLoading ? "loading..." : "save"}
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
              {!state.error && !playlist && <Loading />}
            </Route>
          </Switch>
        )}
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

export default connect(mapState, mapDispatch)(Playlist);
