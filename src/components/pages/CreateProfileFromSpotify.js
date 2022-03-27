import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import theme from "../../theme";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {
  getAuthenticatedUserDataAndPushUtil,
  justSignedUpUtil,
} from "../../redux/actions/userActions";
import { connect } from "react-redux";

function CreateProfileFromSpotify({
  getAuthenticatedUserDataAndPushUtil,
  justSignedUpUtil,
}) {
  const urlParams = new URLSearchParams(window.location.search);
  const [code, setCode] = useState("");
  const [method_id, setMethod_id] = useState("");
  const [loading, setLoading] = useState(false);
  const change = (e, v) => {
    setCode(e.target.value);
  };
  const postCodeToStytch = () => {
    setLoading(true);
    axios
      .post("/stytchvalidate/signup", {
        method_id,
        code,
      })
      .then((res) => {
        axios
          .post("/signup", {
            imageUrl: urlParams.get("photo"),
            handle: urlParams.get("username"),
            spotifyAuthenticated: true,
            spotifyRefresh: urlParams.get("rid"),
            spotifyAccess: urlParams.get("aid"),
            streamingProvider: "spotify",
            phoneNumber: urlParams.get("phoneNumber"),
          })
          .then((res) => {
            const token = res.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            justSignedUpUtil(urlParams.get("username"), setLoading);
          });
      })
      .catch((err) => {
        setLoading(false);
        alert("incorrect code or smthn idk");
      });
  };
  useEffect(() => {
    let phone = urlParams.get("phone");
    if (phone) {
      phone = phone.replace(/\s/g, "");
      phone = phone.replace(/[()]/g, "");
      phone = phone.replace(/-/g, "");
      axios.get(`/stytchphone/${phone}/signup`).then((res) => {
        if (res.data.user_created) {
          setMethod_id(res.data.phone_id);
        } else {
          alert(
            "this isnt gonna work someone is already using this phone number"
          );
          // build something here that lets them enter in a new component.
        }
      })
      .catch(err => {
        console.log(err.response)
        alert(err.response);
      })
    }
  }, []);
  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "5rem",
      }}
    >
      <Typography variant="h6" color="textPrimary" align="center">
        Alrighty m8 just confirm your phone number and we'll be all chillin
      </Typography>
      <TextField
        sx={{
          "& .MuiInputBase-root": {
            borderBottom: "1px solid white",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: theme.palette.text.primary,
          },
          marginTop: ".8rem",
        }}
        label="Confirm the Code Sent To Your Number"
        variant="standard"
        fullWidth
        onChange={change}
        value={code}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: theme.palette.text.primary,
          color: theme.palette.primary.main,
          marginTop: "1.2rem",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.text.primary,
          },
        }}
        onClick={postCodeToStytch}
        disabled={code.length !== 6 || loading}
      >
        {loading ? "loading m8..." : "create my account"}
      </Button>
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
  justSignedUpUtil,
};

export default connect(mapState, mapDispatch)(CreateProfileFromSpotify);
