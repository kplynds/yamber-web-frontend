// will redirect here after successfull auth from spotify with tokens in the querystring
// if (querystring), show loading screen and fill in form
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import theme from "../../../theme";
import Container from "@mui/material/Container";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Avatar from "@mui/material/Avatar";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";
import Button from "@mui/material/Button";
// import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/Error";

const useStyles = makeStyles((theme) => ({
  root: {},
  textField: {
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: "8px",
  },
  inputBase: {
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: "6px",
    padding: theme.spacing(2),
    height: "6vh",
    color: theme.palette.text.primary,
  },
  title: {
    margin: "3rem 0",
  },
  smallFieldContainer: {
    display: "flex",
    flexDirection: "column",
    width: "75%",
    margin: "0 auto",
    marginBottom: "1rem",
  },
  inputLabel: {
    marginBottom: ".7rem",
  },
  profilePhotoDiv: {
    marginBottom: "3rem",
  },
  profilePhoto: {
    width: "7rem",
    height: "7rem",
    margin: "0 auto",
  },
  socialsFields: {
    display: "flex",
  },
  inputBaseSocial: {
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: "6px",
    padding: theme.spacing(2),
    height: "6vh",
    color: theme.palette.text.primary,
  },
  submit: {
    margin: "2rem auto",
    backgroundColor: "white",
    color: theme.palette.primary.dark,
    width: "60%",
    borderRadius: "12px",
  },
}));

const CreateProfile = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameTaken, setUserNameTaken] = useState(false);
  const classes = useStyles(theme);
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const submit = () => {
    setLoading(true);
    const submitValues = {
      displayName: formValues.displayName,
      imageUrl: formValues.profilePhoto,
      handle: formValues.handle,
      spotifyAuthenticated: urlParams.get("aid") ? true : false,
      spotifyAccess: urlParams.get("aid") ? urlParams.get("aid") : "",
      spotifyRefresh: urlParams.get("rid") ? urlParams.get("rid") : "",
      email: urlParams.get("email") ? urlParams.get("email") : "",
      twitter: formValues.twitter,
      instagram: formValues.instagram,
    };
    axios
      .post("/signup", submitValues)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
        setLoading(false);
        window.location.href = "/welcome/customize";
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const [formValues, setFormValues] = useState({
    handle: "",
    profilePhoto: urlParams.get("photo")
      ? urlParams.get("photo")
      : "https://firebasestorage.googleapis.com/v0/b/flumes-company.appspot.com/o/no-img.png?alt=media&token=9dc9b13d-7383-406e-a8cc-c4b1857597a2",
    instagram: urlParams.get("instagram") ? urlParams.get("instagram") : "",
    twitter: urlParams.get("twitter") ? urlParams.get("twitter") : "",
    displayName: urlParams.get("displayName")
      ? urlParams.get("displayName")
      : "",
  });
  const [photoLoading, setPhotoLoading] = useState(false);

  const profilePhotoFunc = (e) => {
    setPhotoLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    axios
      .post("/uploadimage", formData)
      .then((res) => {
        setFormValues({
          ...formValues,
          profilePhoto: res.data,
        });
        setPhotoLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPhotoLoading(false);
      });
  };
  useEffect(() => {
    setCheckingUsername(true);
    axios
      .get(`/checkusername/${formValues.handle}`)
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
  }, [formValues.handle]);
  return (
    <div className={classes.root}>
      <Container maxWidth="xs" component="main">
        <div className={classes.title}>
          <Typography variant="h6" color="textPrimary" align="center">
            Create Your Profile
          </Typography>
        </div>
        <div className={classes.profilePhotoDiv}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography align="left" color="textPrimary">
              Profile Picture
            </Typography>
            <input
              type="file"
              id="image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={profilePhotoFunc}
            />
            <label htmlFor="image">
              <Button component="span">upload photo</Button>
            </label>
          </div>
          <div>
            {photoLoading ? (
              <CircularProgress />
            ) : (
              <Avatar
                alt={formValues.profilePhoto}
                src={formValues.profilePhoto}
                className={classes.profilePhoto}
              />
            )}
          </div>
        </div>
        <div className={classes.smallFieldContainer}>
          <InputLabel className={classes.inputLabel}>Username</InputLabel>
          <InputBase
            value={formValues.handle}
            onChange={handleChange}
            className={classes.inputBase}
            name="handle"
            variant="outlined"
            label="Username"
            placeholder="Username"
            fullWidth
          />
        </div>
        {formValues.handle !== "" && (
          <div className={classes.isAvailable}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="body2" color="textSecondary" align="center">
                Is this username available?&nbsp;
              </Typography>
              {checkingUsername ? (
                <CircularProgress />
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="body2" color="textSecondary">
                Your sharable link:&nbsp;
              </Typography>
              <Typography variant="body2" color="textPrimary">
                {usernameTaken
                  ? "unavailable :("
                  : `${formValues.handle}.yamber.com`}
              </Typography>
            </div>
          </div>
        )}
        {/* <div className={classes.smallFieldContainer}>
          <InputLabel className={classes.inputLabel}>Display Name</InputLabel>
          <InputBase
            value={formValues.displayName}
            onChange={handleChange}
            className={classes.inputBase}
            name="displayName"
            variant="outlined"
            label="Display Name"
            placeholder="Display Name"
            fullWidth
          />
        </div>
        <div className={classes.socials}>
          <InputLabel className={classes.inputLabel}>
            Other Socials (optional)
          </InputLabel>
          <div className={classes.socialsFields}>
            <InputBase
              value={formValues.twitter}
              onChange={handleChange}
              className={classes.inputBaseSocial}
              name="twitter"
              variant="outlined"
              label="Twitter"
              placeholder="Twitter"
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <TwitterIcon fontSize="small" />
                </InputAdornment>
              }
            />
            <InputBase
              value={formValues.instagram}
              onChange={handleChange}
              className={classes.inputBaseSocial}
              name="instagram"
              variant="outlined"
              label="Instagram"
              placeholder="Instagram"
              fullWidth
              style={{ marginLeft: ".5rem" }}
              startAdornment={
                <InputAdornment position="start">
                  <InstagramIcon fontSize="small" />
                </InputAdornment>
              }
            />
          </div>
        </div> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            className={classes.submit}
            size="large"
            onClick={submit}
            disabled={loading || usernameTaken}
          >
            {loading ? "loading..." : "submit"}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CreateProfile;
