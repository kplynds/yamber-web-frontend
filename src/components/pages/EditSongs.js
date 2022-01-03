import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import theme from "../../theme";
import Hidden from "@mui/material/Hidden";
import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import DialogContent from "@mui/material/DialogContent";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useWindowDimensions from "../../utils/useWindowDimensions";
import CloseIcon from "@mui/icons-material/Close";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

const useStyles = makeStyles((theme) => ({
  content: {
    width: "50%",
    margin: "0 auto",
    [theme.breakpoints.down("md")]: {
      width: "75%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },
  divContainer: {
    margin: "1.5rem 0",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  divTitle: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    padding: "0 2rem",
  },
  playlistsContainer: {
    maxHeight: "10rem",
    overflow: "scroll",
  },
  playlist: {
    background: theme.palette.primary.main,
    margin: ".3rem 0",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playlistImage: {
    margin: "0 .4rem",
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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      cursor: "pointer",
    },
    width: "100%",
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
  dialogBase: {
    width: "90%",
    minHeight: "100%",
    margin: "auto",
  },
}));

const ranges = [
  {
    key: "short_term",
    label: "Recent (past month)",
  },
  { key: "medium_term", label: "Medium (past 6 months)" },
  { key: "long_term", label: "All Time" },
];

const EditSongs = ({ user }) => {
  const classes = useStyles(theme);
  const [formValue, setFormValue] = useState({
    short_term: "",
    medium_term: "",
    long_term: "",
  });
  const [fetchPlaylists, setFetchPlaylists] = useState(null);
  const [editState, setEditState] = useState("none");
  const [filter, setFilter] = useState("");
  const [activeDialog, setActiveDialog] = useState(null);
  const [linkPlaylist, setLinkPlaylist] = useState({
    short_term: null,
    medium_term: null,
    long_term: null,
  });
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const handleDialogClose = (e, v) => {
    setFormValue({
      ...formValue,
      [activeDialog]: null,
    });
  };
  const handleSearch = (e) => {
    setFilter(e.target.value);
  };
  const selectPlaylist = (playlist, range) => {
    setLinkPlaylist({
      ...linkPlaylist,
      [range]: playlist,
    });
  };
  const handleChange = (e, v) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
    if (e.target.value === "link") {
      setActiveDialog(e.target.name);
      setFetchPlaylists("loading");
      axios
        .get(`/getuserplaylists/${user.data.streamingProvider}`)
        .then((res) => {
          setFetchPlaylists(res.data.playlists);
        })
        .catch((err) => {
          setEditState("error");
        });
    }
  };
  const updateSongsDataPreference = () => {
    setLoading(true);
    const firstArray = [
      formValue.short_term || "auto",
      formValue.medium_term || "auto",
      formValue.long_term || "auto",
    ];
    let keys = Object.keys(formValue);
    const arrayToBePosted = firstArray.map((item, index) => {
      if (item === "link") {
        return linkPlaylist[keys[index]].spotifyId;
      } else {
        return item;
      }
    });
    let body = {
      prefArray: arrayToBePosted,
    };
    user.data.songsDataPreference.forEach((item, index) => {
      if (item !== "auto" && item !== "manual") {
        const ref = arrayToBePosted[index];
        if (ref === "auto" || ref === "manual") {
          if (body.removeLink) {
            body.removeLink.push(index);
          } else {
            body.removeLink = [index];
          }
        }
      }
    });
    axios
      .post("/updatesongspref_spotify", body)
      .then((res) => {
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (Object.keys(user.data).length > 0) {
      setLinkPlaylist(user.data.linkedPlaylists);
      setFormValue({
        short_term:
          user.data.songsDataPreference[0] !== "auto" &&
          user.data.songsDataPreference[0] !== "manual"
            ? "link"
            : user.data.songsDataPreference[0],
        medium_term:
          user.data.songsDataPreference[1] !== "auto" &&
          user.data.songsDataPreference[1] !== "manual"
            ? "link"
            : user.data.songsDataPreference[1],
        long_term:
          user.data.songsDataPreference[2] !== "auto" &&
          user.data.songsDataPreference[2] !== "manual"
            ? "link"
            : user.data.songsDataPreference[2],
      });
    }
  }, [user.data]);
  if (Object.keys(user.data).length === 0) {
    return (
      <div>
        <Hidden mdDown>
          <DesktopNav />
        </Hidden>
        <Hidden mdUp>
          <MobileNav />
        </Hidden>
        <Stack
          spacing={1}
          sx={{
            width: "50%",
            margin: "auto",
            marginTop: "4rem",
            [theme.breakpoints.down("lg")]: {
              width: "70%",
            },
            [theme.breakpoints.down("md")]: {
              width: "80%",
            },
            [theme.breakpoints.down("sm")]: {
              width: "90%",
            },
          }}
        >
          <Skeleton variant="text" sx={{ width: "50%", mx: "auto" }} />
          <div style={{ display: "flex" }}>
            <Skeleton
              sx={{ mx: "1rem" }}
              variant="rectangular"
              width={250}
              height={150}
            />
            <Skeleton
              sx={{ mx: "1rem" }}
              variant="rectangular"
              width={250}
              height={150}
            />
            <Skeleton
              sx={{ mx: "1rem" }}
              variant="rectangular"
              width={250}
              height={150}
            />
          </div>
        </Stack>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Hidden mdDown>
          <DesktopNav />
        </Hidden>
        <Hidden mdUp>
          <MobileNav />
        </Hidden>
        <div className={classes.content}>
          <div className={classes.divContainer}>
            <div className={classes.divTitle}>
              <div className={classes.empty}></div>
              {editState === "songsDataPreference" ? (
                <Button
                  onClick={updateSongsDataPreference}
                  variant="contained"
                  disabled={loading}
                  sx={{
                    color: theme.palette.primary.dark,
                    background: theme.palette.text.primary,
                    "&:hover": {
                      color: theme.palette.primary.dark,
                      background: theme.palette.text.primary,
                    },
                  }}
                >
                  {loading ? "loading..." : "save"}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setEditState("songsDataPreference");
                  }}
                  variant="text"
                  sx={{ color: theme.palette.text.primary }}
                >
                  edit
                </Button>
              )}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography>How should we display your listening data?</Typography>
        </div>
        <Container
          sx={{
            display: "flex",
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              // marginTop: ".2rem",
            },
            marginTop: "1rem",
            justifyContent: "center",
          }}
        >
          {ranges.map((range) => {
            return (
              <div key={range.key}>
                <Typography color="textSecondary">{range.label}:</Typography>
                <RadioGroup
                  aria-label="songsDataPreference"
                  // defaultValue={user.data.songsDataPreference[index]}
                  name={range.key}
                  value={formValue[range.key]}
                  onChange={handleChange}
                  key={range.key}
                >
                  <FormControlLabel
                    disabled={editState !== "songsDataPreference"}
                    value="auto"
                    control={
                      <Radio
                        sx={{
                          color: theme.palette.text.secondary,
                          "&.Mui-checked": {
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    }
                    label={`Auto update from ${user.data.streamingProvider}`}
                    sx={{ my: ".2rem" }}
                  />
                  <FormControlLabel
                    disabled={editState !== "songsDataPreference"}
                    value="link"
                    control={
                      <Radio
                        sx={{
                          color: theme.palette.text.secondary,
                          "&.Mui-checked": {
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    }
                    label={
                      linkPlaylist[range.key] ? (
                        <div
                          style={{
                            display: "flex",
                            maxWidth: "25rem",
                            alignItems: "center",
                          }}
                        >
                          <Typography>Link to&nbsp;</Typography>
                          <Avatar
                            alt={linkPlaylist[range.key].title}
                            src={linkPlaylist[range.key].images[0].url}
                            variant="square"
                            sx={{ height: "2rem", width: "2rem", m: "0 .2rem" }}
                          />
                          <Typography>
                            &nbsp;{linkPlaylist[range.key].title}
                          </Typography>
                        </div>
                      ) : (
                        `Link to a playlist from ${user.data.streamingProvider}`
                      )
                    }
                  />
                  <Dialog
                    open={
                      formValue[range.key] === "link" &&
                      !linkPlaylist[range.key]
                    }
                    onClose={handleDialogClose}
                    className={classes.dialogBase}
                    fullWidth
                    fullScreen={width < 600}
                  >
                    {width < 600 && (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: theme.palette.primary.main,
                        }}
                      >
                        <CloseIcon
                          style={{
                            paddingRight: "1rem",
                            paddingTop: "1rem",
                          }}
                          onClick={handleDialogClose}
                          fontSize="large"
                        />
                      </div>
                    )}
                    <DialogTitle
                      style={{
                        background: theme.palette.primary.main,
                      }}
                    >
                      {fetchPlaylists === "loading"
                        ? "getting your playlists..."
                        : fetchPlaylists === "error"
                        ? "could not get"
                        : "choose which playlist to link"}
                    </DialogTitle>
                    {fetchPlaylists === "loading" && (
                      <DialogContent
                        style={{ background: theme.palette.primary.main }}
                      >
                        <div
                          style={{
                            display: "flex",
                            marginTop: ".8rem",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress
                            style={{ color: theme.palette.text.secondary }}
                          />
                        </div>
                      </DialogContent>
                    )}
                    {Array.isArray(fetchPlaylists) && (
                      <DialogContent
                        style={{
                          background: theme.palette.primary.main,
                          margin: "0",
                        }}
                      >
                        <div className={classes.search}>
                          <div className={classes.searchIcon}>
                            <SearchIcon style={{ color: "#fff" }} />
                          </div>
                          <InputBase
                            placeholder="Search for a playlist"
                            inputProps={{ "aria-label": "search" }}
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            }}
                            value={filter}
                            onChange={handleSearch}
                            autoFocus={true}
                          />
                        </div>
                        {fetchPlaylists
                          .filter((playlist) =>
                            playlist.title
                              .toLowerCase()
                              .includes(filter.toLowerCase())
                          )
                          .map((playlist) => {
                            return (
                              <div
                                key={playlist.spotifyId}
                                className={classes.playlist}
                              >
                                <div
                                  key={playlist.spotifyId}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Avatar
                                    alt={playlist.title}
                                    src={playlist.images[0].url}
                                    variant="square"
                                    className={classes.playlistImage}
                                  />
                                  <Typography color="textSecondary">
                                    {playlist.title}
                                  </Typography>
                                </div>
                                <AddCircleOutlineIcon
                                  onClick={() => {
                                    selectPlaylist(playlist, activeDialog);
                                  }}
                                />
                              </div>
                            );
                          })}
                      </DialogContent>
                    )}
                  </Dialog>
                  <FormControlLabel
                    disabled={editState !== "songsDataPreference"}
                    value="manual"
                    control={
                      <Radio
                        sx={{
                          color: theme.palette.text.secondary,
                          "&.Mui-checked": {
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    }
                    label="Set manually"
                  />
                </RadioGroup>
              </div>
            );
          })}
        </Container>
      </div>
    );
  }
};

const mapState = (state) => {
  return {
    user: state.user,
    loading: state.ui.loading,
  };
};

export default connect(mapState)(EditSongs);
