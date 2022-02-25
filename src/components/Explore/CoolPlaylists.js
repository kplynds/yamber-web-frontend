import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import theme from "../../theme";

function CoolPlaylists() {
  const [playlists, setPlaylists] = useState(null);
  useEffect(() => {
    const expireTime = localStorage.getItem("featuredExpireTime");
    if (expireTime < Date.now()) {
      axios.get("featuredplaylists").then((res) => {
        setPlaylists(res.data);
        localStorage.setItem("featured", JSON.stringify(res.data));
        localStorage.setItem("featuredExpireTime", Date.now() + 3600000);
      });
    } else {
      const parsed = JSON.parse(localStorage.getItem("featured"));
      setPlaylists(parsed);
    }
  }, []);
  return (
    <div>
      <Typography
        sx={{
          borderBottom: `1px solid ${theme.palette.text.secondary}`,
          paddingBottom: ".5rem",
          marginBottom: "1.5rem",
          marginLeft: "3rem",
          marginRight: "3rem"
        }}
        align="center"
      >
        ~Featured~ Playlists
      </Typography>
      {playlists && (
        <Grid container spacing={2}>
          {playlists.map((i) => {
            return (
              <Grid
                key={i.id}
                item
                xs={6}
                md={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <a href={`/${i.user}/playlist/${i.id}`}>
                  <Avatar
                    src={i.cover.url}
                    variant="square"
                    sx={{
                      height: "7rem",
                      width: "7rem",
                      margin: "0 1rem",
                    }}
                  />
                </a>
                <Typography
                  sx={{ marginTop: ".4rem", padding: "0 1rem" }}
                  align="center"
                >
                  {i.title}
                </Typography>
                <a style={{ textDecoration: "none" }} href={`/${i.user}`}>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    sx={{ textDecoration: "underline", marginTop: ".2rem" }}
                  >
                    @{i.user}
                  </Typography>
                </a>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
}

export default CoolPlaylists;
