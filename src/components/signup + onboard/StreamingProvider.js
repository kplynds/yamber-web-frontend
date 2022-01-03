import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import theme from "../../theme";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { SiApplemusic, SiSpotify } from "react-icons/si";
import { redirectToSpotify } from "../../redux/actions/userActions";
import CircularProgress from "@mui/material/CircularProgress";

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

const StreamingProvider = ({ user, redirectToSpotify }) => {
  const spotify = () => {
    redirectToSpotify();
  };
  const classes = useStyles(theme);
  if (Object.keys(user.data).length > 0) {
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.root}>
          <CssBaseline />
          <Typography variant="body1" color="textPrimary">
            Welcome, {user.data.info.displayName}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            Sync with your music streaming provider:
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
  } else {
    return (
      <div className={classes.loading}>
        <CircularProgress style={{ color: "#fff" }} />
      </div>
    );
  }
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = {
  redirectToSpotify,
};

export default connect(mapState, mapDispatch)(StreamingProvider);
