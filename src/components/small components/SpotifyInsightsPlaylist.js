import React, { useState } from "react";
import { makeStyles, Typography } from "@mui/material";
import theme from "../../theme";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  select: {
    "&:before": {
      borderColor: theme.palette.text.primary,
    },
    "&:after": {
      borderColor: theme.palette.text.primary,
    },
  },
  icon: {
    fill: theme.palette.text.primary,
  },
  topText: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    margin: ".8rem 0",
  },
  buttonStyles: { borderRadius: "16px", background: "white", color: "black", marginTop: "1rem" },
}));

const SpotifyInsightsPlaylist = ({ playlistToDeleteId, handle }) => {
  const classes = useStyles(theme);
  const [loading, setLoading] = useState(false)
  const [selectValues, setSelectValues] = useState({
    time_range: "short_term",
    limit: 50,
  });
  const handleChange = (e) => {
    setSelectValues({
      ...setSelectValues,
      [e.target.name]: e.target.value,
    });
  };
  const submit = () => {
    setLoading(true)
    const body = {
      time_range: selectValues.time_range,
      limit: selectValues.limit,
      delete: playlistToDeleteId
    }
    axios.post("/spotifystatsplaylist", body)
      .then((res) => {
        window.location = `/${handle}/playlist/${res.data}`
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  return (
    <div className={classes.root}>
      <div className={classes.topText}>
        <Typography color="textPrimary">
          Make a playlist from your spotify listening history
        </Typography>
        <Typography color="textSecondary" variant="body2">
          select from the options below
        </Typography>
      </div>
      <Select
        native
        onChange={handleChange}
        value={selectValues.time_range}
        className={classes.select}
        inputProps={{
          classes: {
            icon: classes.icon,
          },
        }}
        name="time_range"
      >
        <option value={"short_term"}>last 30 days</option>
        <option value={"medium_term"}>last 6 months</option>
        <option value={"long_term"}>all time</option>
      </Select>
      <FormHelperText>Time Period</FormHelperText>
      <Select
        native
        onChange={handleChange}
        value={selectValues.limit}
        className={classes.select}
        inputProps={{
          classes: {
            icon: classes.icon,
          },
        }}
        name="limit"
      >
        <option value={20}>20 songs</option>
        <option value={50}>50 songs</option>
        <option value={50}>100 songs</option>
      </Select>
      <FormHelperText>Length of Playlist</FormHelperText>
      <Button
        variant="contained"
        className={classes.buttonStyles}
        size="large"
        onClick={submit}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress fontSize="small" style={{ color: "#fff" }} />
        ) : (
          "create"
        )}
      </Button>
    </div>
  );
};

const mapState = (state) => {
  return {
    handle: state.user.data.handle,
  };
};

export default connect(mapState)(SpotifyInsightsPlaylist);
