import React, { useState } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import MuiPhoneNumber from "material-ui-phone-number";
import theme from "../theme";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { connect } from "react-redux";
import { getAuthenticatedUserDataAndPushUtil } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  border: {
    borderColor: theme.palette.text.primary,
  },
  style: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.text.primary} !important`,
    },
  },
  cssFocused: {},
}));

function LoginStytch({ getAuthenticatedUserDataAndPushUtil }) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const change = (e, v) => {
    setCode(e.target.value);
  };
  const [method_id, setMethod_id] = useState(null);
  const [loading, setLoading] = useState(false);
  const setPhoneFunc = (value) => {
    setPhone(value);
  };
  const [phoneNumberEntered, setPhoneNumberEntered] = useState(false);

  const buttonClick = () => {
    setLoading(true);
    let phoneNew = phone;
    phoneNew = phoneNew.replace(/\s/g, "");
    phoneNew = phoneNew.replace(/[()]/g, "");
    phoneNew = phoneNew.replace(/-/g, "");
    axios
      .get(`/stytchphone/${phoneNew}/login`)
      .then((res) => {
        setMethod_id(res.data.phone_id);
        setPhoneNumberEntered(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          alert("no user with this phone number exists");
        } else {
          alert("unknown error");
        }
      });
  };
  const login = () => {
    setLoading(true);
    let phoneNew = phone;
    phoneNew = phoneNew.replace(/\s/g, "");
    phoneNew = phoneNew.replace(/[()]/g, "");
    phoneNew = phoneNew.replace(/-/g, "");
    axios
      .post("/stytchvalidate/login", {
        method_id,
        code,
        number: phoneNew,
      })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
        getAuthenticatedUserDataAndPushUtil();
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setLoading(false);
          alert("no user with this phone number exists");
        } else {
          setLoading(false);
          alert("unknown error so so sorry we are dumb");
        }
      });
  };
  const classes = useStyles(theme);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "50vh",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <Typography color="textPrimary">Login With Phone Number</Typography>
      {!phoneNumberEntered ? (
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
          autoFocus
          InputLabelProps={{
            sx: {
              "&.Mui-focused": {
                color: theme.palette.text.primary,
              },
            },
          }}
          sx={{
            marginTop: "2rem",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "8px",
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.text.primary,
                borderWidth: "2px",
                color: "red",
              },
            },
          }}
          label="Phone Number"
        />
      ) : (
        <TextField
          sx={{
            "& .MuiInputBase-root": {
              borderBottom: "1px solid white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.text.primary,
            },
            marginTop: "2rem",
            [theme.breakpoints.up("sm")]: {
              width: "50%",
            },
            [theme.breakpoints.up("lg")]: {
              width: "30%",
            },
          }}
          label="Confirm the Code Sent To Your Number"
          variant="standard"
          fullWidth
          onChange={change}
          value={code}
          autoFocus
        />
      )}
      {!loading && (
        <Button
          sx={{
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.primary.dark,
            "&:hover": {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.primary.dark,
              border: "1px solid white",
            },
            marginTop: "1rem",
            marginBottom: "1rem"
          }}
          onClick={phoneNumberEntered ? login : buttonClick}
        >
          {phoneNumberEntered ? "login" : "send login code"}
        </Button>
      )}
      {loading && (
        <Button
          sx={{
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.primary.dark,
            "&:hover": {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.primary.dark,
              border: "1px solid white",
            },
            margin: "1rem 0",
          }}
          disabled={true}
        >
          loading...
        </Button>
      )}
      <a style={{ textDecoration: "none" }} href="/signup">
        <Typography variant="body2" color="textSecondary">
          or signup
        </Typography>
      </a>
    </Container>
  );
}

const mapState = (state) => {
  return {
    user: state.user,
    ui: state.ui,
  };
};

const mapDispatch = {
  getAuthenticatedUserDataAndPushUtil,
};

export default connect(mapState, mapDispatch)(LoginStytch);
