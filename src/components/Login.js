import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

import theme from "../theme";

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
    
  }
}));

function Login() {
  const history = useHistory();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [renderedErrors, setRenderedErrors] = useState({ error: "" });
  const [loading, setLoading] = useState(false);

  const classes = useStyles(theme);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "https://us-central1-flumes-company.cloudfunctions.net/api/login",
        formValues
      )
      .then((res) => {
        setLoading(false);
        history.push("/protected");
      })
      .catch((err) => {
        console.log(err.response.data.general);
        setRenderedErrors({ error: `${err.response.data.general}` });
        setLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.error}>{renderedErrors.error}</div>
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
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Login;
