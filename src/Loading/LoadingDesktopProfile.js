import React from "react";
import Box from "@mui/material/Box";
import theme from "../theme";
import Skeleton from "@mui/material/Skeleton";

function LoadingDesktopProfile() {
  return (
    <Box
      sx={{
        display: "flex",
        borderBottom: "1px solid grey",
        background: theme.palette.primary.dark,
        paddingTop: "2%",
        paddingBottom: "2%",
      }}
    >
      <Box
        sx={{
          width: "37%",
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "5rem",
          alignItems: "center",
          [theme.breakpoints.down("lg")]: {
            width: "30%",
          },
        }}
      >
        <Skeleton
          variant="circular"
          sx={{
            width: theme.spacing(15),
            height: theme.spacing(15),
          }}
        />
      </Box>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            alignItems: "center",
            paddingTop: theme.spacing(1),
            maxWidth: "90%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: ".8rem",
              whiteSpace: "nowrap",
            }}
          >
            <Skeleton
              sx={{ marginRight: "1rem", width: "100%", borderRadius: "4px" }}
              variant="rectangular"
              width={100}
              height={40}
            />
            <Skeleton
              sx={{ marginRight: "1rem", width: "100%", borderRadius: "4px" }}
              variant="rectangular"
              width={100}
              height={40}
            />
          </div>
          <div style={{ width: "100%", marginTop: ".8rem" }}>
            <Skeleton sx={{ width: "50%" }} variant="text" />
          </div>
        </div>
      </div>
      {/* <div
        style={{ display: "flex", marginTop: ".8rem", marginBottom: ".6rem", background: "red" }}
      >
        <Skeleton variant="text" />
      </div> */}
    </Box>
  );
}

export default LoadingDesktopProfile;
