import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

function LoadingCommonPlaylist() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "2rem" }}
    >
      <LinearProgress />
      <Typography align="center" sx={{ marginTop: "1rem", marginLeft: "1rem", marginRight: "1rem" }}>
        Playlist being prepared, this takes a lil!
      </Typography>
      <Typography align="center" color="textSecondary" variant="body2" sx={{ marginTop: "1rem", marginLeft: "1rem", marginRight: "1rem" }}>
        We're comparing some of your spotify listening data and all of your
        liked songs.
      </Typography>
    </div>
  );
}

export default LoadingCommonPlaylist;
