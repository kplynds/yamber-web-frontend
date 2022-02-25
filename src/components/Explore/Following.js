import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import theme from "../../theme";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";

function Following({ loggedInUser }) {
  const [followingData, setFollowingData] = useState(null);
  useEffect(() => {
    axios
      .post("/followinguserdata", { users: loggedInUser.data.following })
      .then((res) => {
        setFollowingData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div style={{ margin: "1rem 3rem" }}>
      <Typography align="center">Following</Typography>
      <div style={{ borderTop: `1px solid ${theme.palette.text.secondary}`, marginBottom: "1.5rem", marginTop: ".5rem" }}>
        {loggedInUser.data.following.map((d, i) => {
          return (
            <div
              key={d}
              style={{
                display: "flex",
                alignItems: "center",
                margin: "1.5rem 0",
              }}
            >
              {!followingData ? (
                <Skeleton
                  variant="circular"
                  sx={{
                    height: theme.spacing(5),
                    width: theme.spacing(5),
                    marginRight: ".8rem",
                  }}
                />
              ) : (
                <Avatar
                  alt={d}
                  src={followingData[i].photo}
                  sx={{
                    height: theme.spacing(5),
                    width: theme.spacing(5),
                    marginRight: ".8rem",
                  }}
                />
              )}
              <div style={{ flexGrow: 1 }}>
                <a
                  href={`/${d}`}
                  style={{
                    color: theme.palette.text.primary,
                    textDecoration: "underline",
                  }}
                >
                  <Typography sx={{ width: "100%" }}>
                    {!followingData ? <Skeleton /> : d}
                  </Typography>
                </a>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ width: "100%" }}
                >
                  {!followingData ? (
                    <Skeleton sx={{ marginRight: "2rem" }} />
                  ) : (
                    followingData[i].recentArtists.join(", ")
                  )}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Following;
