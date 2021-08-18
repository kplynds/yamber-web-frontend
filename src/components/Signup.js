import React, { useState } from "react";
// import { connect } from "react-redux";
// import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import theme from "../theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
// import Box from '@material-ui/core/Box';
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import {
  signupUser,
  signupUserWithSpotify,
} from "../redux/actions/userActions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: theme.palette.primary.dark,
    width: "100%",
    height: "100vh"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: "15px",
  },
  spotify: {
    backgroundColor: "#1DB954",
    borderRadius: "15px",
  },
}));

const initialValues = {
  displayName: "",
  username: "",
  email: "",
  phone: "",
  access_token: "",
  authenticated: false,
  refresh_token: "",
  password: "",
};
const Signup = (props) => {
  const classes = useStyles(theme);
  const history = useHistory();
  const [signupState, setSignupState] = useState("info");
  const [loginValue, setLoginValue] = useState("phone");
  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitNoSpotify = (e) => {
    e.preventDefault();
    const registerData = {
      displayName: formValues.displayName,
      handle: formValues.username,
      password: formValues.password,
    };
    if (loginValue === "phone") {
      registerData.loginValue = formValues.phone;
    } else {
      registerData.loginValue = formValues.email;
    }
    props.signupUser(registerData, history);
  };

  const appleMusic = () => {
    let music = window.MusicKit.getInstance();
    music.authorize()
      .then((res) => {
        console.log(res)
      })
  }

  const handleSubmitWithSpotify = (e) => {
    e.preventDefault();
    const registerData = {
      displayName: formValues.displayName,
      handle: formValues.username,
      password: formValues.password,
    };
    if (loginValue === "phone") {
      registerData.loginValue = formValues.phone;
    } else {
      registerData.loginValue = formValues.email;
    }
    props.signupUserWithSpotify(registerData);
  };

  return (
    <Container component="main" maxWidth="xs" style={{background: theme.palette.primary.dark}}>
      <CssBaseline />
      {signupState === "spotify" && (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sync with your streaming provider
          </Typography>
          <Button
            onClick={handleSubmitWithSpotify}
            endIcon={
              <span
                className="iconify"
                data-icon="mdi-spotify"
                data-inline="false"
              ></span>
            }
            size="large"
            fullWidth
            className={classes.spotify}
          >
            Spotify
          </Button>
          <Button 
            onClick={appleMusic}
          >Apple Music</Button>
          <Button onClick={handleSubmitNoSpotify}>
            Sign up without syncing (you can do this later)
          </Button>
          <Button
            onClick={() => {
              setSignupState("info");
            }}
          >
            Back to info page
          </Button>
        </div>
      )}

      {signupState === "info" && (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  type="username"
                  id="username"
                  label="Username"
                  value={formValues.username || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="password"
                  variant="outlined"
                  required
                  fullWidth
                  type="password"
                  id="password"
                  label="Password"
                  value={formValues.password || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="displayName"
                  variant="outlined"
                  required
                  fullWidth
                  type="displayName"
                  id="displayName"
                  label="Display Name"
                  value={formValues.displayName || ""}
                  onChange={handleChange}
                />
              </Grid>
              {loginValue === "phone" && (
                <Grid item xs={12}>
                  <TextField
                    name="phone"
                    variant="outlined"
                    required
                    fullWidth
                    type="phone"
                    id="phone"
                    label="Phone"
                    value={formValues.phone || ""}
                    onChange={handleChange}
                  />
                </Grid>
              )}
              {loginValue === "phone" && (
                <Grid item xs={12}>
                  <Button
                    onClick={() => {
                      setLoginValue("email");
                    }}
                  >
                    use email instead
                  </Button>
                </Grid>
              )}
              {loginValue === "email" && (
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email"
                    value={formValues.email || ""}
                    onChange={handleChange}
                  />
                </Grid>
              )}
              {loginValue === "email" && (
                <Grid item xs={12}>
                  <Button
                    onClick={() => {
                      setLoginValue("phone");
                    }}
                  >
                    use phone instead
                  </Button>
                </Grid>
              )}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I accept the terms and conditions"
                />
              </Grid>
            </Grid>
            <Button
              onClick={(e) => {
                // ADD FORM VALIDATION + DISPLAY ERROR MESSAGE HERE
                e.preventDefault();
                setSignupState("spotify");
              }}
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              className={classes.submit}
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
          </form>
        </div>
      )}
    </Container>
  );
};

const mapState = (state) => {
  return {
    state,
  };
};

const mapDispatch = {
  signupUser,
  signupUserWithSpotify,
};

export default connect(mapState, mapDispatch)(Signup);
