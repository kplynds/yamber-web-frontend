import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import theme from "../theme";
import { loginUser } from "../redux/actions/userActions";
import { CustomTextField } from "./pages/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.dark,
    height: "100vh",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  paper: {
    paddingTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: "auto",
  },
  error: {
    color: "red",
    marginTop: theme.spacing(2),
  },
  progress: {
    color: "white",
    position: "absolute",
  },
}));

function Login(props) {
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    loginValue: "",
    password: "",
  });

  const classes = useStyles(theme);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      loginValue: formValues.loginValue,
      password: formValues.password,
    };
    props.loginUser(userData, history);
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" color="textPrimary">
            Sign in
          </Typography>
          <div className={classes.error}>{props.errors}</div>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <CustomTextField
              variant="outlined"
              label="username, phone, or email"
              className={classes.textField}
              value={formValues.loginValue || ""}
              onChange={handleChange}
              name="loginValue"
              margin="normal"
              fullWidth
            />
            <CustomTextField
              variant="outlined"
              label="password"
              margin="normal"
              className={classes.textField}
              value={formValues.password || ""}
              onChange={handleChange}
              name="password"
              fullWidth
              type="password"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
              {props.loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </form>
          <Link to="/signup">
            Don't have an account? Click here to register
          </Link>
        </div>
      </Container>
    </div>
  );
}

const mapState = (state) => {
  return {
    loading: state.ui.loading,
    errors: state.ui.errors,
  };
};

const mapDispatch = {
  loginUser,
};

export default connect(mapState, mapDispatch)(Login);
