import React, { useEffect, useState } from "react";
import Hidden from "@mui/material/Hidden";
import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import theme from "../../theme";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { arrayMoveImmutable } from "array-move";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function EditArtists({ user }) {
  const [topArtists, setTopArtists] = useState({
    short_term: null,
    medium_term: null,
    long_term: null,
  });
  const ranges = [
    {
      key: "short_term",
      label: "Recent (past month)",
    },
    { key: "medium_term", label: "Medium (past 6 months)" },
    { key: "long_term", label: "All Time" },
  ];
  const [artistsPreference, setArtistsPreference] = useState({
    short_term: null,
    medium_term: null,
    long_term: null,
  });
  const [searchValues, setSearchValues] = useState({
    short_term: "",
    medium_term: "",
    long_term: "",
  });
  const [searchResults, setSearchResults] = useState({
    short_term: [],
    medium_term: [],
    long_term: [],
  });

  const searchArtists = (range, searchValue) => {
    if (searchValue !== "") {
      if (user.data.spotify.authenticated) {
        axios
          .get(`/searchspotifyartist/${searchValue}`)
          .then((res) => {
            setSearchResults({
              ...searchResults,
              [range]: res.data,
            });
          })
          .catch((err) => {
            alert("error when searching spotify sorry m8 :(");
          });
      } else {
        axios
          .get(`/searchspotifyclient/${searchValue}/artist`)
          .then((res) => {
            setSearchResults({
              ...searchResults,
              [range]: res.data,
            });
          })
          .catch((err) => {
            alert("error when searching spotify sorry m8 :(");
          });
      }
    }
  };
  useEffect(() => {
    if (Object.keys(user.data).length > 0) {
      setTopArtists(user.data.topArtists);
      setArtistsPreference({
        short_term: user.data.artistsPreference[0],
        medium_term: user.data.artistsPreference[1],
        long_term: user.data.artistsPreference[2],
      });
    }
  }, [user.data]);
  return (
    <div>
      <Hidden mdDown>
        <DesktopNav />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
      </Hidden>
      <Typography sx={{ marginTop: "2rem" }} align="center">
        Set Your Top Artists
      </Typography>
      {/* {topArtists && <Typography>{topArtists.join(", ")}</Typography>} */}
      {ranges.map((range, index) => {
        return (
          <div key={range.key} style={{ width: "96%", margin: "auto" }}>
            <Typography
              align="center"
              sx={{ margin: ".8rem 0", borderBottom: "1px solid grey" }}
            >
              {range.label}
            </Typography>
            <div>
              <label style={{ display: "block", marginBottom: ".5rem" }}>
                <input
                  type="radio"
                  name={`${range.label}auto`}
                  checked={artistsPreference[range.key] === "auto"}
                  value="auto"
                  onChange={() => {
                    setArtistsPreference({
                      ...artistsPreference,
                      [range.key]: "auto",
                    });
                  }}
                />
                Auto Update from {user.data.streamingProvider}
              </label>
              <label>
                <input
                  type="radio"
                  name={`${range.label}manual`}
                  checked={artistsPreference[range.key] === "manual"}
                  value="manual"
                  onChange={() => {
                    setArtistsPreference({
                      ...artistsPreference,
                      [range.key]: "manual",
                    });
                  }}
                />
                Set Manually
              </label>
            </div>
            {/*  // getting an error I don't understand when I try to make a new file for this component (component rerenders and user (from props) is undefined), so I'm putting this component here in the same file.
             *I'm also pretty sure now that the error I was getting was just because I named this new component the same as the parent component, but I'm too lazy to go and check and I don't think it will affect performance. */}
            {artistsPreference[range.key] === "manual" && (
              <div key={range}>
                {topArtists[range.key].map((artist, index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: ".3rem 0",
                        alignItems: "center",
                      }}
                      key={artist.name}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" color="textSecondary">
                          {index + 1}
                        </Typography>
                        <Avatar
                          alt={artist.name}
                          src={artist.images[0].url}
                          sx={{
                            margin: "0 1rem",
                          }}
                        />
                        <Typography color="textPrimary">
                          {artist.name}
                        </Typography>
                      </div>
                      <div>
                        <IconButton
                          onClick={() => {
                            if (index !== 0) {
                              const adjustedArray = arrayMoveImmutable(
                                topArtists[range.key],
                                index,
                                index - 1
                              );
                              setTopArtists({
                                ...topArtists,
                                [range.key]: adjustedArray,
                              });
                            }
                          }}
                        >
                          <ArrowCircleUpIcon
                            style={{ color: theme.palette.text.primary }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            if (index !== topArtists.length - 1) {
                              const adjustedArray = arrayMoveImmutable(
                                topArtists[range.key],
                                index,
                                index + 1
                              );
                              setTopArtists({
                                ...topArtists,
                                [range.key]: adjustedArray,
                              });
                            }
                          }}
                        >
                          <ArrowCircleDownIcon
                            style={{ color: theme.palette.text.primary }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            const adjustedArray = arrayMoveImmutable(
                              topArtists[range.key],
                              index,
                              index + 1
                            );
                            setTopArtists({
                              ...topArtists,
                              [range.key]: adjustedArray,
                            });
                          }}
                        >
                          <DeleteIcon
                            onClick={() => {
                              const adjustedArray = topArtists[
                                range.key
                              ].splice(index, 1);
                              setTopArtists({
                                ...topArtists,
                                [range.key]: adjustedArray,
                              });
                            }}
                            style={{ color: theme.palette.text.primary }}
                          />
                        </IconButton>
                      </div>
                    </div>
                  );
                })}
                <div
                  style={{
                    position: "relative",
                    margin: "auto",
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: theme.palette.primary.light,
                    marginTop: ".8rem",
                  }}
                >
                  <div
                    style={{
                      padding: theme.spacing(0, 2),
                      height: "100%",
                      position: "absolute",
                      pointerEvents: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SearchIcon style={{ color: "#fff" }} />
                  </div>
                  <InputBase
                    placeholder="Search for artists"
                    inputProps={{ "aria-label": `search${range.key}` }}
                    componentsProps={{
                      input: {
                        style: {
                          padding: theme.spacing(1, 1, 1, 0),
                          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                          transition: theme.transitions.create("width"),
                          width: "100%",
                          [theme.breakpoints.up("md")]: {
                            width: "20ch",
                          },
                        },
                      },
                    }}
                    value={searchValues[range.key]}
                    onChange={(e) => {
                      setSearchValues({
                        ...searchValues,
                        [range.key]: e.target.value,
                      });
                      searchArtists(range.key, e.target.value);
                    }}
                    onBlur={() => {
                      if (searchValues[range.key] === "") {
                        setSearchResults({
                          ...searchValues,
                          [range.key]: [],
                        });
                      }
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "relative",
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: theme.palette.primary.light,
                  }}
                >
                  {searchResults[range.key].map((artist) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: ".5rem",
                        }}
                      >
                        <Avatar
                          alt={artist.name}
                          src={artist.images[0].url}
                          sx={{
                            margin: "0 1rem",
                          }}
                        />
                        <Typography color="textPrimary">
                          {artist.name}
                        </Typography>
                        <IconButton
                          onClick={() => {
                            if (topArtists[range.key].length < 10) {
                              const updatedArray = topArtists[range.key].push(
                                artist
                              );
                              setTopArtists({
                                ...topArtists,
                                [range.key]: updatedArray,
                              });
                            } else {
                              alert(
                                "Maximum of 9 top artists :(. Just go right ahead and make the easy decision of deleting one"
                              );
                            }
                          }}
                        >
                          <AddCircleOutlineIcon
                            sx={{
                              color: theme.palette.text.primary,
                              // marginLeft: "1rem",
                            }}
                          />
                        </IconButton>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state.user,
    loading: state.ui.loading,
  };
};

export default connect(mapState)(EditArtists);
