import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core";
import theme from "../../theme";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import Hidden from "@material-ui/core/Hidden";
import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "70vh",
    marginBottom: "15vh",
    marginTop: "6vh",
    // background: "red"
  },
  textField: {
    margin: "2rem 25rem",
    [theme.breakpoints.down("md")]: {
      margin: "2rem 20rem",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "3rem 10rem",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "3rem 3rem",
    },
  },
  title: { display: "flex", justifyContent: "center" },
  button: { display: "flex", justifyContent: "center" },
  buttonStyles: { borderRadius: "16px", background: "white", color: "black" },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
})(TextField);

const NewPlaylist = ({ user }) => {
  const classes = useStyles(theme);
  const [title, setTitle] = useState("Untitled");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const onClick = () => {
    setLoading(true);
    axios
      .post("/playlist", {
        title: title,
      })
      .then((res) => {
        history.push(`/${user.data.handle}/playlist/${res.data.message}`);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log("failing");
        setLoading(false);
      });
  };
  return (
    <div>
      <Hidden smDown>
        <DesktopNav />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
      </Hidden>
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography color="textPrimary" variant="h5">
            Give your playlist a snazzy title
          </Typography>
        </div>
        <div className={classes.textField}>
          <CssTextField
            value={title}
            onChange={(e, v) => {
              setTitle(e.target.value);
            }}
            fullWidth
            autoFocus
            inputProps={{ style: { textAlign: "center" } }}
          />
        </div>
        <div className={classes.button}>
          <Button
            variant="contained"
            className={classes.buttonStyles}
            size="large"
            onClick={onClick}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress fontSize="small" style={{ color: "#fff" }} />
            ) : (
              "create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(NewPlaylist);
