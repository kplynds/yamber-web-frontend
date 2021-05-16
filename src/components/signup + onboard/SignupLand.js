import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../theme";
import { CustomTextField } from "../pages/Edit";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(8),
  },
  textFields: {
    marginTop: theme.spacing(1),
  },
  textField: {},
  submit: {
    background: `linear-gradient(45deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.light})`,
    borderRadius: "16px",
    marginTop: theme.spacing(1),
  },
}));
const SignupLand = ({ signupUser, state }) => {
  const classes = useStyles(theme);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    displayName: "",
    loginValue: "",
    password: "",
    confirmPassword: "",
    email: false,
  });
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const submitValues = {
      displayName: formValues.displayName,
      password: formValues.password,
      handle: formValues.username,
      loginValue: formValues.loginValue,
      email: formValues.email
    };
    signupUser(submitValues, history);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
        <Typography>Signup</Typography>
        <Grid container spacing={2} className={classes.textFields}>
          <Grid item xs={12}>
            <CustomTextField
              variant="outlined"
              label="Username *"
              className={classes.textField}
              value={formValues.username}
              onChange={handleChange}
              name="username"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              variant="outlined"
              label="Password"
              className={classes.textField}
              value={formValues.password}
              onChange={handleChange}
              name="password"
              fullWidth
              type="password"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              variant="outlined"
              label="Confirm Password"
              className={classes.textField}
              value={formValues.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              fullWidth
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              variant="outlined"
              label={formValues.email ? "Email *" : "Phone *"}
              className={classes.textField}
              value={formValues.loginValue}
              onChange={handleChange}
              name="loginValue"
              fullWidth
            />
          </Grid>
        </Grid>
        <Button
          onClick={() => {
            setFormValues({ ...formValues, email: !formValues.email })
          }}
        >
          {formValues.email ? "use phone instead" : "use email instead"}
        </Button>
        <Button
          className={classes.submit}
          fullWidth
          size="large"
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress /> : "sign up"}
        </Button>
      </div>
    </Container>
  );
};

const mapState = (state) => {
  return {
    state: state,
  };
};

const mapDispatch = {
  signupUser,
};

export default connect(mapState, mapDispatch)(SignupLand);
