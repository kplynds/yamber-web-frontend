import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import theme from "../theme";
import { loginUser } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100vh",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  paper: {
    marginTop: theme.spacing(8),
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
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const classes = useStyles(theme);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log("connected to handler")
    e.preventDefault();
    const userData = {
      email: formValues.email,
      password: formValues.password
    }
    props.loginUser(userData, history)
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.error}>{props.errors.general}</div>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formValues.email || ""}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={formValues.password || ""}
            onChange={handleChange}
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
      </div>
    </Container>
  );
}

const mapState = (state) => {
  return { 
    loading: state.ui.loading,
    errors: state.ui.errors
  }
}

const mapDispatch = {
  loginUser,
}

export default connect(mapState, mapDispatch) (Login);
