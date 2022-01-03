import React from "react";
import { makeStyles } from "@mui/styles";
import theme from "../../../theme";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { SiApplemusic, SiSpotify } from "react-icons/si";
// import { redirectToSpotify } from "../../../redux/actions/userActions";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(12),
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
}));

const LandingStreaming = () => {
  const classes = useStyles(theme);
  const spotify = () => {
    window.location.href = `${axios.defaults.baseURL}/spotifylogin`
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <CssBaseline />
        <Typography variant="body1" color="textPrimary">
          Sign up with your streaming provider
        </Typography>
        <Button
          onClick={spotify}
          size="large"
          endIcon={<SiSpotify />}
          fullWidth
          style={{
            background: "#1db954",
            borderRadius: "18px",
            marginTop: theme.spacing(3),
          }}
        >
          Spotify
        </Button>
        <Button
          size="large"
          onClick={() => {
            alert("signup with apple music not yet enabled");
          }}
          endIcon={<SiApplemusic />}
          fullWidth
          style={{
            background: "#fc3c44",
            borderRadius: "18px",
            marginTop: theme.spacing(3),
          }}
        >
          Apple Music
        </Button>
      </div>
    </Container>
  );
};

export default LandingStreaming;
