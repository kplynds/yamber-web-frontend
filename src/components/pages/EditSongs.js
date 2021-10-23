import React, { useState } from "react";
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
// import Skeleton from '@mui/material/Skeleton';

const useStyles = makeStyles((theme) => ({
  content: {
    width: "50%",
    margin: "0 auto",
    [theme.breakpoints.down('md')]: {
      width: "75%",
      paddingBottom: "18%",
    },
    [theme.breakpoints.down('sm')]: {
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
    marginRight: ".4rem",
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
      backgroundColor: theme.palette.common.white,
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

// Need to be able to:
// Edit autoupdate preference
// Exclude a song from showing.
// Link to a spotify playlist

// if they link it to a playlist, have a refresh button that pulls from spotify/apple api and updates the playlist.

const EditSongs = ({ user }) => {
  const classes = useStyles(theme);
  const [formValue, setFormValue] = useState("auto");
  const [fetchPlaylists, setFetchPlaylists] = useState(null);
  const [editState, setEditState] = useState("none");
  const [filter, setFilter] = useState("");
  const { width } = useWindowDimensions();
  const handleDialogClose = () => {
    setFormValue(null);
  };
  const handleSearch = (e) => {
    setFilter(e.target.value);
  };
  const handleChange = (e, v) => {
    setFormValue(v);
    if (v === "link") {
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

  if (user.data.streamingProvider === undefined) {
    return (
      <div>
          <Hidden mdDown>
            <DesktopNav />
          </Hidden>
          <Hidden mdUp>
            <MobileNav />
          </Hidden>
          {/* <Skeleton variant="text" /> */}
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
              <Button
                id="test"
                name="test"
                onClick={() => {
                  if (editState !== "songsDataPreference") {
                    setEditState("songsDataPreference");
                  } else {
                    console.log("post");
                  }
                }}
                variant={
                  editState === "songsDataPreference" ? "contained" : "text"
                }
              >
                {editState === "songsDataPreference" ? "save" : "edit"}
              </Button>
            </div>
            <Typography>How should we display your listening data?</Typography>
            <RadioGroup
              aria-label="songsDataPreference"
              defaultValue="auto"
              name="songsDataPreference"
              value={formValue}
              onChange={handleChange}
            >
              <FormControlLabel
                disabled={editState !== "songsDataPreference"}
                value="auto"
                control={<Radio />}
                label={`Auto update from ${user.data.streamingProvider}`}
              />
              <FormControlLabel
                disabled={editState !== "songsDataPreference"}
                value="link"
                control={<Radio />}
                label={`Link to a playlist from ${user.data.streamingProvider}`}
              />
              <Dialog
                open={formValue === "link"}
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
                      style={{ paddingRight: "1rem", paddingTop: "1rem" }}
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
                          <div key={playlist.id} className={classes.playlist}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
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
                            <AddCircleOutlineIcon />
                          </div>
                        );
                      })}
                  </DialogContent>
                )}
              </Dialog>
              {/* {formValue === "link" ? (
              <div>
                {fetchPlaylists === "loading" ? (
                  <div>loading</div>
                ) : fetchPlaylists === "error" ? (
                  <div>could not get your playlists :(. damn</div>
                ) : (
                  <div className={classes.playlistsContainer}>
                    {fetchPlaylists
                      .filter((playlist) => playlist.title.includes(filter))
                      .map((playlist) => {
                        return (
                          <div key={playlist.id} className={classes.playlist}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
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
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: "none" }}></div>
            )} */}
              <FormControlLabel
                disabled={editState !== "songsDataPreference"}
                value="manual"
                control={<Radio />}
                label="Set manually"
              />
            </RadioGroup>
          </div>
        </div>
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
