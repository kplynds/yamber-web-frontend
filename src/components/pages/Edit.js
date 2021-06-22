import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Hidden from "@material-ui/core/Hidden";
import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import theme from "../../theme";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { updateProfileInfo } from "../../redux/actions/userActions";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

export const CustomTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: theme.palette.text.primary,
      borderColor: theme.palette.text.primary,
    },
    "& label.Mui-disabled": {
      color: theme.palette.text.secondary,
    },
    "& .MuiInputBase-root.Mui-disabled": {
      color: theme.palette.text.secondary,
      "& fieldset": {
        borderColor: theme.palette.text.secondary,
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.text.secondary,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.primary,
      },
      "& .Mui-focused fieldset": {
        borderColor: theme.palette.text.primary,
      },
      "& .Mui-disabled fieldset": {
        borderColor: theme.palette.text.primary,
      },
    },
  },
})(TextField);

export const CustomSelect = withStyles({
  root: {
    width: "5rem",
    textAlign: "center",
    background: theme.palette.primary.light,
    paddingLeft: ".4rem",
  },
})(Select);

const useStyles = makeStyles((theme) => ({
  root: {},
  textField: {
    marginTop: "1rem",
  },
  editContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "1.5rem",
    paddingTop: "1rem",
    width: "50%",
    margin: "0 auto",
    borderRadius: "8px",
    background: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      width: "75%",
      paddingBottom: "18%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  editTitle: {
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: ".5rem",
    padding: "0 .5rem",
  },
  divContainer: {
    margin: "1.5rem 0",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  arrowIcon: {
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  profilePhoto: {
    width: "8rem",
    height: "8rem",
  },
  divTitle: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    padding: "0 2rem",
  },
  selectLabel: {
    marginRight: ".5rem",
  },
  menuItem: {
    color: theme.palette.primary.dark,
  },
}));
const Edit = ({ user, updateProfileInfo, loading }) => {
  const classes = useStyles(theme);
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    bio: "",
    displayName: "",
    socials: {
      instagram: "",
      twitter: "",
    },
  });
  const [selectValues, setSelectValues] = useState({
    topArtistsPreference: "",
    recentListeningPreference: "",
    streamingProvider: "",
  });
  const [editState, setEditState] = useState({
    picture: true,
    info: true,
    preferences: true,
  });
  const preferenceButtonClick = () => {
    if (editState.preferences === true) {
      setEditState({
        ...editState,
        preferences: !editState.preferences,
      });
    } else {
      updateProfileInfo(selectValues);
    }
  };
  const handleEditSwitchInfo = () => {
    if (editState.info === true) {
      setEditState({
        ...editState,
        info: !editState.info,
      });
    } else {
      const body = {
        "info.displayName": formValues.displayName,
        "info.bio": formValues.bio,
        socials: formValues.socials,
      };
      updateProfileInfo(body);
    }
  };
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSocialChange = (e) => {
    setFormValues({
      ...formValues,
      socials: {
        ...formValues.socials,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleSelectChange = (e) => {
    setSelectValues({
      ...selectValues,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (Object.keys(user.data).length > 0) {
      setFormValues({
        bio: `${user.data.info.bio}`,
        displayName: `${user.data.info.displayName}`,
        socials: {
          instagram: `${user.data.socials.instagram}`,
          twitter: `${user.data.socials.twitter}`,
        },
      });
      setSelectValues({
        recentListeningPreference: `${user.data.recentListeningPreference}`,
      });
    }
  }, [user.data]);
  return (
    <div className={classes.root}>
      <Hidden smDown>
        <DesktopNav />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
      </Hidden>
      <div className={classes.editContainer}>
        <div className={classes.editTitle}>
          <div>
            <ArrowBackIcon
              onClick={() => history.goBack()}
              className={classes.arrowIcon}
            />
          </div>
          <Typography variant="body1" color="textPrimary">
            Edit Profile
          </Typography>
          <div></div>
        </div>
        {Object.keys(user.data).length > 0 && (
          <div className={classes.divContainer}>
            <div className={classes.divTitle}>
              <Typography variant="body1" color="textPrimary">
                Profile Picture
              </Typography>
              <Button>Edit</Button>
            </div>
            <div>
              <Avatar
                alt={user.data.info.displayName}
                src={user.data.info.imageUrl}
                className={classes.profilePhoto}
              />
            </div>
          </div>
        )}
        <div className={classes.divContainer}>
          <div className={classes.divTitle}>
            <Typography variant="body1" color="textPrimary">
              Profile Information
            </Typography>
            <Button onClick={handleEditSwitchInfo} disabled={loading}>
              {loading ? (
                <CircularProgress style={{ color: "#fff" }} />
              ) : editState.info ? (
                "edit"
              ) : (
                "save"
              )}
            </Button>
          </div>
          <div>
            <form className={classes.form}>
              <CustomTextField
                variant="outlined"
                label="Display Name"
                className={classes.textField}
                value={formValues.displayName}
                onChange={handleChange}
                name="displayName"
                disabled={editState.info}
              />
              <CustomTextField
                variant="outlined"
                label="Bio"
                className={classes.textField}
                value={formValues.bio}
                onChange={handleChange}
                name="bio"
                disabled={editState.info}
                multiline
              />
              <div>
                <CustomTextField
                  variant="outlined"
                  label="Instagram Username"
                  className={classes.textField}
                  value={formValues.socials.instagram}
                  onChange={handleSocialChange}
                  name="instagram"
                  style={{ marginRight: ".5rem" }}
                  disabled={editState.info}
                />
                <CustomTextField
                  variant="outlined"
                  label="Twitter Username"
                  className={classes.textField}
                  value={formValues.socials.twitter}
                  onChange={handleSocialChange}
                  name="twitter"
                  disabled={editState.info}
                />
              </div>
            </form>
          </div>
        </div>
        <div className={classes.divContainer}>
          <div className={classes.divTitle}>
            <Typography variant="body1" color="textPrimary">
              Profile Preferences
            </Typography>
            <Button onClick={preferenceButtonClick} disabled={loading}>
              {loading ? (
                <CircularProgress />
              ) : editState.info ? (
                "edit"
              ) : (
                "save"
              )}
            </Button>
          </div>
          <div>
            <form>
              <div style={{ display: "flex", alignItems: "center" }}>
                <InputLabel
                  id="recentListeningPreference"
                  className={classes.selectLabel}
                >
                  How should we display recent listening?
                </InputLabel>
                <CustomSelect
                  value={selectValues.recentListeningPreference}
                  name="recentListeningPreference"
                  onChange={handleSelectChange}
                  labelId="recentListeningPreference"
                  displayEmpty
                  disabled={editState.preferences}
                  renderValue={() => {
                    if (selectValues.recentListeningPreference !== "") {
                      return selectValues.recentListeningPreference;
                    } else {
                      return "select";
                    }
                  }}
                >
                  <MenuItem value="auto/activity" className={classes.menuItem}>
                    auto update from your listening activity
                  </MenuItem>
                  <MenuItem value="auto/playlist" className={classes.menuItem}>
                    auto update from a playlist
                  </MenuItem>
                  <MenuItem value="manual" className={classes.menuItem}>
                    manual
                  </MenuItem>
                </CustomSelect>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatch = {
  updateProfileInfo,
};

const mapState = (state) => {
  return {
    user: state.user,
    loading: state.ui.loading,
  };
};

export default connect(mapState, mapDispatch)(Edit);
