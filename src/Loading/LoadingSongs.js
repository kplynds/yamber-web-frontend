import React from "react";
import Box from "@mui/material/Box";
import theme from "../theme";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

const n = 8;
function LoadingSongs() {
  return (
    <Box
      sx={{
        background: theme.palette.primary.main,
        width: "70%",
        borderRadius: "12px",
        margin: "0 auto",
        padding: "1rem 0",
        [theme.breakpoints.down("lg")]: {
          width: "80%",
        },
        [theme.breakpoints.down("md")]: {
          width: "90%",
        },
        [theme.breakpoints.down("sm")]: {
          width: "95%",
        },
        marginTop: ".5rem",
      }}
    >
      <Typography variant="h6" color="textPrimary" align="center">
        {true ? <Skeleton sx={{ width : "10%", margin: "auto"}} /> : "Most Streamed Songs"}
      </Typography>
      {[...Array(n)].map((e, i) => {
        return (
          <div key={i} style={{ display: "flex", padding: ".15rem 1rem" }}>
            <Skeleton
              sx={{
                margin: "0 1rem",
                height: "3.75rem",
                width: "3.75rem",
              }}
              variant="rectangular"
            />
            <Skeleton
              sx={{ flexGrow: 1, marginRight: "1rem" }}
              variant="text"
            />
          </div>
        );
      })}
    </Box>
  );
}

export default LoadingSongs;
