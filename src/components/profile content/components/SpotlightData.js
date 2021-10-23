import React from "react";
import { makeStyles, Typography } from "@mui/material";
import theme from "../../../theme";
import HighlightIcon from "@mui/icons-material/Highlight";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem 0",
    // background: theme.palette.primary.main,
    // padding: "1rem",
  },
  image: {
    height: "6rem",
    width: "6rem",
    marginRight: "1rem",
  },
  content: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    // padding: ".5rem",
    "&:hover": {
      background: theme.palette.primary.light,
    },
    borderRadius: "50px"
  },
}));

const SpotlightData = ({ item }) => {
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" color="textPrimary">
          Spotlight&nbsp;
        </Typography>
        <HighlightIcon />
      </div>
      <div className={classes.content}>
        <img
          alt={item.name}
          src={item.images[0].url ? item.images[0].url : ""}
          className={classes.image}
        />
        <div>
          <Typography variant="body1" color="textPrimary">
            {item.name}
          </Typography>
          {item.artists && (
            <Typography variant="body2" color="textPrimary">
              {item.name}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotlightData;
