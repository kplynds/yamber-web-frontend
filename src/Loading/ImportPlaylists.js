import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import theme from "../theme";
import Typography from "@mui/material/Typography";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Skeleton from "@mui/material/Skeleton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { Button } from "@mui/material";

function ImportPlaylists({ handle }) {
  const [loading, setLoading] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState(null);
  const [filter, setFilter] = useState("");
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const selectPlaylist = (playlist) => {
    setSelectedPlaylists([...selectedPlaylists, playlist.spotifyId]);
  };
  const handleSearch = (e) => {
    setFilter(e.target.value);
  };
  const [importLoading, setImportLoading] = useState(false);
  const importPlaylists = () => {
    setImportLoading(true);
    axios
      .post("/importplaylists/spotify", selectedPlaylists)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert("could not import these playlists sorry bruv");
      });
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/getuserplaylists/spotify`)
      .then((res) => {
        setUserPlaylists(res.data.playlists);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("could not get your playlists");
      });
  }, []);
  const n = 8;
  return (
    <Box>
      <Typography
        sx={{
          margin: "1rem 0",
        }}
        align="center"
      >
        You don't have any playlists on your profile yet
      </Typography>
      {!loading && (
        <Typography
          sx={{ margin: "0 1rem", marginBottom: ".7rem" }}
          color="textPrimary"
          align="center"
        >
          Import your favorite playlists from spotify to show on your profile:
        </Typography>
      )}
      {loading && (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Typography
            variant="body1"
            sx={{
              marginBottom: ".7rem",
              //   [theme.breakpoints.up("sm")]: {
              //     width: "80%",
              //   },
              //   [theme.breakpoints.up("md")]: {
              //     width: "70%",
              //   },
              //   [theme.breakpoints.up("sm")]: {
              //     width: "50%",
              //   },
            }}
            align="center"
          >
            fetching your playlists from spotify...
          </Typography>
        </div>
      )}
      {loading && (
        <React.Fragment>
          {[...Array(n)].map((e, i) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  margin: ".5rem auto",
                  width: "95%",
                  [theme.breakpoints.up("sm")]: {
                    width: "80%",
                  },
                  [theme.breakpoints.up("md")]: {
                    width: "70%",
                  },
                  [theme.breakpoints.up("sm")]: {
                    width: "50%",
                  },
                }}
                key={i}
              >
                <Skeleton
                  sx={{
                    marginRight: "1rem",
                    height: "3rem",
                    width: "3rem",
                  }}
                  variant="rectangular"
                />
                <Skeleton sx={{ flexGrow: 1 }} variant="text" />
              </Box>
            );
          })}
        </React.Fragment>
      )}
      {!loading && userPlaylists && (
        // !loading userPlaylists
        <React.Fragment>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <InputBase
              placeholder="Search for a playlist"
              value={filter}
              onChange={handleSearch}
              startAdornment={<SearchIcon />}
              sx={{
                width: "90%",
                margin: "0 auto",
                background: theme.palette.primary.light,
                borderRadius: "16px",
                "&.MuiInputBase-adornedStart": {
                  paddingLeft: "12px",
                },
                paddingTop: "6px",
                paddingBottom: "6px",
                [theme.breakpoints.up("sm")]: {
                  width: "80%",
                },
                [theme.breakpoints.up("md")]: {
                  width: "70%",
                },
                [theme.breakpoints.up("sm")]: {
                  width: "50%",
                },
              }}
              inputProps={
                ({
                  style: {
                    paddingLeft: "20px",
                  },
                },
                { "aria-label": "search" })
              }
            />
          </Box>
          {selectedPlaylists.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "1rem 0",
              }}
            >
              <Button
                sx={{
                  background: theme.palette.text.primary,
                  color: theme.palette.primary.dark,
                  border: `1px solid ${theme.palette.primary.dark}`,
                  "&:hover": {
                    background: theme.palette.primary.dark,
                    color: theme.palette.text.primary,
                    border: `1px solid ${theme.palette.text.primary}}`,
                  },
                  "&.Mui-disabled": {
                    background: theme.palette.primary.dark,
                    color: theme.palette.text.primary,
                    border: `1px solid ${theme.palette.text.primary}}`,
                  },
                }}
                onClick={importPlaylists}
                disabled={importLoading}
              >
                {importLoading ? "loading......" : "import playlists"}
              </Button>
            </Box>
          )}
          {userPlaylists
            .filter((playlist) =>
              playlist.title.toLowerCase().includes(filter.toLowerCase())
            )
            .map((playlist, index) => {
              return (
                <Box
                  key={playlist.spotifyId}
                  sx={{
                    background: theme.palette.primary.dark,
                    margin: ".5rem auto",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      cursor: "pointer",
                    },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "95%",
                    [theme.breakpoints.up("sm")]: {
                      width: "80%",
                    },
                    [theme.breakpoints.up("md")]: {
                      width: "70%",
                    },
                    [theme.breakpoints.up("sm")]: {
                      width: "50%",
                    },
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      alt={playlist.title}
                      src={
                        playlist.images[0]
                          ? playlist.images[0].url
                          : "https://firebasestorage.googleapis.com/v0/b/flumes-company.appspot.com/o/907e87639091f8805c48681d9e7f144dedf53741.jpg?alt=media&token=614a343b-997a-49e2-973f-31bae278f6fc"
                      }
                      variant="square"
                      sx={{
                        marginRight: "0 .4rem",
                      }}
                    />
                    <Typography
                      sx={{ marginLeft: ".4rem" }}
                      color="textSecondary"
                    >
                      {playlist.title}
                    </Typography>
                  </div>
                  {selectedPlaylists.includes(playlist.spotifyId) ? (
                    <IconButton
                      onClick={() => {
                        selectPlaylist(playlist);
                      }}
                      sx={{
                        color: "white",
                      }}
                    >
                      <LibraryAddCheckIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        selectPlaylist(playlist);
                      }}
                      sx={{
                        color: "white",
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  )}
                </Box>
              );
            })}
        </React.Fragment>
      )}
    </Box>
  );
}

export default ImportPlaylists;
