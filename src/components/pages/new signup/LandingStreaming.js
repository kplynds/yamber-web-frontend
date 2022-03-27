import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import theme from "../../../theme";
import CssBaseline from "@mui/material/CssBaseline";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { SiApplemusic, SiSpotify } from "react-icons/si";
// import { redirectToSpotify } from "../../../redux/actions/userActions";
import axios from "axios";
import MuiPhoneNumber from "material-ui-phone-number";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/Error";

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
  border: {
    borderColor: theme.palette.text.primary,
  },
  style: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.text.primary} !important`,
    },
  },
  cssFocused: {
    borderColor: "red !important",
  },
}));

const LandingStreaming = () => {
  const classes = useStyles(theme);
  const spotify = () => {
    window.location.href = `${axios.defaults.baseURL}/spotifylogin/${phone}/${username}`;
  };
  const setPhoneFunc = (value) => {
    setPhone(value);
  };
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameTaken, setUserNameTaken] = useState(false);
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const handleChange = (e, v) => {
    setUsername(e.target.value.trim().toLowerCase());
  };
  useEffect(() => {
    setCheckingUsername(true);
    axios
      .get(`/checkusername/${username}`)
      .then((res) => {
        if (res.status === 200) {
          setUserNameTaken(false);
          setCheckingUsername(false);
        } else {
          setUserNameTaken(true);
          setCheckingUsername(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setCheckingUsername(false);
      });
  }, [username]);
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <CssBaseline />
        <Typography variant="body1" color="textPrimary">
          Sign up with your streaming provider
        </Typography>
        <MuiPhoneNumber
          defaultCountry={"us"}
          value={phone}
          onChange={setPhoneFunc}
          variant="outlined"
          InputProps={{
            classes: {
              notchedOutline: classes.border,
              root: classes.style,
              focused: classes.cssFocused,
            },
          }}
          InputLabelProps={{ style: {
            color: "white"
          }}}
          sx={{
            marginTop: "1rem",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "8px",
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.text.primary,
                borderWidth: "2px",
                color: "red"
              },
            },
          }}
          autoFocus
          label="Phone Number"
        />
        <InputBase
          value={username}
          onChange={handleChange}
          sx={{
            border: `1px solid ${theme.palette.text.primary}`,
            borderRadius: "6px",
            padding: theme.spacing(2),
            height: "6vh",
            color: theme.palette.text.primary,
            marginTop: "1rem",
          }}
          name="handle"
          variant="outlined"
          label="Username"
          placeholder="Choose a Username"
          startAdornment={<InputAdornment position="start">@</InputAdornment>}
        />
        {username !== "" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: ".3rem",
              }}
            >
              <Typography variant="body2" color="textSecondary" align="center">
                Is this username available?&nbsp;
              </Typography>
              {checkingUsername ? (
                <CircularProgress
                  fontSize=".5rem"
                  sx={{ color: theme.palette.text.primary }}
                />
              ) : (
                <div>
                  {usernameTaken ? (
                    <ErrorIcon style={{ color: "red" }} />
                  ) : (
                    <CheckIcon style={{ color: "green" }} />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
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
