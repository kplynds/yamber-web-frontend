import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/material";
import theme from "../../theme";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {},
  playlist: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playlistToImport: {
    display: "flex",
    justifyContent: "center",
    margin: "1rem 0",
  },
  hoverIcon: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  progress: {
    color: "white",
    position: "absolute",
  },
  playlistImage: {
    margin: "0 .5rem"
  }
}));

const UserPlaylistsSelect = ({ handle, match, playlistToDeleteId }) => {
  const classes = useStyles(theme);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [data, setData] = useState([]);
  const [playlistToImport, setPlaylistToImport] = useState(null);
  const [playlistId, setPlaylistId] = useState("");
  const history = useHistory();
  const importPlaylist = (playlist) => {
    setButtonLoading(true);
    axios
      .post("/clonespotifyplaylists", {
        ids: [playlist.id],
        delete: playlistToDeleteId,
      })
      .then((res) => {
        history.push(`/${handle}/playlist/${res.data}`);
        setButtonLoading(false);
      })
      .catch((err) => {
        setButtonLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get("/ownspotifyplaylists")
      .then((res) => {
        setData(res.data.playlists);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading && (
        <div
          style={{
            justifyContent: "center",
            marginTop: ".5rem",
            textAlign: "center",
          }}
        >
          <CircularProgress style={{ color: "#fff" }} />
          <Typography variant="body2">fetching playlists</Typography>
        </div>
      )}
      {!loading && (
        <div className={classes.playlistsRoot}>
          {playlistToImport && (
            <div className={classes.playlistToImport}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 .2rem",
                }}
              >
                <CloseIcon
                  onClick={() => {
                    setPlaylistId("");
                    setPlaylistToImport(null);
                  }}
                  fontSize="large"
                  className={classes.hoverIcon}
                />
                <Avatar
                  alt={playlistToImport.title}
                  src={playlistToImport.images[0].url}
                  variant="square"
                  className={classes.playlistImage}
                  style={{ margin: "0 .2rem" }}
                />
                <Typography color="textPrimary">
                  {playlistToImport.title}
                </Typography>
              </div>
              <Button
                onClick={() => importPlaylist(playlistToImport)}
                color="secondary"
                variant="contained"
                style={{ margin: "0 .2rem" }}
                size="small"
                disabled={buttonLoading}
              >
                import playlist
                {buttonLoading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
            </div>
          )}
          {data.map((playlist) => {
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
                  checked={playlistId === playlist.id}
                  onChange={(e, v) => {
                    if (v) {
                      setPlaylistToImport(playlist);
                      setPlaylistId(playlist.id);
                      window.scrollTo(0, 30);
                    } else {
                      setPlaylistToImport(null);
                      setPlaylistId("");
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
  //   if (loading) {
  //     return (

  //     );
  //   } else {
  //     return (

  //     );
  //   }
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(UserPlaylistsSelect);
