import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@mui/styles";
import Slide from "@mui/material/Slide";
import theme from "../../theme";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Avatar from "@mui/material/Avatar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Chip from "@mui/material/Chip";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepConnector from "@mui/material/StepConnector";
import clsx from "clsx";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { CustomTextField } from "../pages/Edit";
import InputAdornment from "@mui/material/InputAdornment";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
// import HelpIcon from "@mui/icons-material/Help";
import axios from "axios";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { getAuthenticatedUserDataAndPushUtil } from "../../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2%",
    [theme.breakpoints.up("sm")]: {
      margin: "0 8rem",
    },
    [theme.breakpoints.up("md")]: {
      margin: "0 15rem",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "0 18rem",
    },
  },
  finishButton: {
    background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.secondary.light} 90%)`,
  },
  longTermArtists: {
    margin: "0 10rem",
    borderRadius: "8px",
    background: theme.palette.primary.main,
  },
  topArtistLineItem: {
    display: "flex",
    background: theme.palette.primary.main,
    borderRadius: "8px",
    margin: ".4rem 0",
    padding: ".4rem 0",
  },
  tabs: {
    color: theme.palette.text.primary,
    display: "flex",
    justifyContent: "center",
    marginBottom: ".5rem",
  },
  artistDiv: {
    display: "flex",
    justifyContent: "space-between",
    margin: ".3rem 0",
    alignItems: "center",
  },
  artistDivContent: {
    display: "flex",
    alignItems: "center",
  },
  artistAvatar: {
    margin: "0 1rem",
  },
  mobileStepper: {
    backgroundColor: theme.palette.primary.main,
  },
  arrows: {
    display: "flex",
    justifyContent: "center",
  },
  top: {
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.primary.main,
    zIndex: 100,
    marginBottom: "1rem",
  },
  playlist: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playlistImage: {
    marginRight: ".4rem",
  },
  textField: {
    margin: ".5rem 0",
  },
  addArtistIcon: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
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
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
}));

const StepperStyles = withStyles({
  alternativeLabel: {
    top: 18,
  },
  active: {
    "& $line": {
      backgroundImage: `linear-gradient( ${theme.palette.secondary.light} 0%,${theme.palette.secondary.main} 50%,${theme.palette.secondary.dark} 100%)`,
    },
  },
  completed: {
    "& $line": {
      backgroundImage: `linear-gradient( ${theme.palette.secondary.light} 0%,${theme.palette.secondary.main} 50%,${theme.palette.secondary.dark} 100%)`,
    },
  },
  line: {
    height: 2,
    border: 0,
    borderRadius: 1,
    backgroundColor: theme.palette.primary.light,
  },
})(StepConnector);
const useStepIconStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: "50%",
    padding: ".5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage: `linear-gradient( ${theme.palette.secondary.light} 0%,${theme.palette.secondary.main} 50%,${theme.palette.secondary.dark} 100%)`,
  },
  completed: {
    backgroundImage: `linear-gradient( ${theme.palette.secondary.light} 0%,${theme.palette.secondary.main} 50%,${theme.palette.secondary.dark} 100%)`,
  },
});
function ColorlibStepIcon(props) {
  const classes = useStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}
const CustomizeCard = ({
  data,
  ui,
  user,
  getAuthenticatedUserDataAndPushUtil,
}) => {
  const classes = useStyles(theme);
  const [slide, setSlide] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [topArtists, setTopArtists] = useState([]);
  const [playlistsToImport, setPlaylistsToImport] = useState(["top50Spotify"]);
  const [preferences, setPreferences] = useState({
    recentListeningPreference: "spotify",
    instagram: "",
    twitter: "",
    displayName: "",
  });
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };
  const finish = (e) => {
    setLoading(true);
    const submitValues = {
      recentListeningPreference: preferences.recentListeningPreference,
      socials: {
        instagram: preferences.instagram,
        twitter: preferences.twitter,
      },
      topArtists: topArtists,
    };
    if (playlistsToImport.length > 0) {
      const body = {
        ids: playlistsToImport,
      };
      axios
        .post("/clonespotifyplaylists", body)
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    axios
      .post("/update", submitValues)
      .then((res) => {
        getAuthenticatedUserDataAndPushUtil(user.data.handle);
        setLoading(false);
        // window.location.href = `/${user.data.handle}`;
      })
      .catch((err) => {
        setLoading(false);
        alert("there was an error");
      });
  };
  const checkIfInArray = (checkArtist) => {
    const checker = (artist) => artist.name === checkArtist.name;
    return topArtists.some(checker);
  };
  const addArtist = (newArtist) => {
    if (topArtists.length >= 6) {
      window.scrollTo({ top: 0 });
      alert("max of 6 artists for now, this can be edited later");
      return;
    }
    const checker = (artist) => artist.name === newArtist.name;
    if (!topArtists.some(checker)) {
      setSearchValue("");
      setTopArtists((topArtists) => [...topArtists, newArtist]);
    }
    window.scrollTo({ top: 0 });
  };
  const handleChipDelete = (name) => {
    setTopArtists(topArtists.filter((artist) => artist.name !== name));
  };
  const LongTerm = () => {
    return (
      <div>
        {data.longTermArtists.map((artist, index) => {
          return (
            <div key={index} className={classes.artistDiv}>
              <div className={classes.artistDivContent}>
                <Typography variant="body1" color="textSecondary">
                  {index + 1}
                </Typography>
                <Avatar
                  alt={artist.name}
                  src={artist.images[0].url}
                  className={classes.artistAvatar}
                />
                <Typography color="textPrimary">{artist.name}</Typography>
              </div>
              {checkIfInArray(artist) ? (
                <ClearIcon
                  style={{ color: "#fff" }}
                  onClick={() => {
                    handleChipDelete(artist.name);
                  }}
                  className={classes.addArtistIcon}
                />
              ) : (
                <AddCircleOutlineIcon
                  style={{ color: "#fff" }}
                  onClick={() => {
                    addArtist(artist);
                  }}
                  className={classes.addArtistIcon}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };
  const MediumTerm = () => {
    return (
      <div>
        {data.mediumTermArtists.map((artist, index) => {
          return (
            <div key={index} className={classes.artistDiv}>
              <div className={classes.artistDivContent}>
                <Typography variant="body1" color="textSecondary">
                  {index + 1}
                </Typography>
                <Avatar
                  alt={artist.name}
                  src={artist.images[0].url}
                  className={classes.artistAvatar}
                />
                <Typography color="textPrimary">{artist.name}</Typography>
              </div>
              {checkIfInArray(artist) ? (
                <ClearIcon
                  style={{ color: "#fff" }}
                  onClick={() => {
                    handleChipDelete(artist.name);
                  }}
                  className={classes.addArtistIcon}
                />
              ) : (
                <AddCircleOutlineIcon
                  style={{ color: "#fff" }}
                  onClick={() => {
                    addArtist(artist);
                  }}
                  className={classes.addArtistIcon}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };
  const SearchArtists = () => {
    return (
      <div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon style={{ color: "#fff" }} />
          </div>
          <InputBase
            placeholder="Search for artists"
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
        {searchResults.map((artist, index) => {
          return (
            <div
              style={{ display: "flex", alignItems: "center" }}
              key={index}
              className={classes.search}
              onClick={() => {
                addArtist(artist);
              }}
            >
              <Avatar
                alt={artist.name}
                src={artist.images[0].url}
                className={classes.artistAvatar}
              />
              <Typography color="textSecondary">{artist.name}</Typography>
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    if (searchValue !== "") {
      axios
        .get(`/searchspotifyclient/${searchValue}/artist`)
        .then((res) => {
          setSearchResults(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      // let body = {};
      // if (user.data.spotify.expireTime > Date.now()) {
      //   body.token = user.data.spotify.access_token;
      // } else {
      //   const payload = { refresh_token: user.data.spotify.refresh_token };
      //   axios
      //     .post("/spotifyrefreshtoken", payload)
      //     .then((res) => {
      //       const body = { token: res.data.access_token };
      //       axios
      //         .post("/setnewspotifytoken", body)
      //         .then((res) => {
      //           body.token = res.data;
      //         })
      //         .catch((err) => {
      //           console.log("error setting spotify token");
      //         });
      //     })
      //     .catch((err) => {
      //       console.log("error getting new spotify token");
      //     });
      // }
      // body.query = searchValue;
      // axios
      //   .post("/searchspotifyartist", body)
      //   .then((res) => {
      //     setSearchResults(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }, [searchValue]);

  if (
    data.longTermArtists.length > 0 ||
    data.mediumTermArtists.length ||
    data.playlists.length
  ) {
    return (
      <div className={classes.root}>
        <div className={classes.top}>
          <div className={classes.stepper}>
            <Stepper
              activeStep={slide}
              alternativeLabel
              className={classes.mobileStepper}
              connector={<StepperStyles />}
            >
              <Step>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  Select Artists
                </StepLabel>
              </Step>
              <Step>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  Second
                </StepLabel>
              </Step>
              <Step>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  Third
                </StepLabel>
              </Step>
            </Stepper>
            {/* </Hidden> */}
          </div>
          <div className={classes.instructions}>
            <div className={classes.arrows}>
              <Button
                startIcon={<ArrowBackIcon />}
                disabled={slide === 0}
                onClick={() => {
                  setSlide(slide - 1);
                }}
              >
                last step
              </Button>
              {slide === 2 ? (
                <Button
                  className={classes.finishButton}
                  size="small"
                  onClick={finish}
                  disabled={loading}
                >
                  {loading ? "loading..." : "finish"}
                </Button>
              ) : (
                <Button
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => {
                    setSlide(slide + 1);
                  }}
                >
                  next step
                </Button>
              )}
            </div>
          </div>
        </div>
        <Typography color="textPrimary" align="center">
          {slide === 0
            ? "Select Some of Your Favorite Artists:"
            : slide === 1
            ? "Import Your Favorite Playlists to Show Off on Your Profile"
            : "Preferences:"}
        </Typography>
        {slide === 0 && (
          <Slide direction="right" in={slide === 0}>
            <div className={classes.topArtists}>
              <div className={classes.tabs}>
                <Tabs
                  value={tabValue}
                  onChange={(e, v) => {
                    setTabValue(v);
                  }}
                >
                  <Tab label="Your all time" />
                  <Tab label="Last 6 months" />
                  <Tab label="Search" />
                </Tabs>
              </div>
              <div>
                {topArtists.map((artist, index) => {
                  return (
                    <Chip
                      label={`${artist.name}`}
                      avatar={
                        <Avatar
                          alt={`${artist.name}`}
                          src={`${artist.images[0].url}`}
                        />
                      }
                      // variant="outlined"
                      onDelete={() => {
                        handleChipDelete(artist.name);
                      }}
                      key={index}
                      color="primary"
                      style={{
                        marginBottom: ".2rem",
                        marginTop: ".2rem",
                        marginRight: ".2rem",
                      }}
                    />
                  );
                })}
              </div>
              <div className={classes.artistLists}>
                {tabValue === 0 && <LongTerm />}
                {tabValue === 1 && <MediumTerm />}
                {tabValue === 2 && <SearchArtists />}
              </div>
            </div>
          </Slide>
        )}
        {slide === 1 && (
          <Slide direction="left" in={slide === 1}>
            <div className={classes.playlistsRoot}>
              {data.playlists.map((playlist) => {
                return (
                  <div key={playlist.id} className={classes.playlist}>
                    <div style={{ display: "flex", alignItems: "center" }}>
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
                    <Checkbox
                      checked={playlistsToImport.includes(playlist.id)}
                      onChange={(e, v) => {
                        if (v) {
                          setPlaylistsToImport((playlistsToImport) => [
                            ...playlistsToImport,
                            playlist.id,
                          ]);
                        } else {
                          setPlaylistsToImport(
                            playlistsToImport.filter((id) => id !== playlist.id)
                          );
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </Slide>
        )}
        {slide === 2 && (
          <Slide direction="left" in={slide === 2}>
            <div className={classes.preferenceRoot}>
              {/* <CustomTextField
                variant="outlined"
                label="Display Name"
                className={classes.textField}
                value={preferences.displayName}
                onChange={handleChange}
                name="displayName"
                fullWidth
              /> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: ".5rem 0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography color="textSecondary" variant="body2">
                    How should we display your recent listening activity?
                    {/* <HelpIcon fontSize="inherit" onClick={() => alert("we will display ")} /> */}
                  </Typography>
                </div>
                <select
                  name="recentListeningPreference"
                  id="recentListeningPreference"
                  value={preferences.recentListeningPreference}
                  onChange={handleChange}
                  className={classes.select}
                >
                  <option
                    value="spotify"
                    label="auto update from spotify activity"
                  >
                    auto update from spotify activity
                  </option>
                  <option value="manual" label="manually set">
                    link to a spotify playlist
                  </option>
                </select>
              </div>
              <CustomTextField
                variant="outlined"
                label="Instagram Username"
                className={classes.textField}
                helperText="optional"
                value={preferences.instagram}
                onChange={handleChange}
                name="instagram"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InstagramIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <CustomTextField
                variant="outlined"
                label="Twitter Username"
                helperText="optional"
                className={classes.textField}
                value={preferences.twitter}
                onChange={handleChange}
                fullWidth
                name="twitter"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TwitterIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </Slide>
        )}
      </div>
    );
  } else {
    return (
      <div className={classes.loading}>
        <Typography color="textPrimary">loading...</Typography>
      </div>
    );
  }
};

const mapState = (state) => {
  return {
    user: state.user,
    ui: state.ui,
  };
};

const mapDispatch = {
  getAuthenticatedUserDataAndPushUtil,
};

export default connect(mapState, mapDispatch)(CustomizeCard);
