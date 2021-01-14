import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import SignupApple from "./components/Signups/Signup_Apple";
import SignupEmail from "./components/Signups/Signup_Email";
import SignupPhone from "./components/Signups/Signup_Phone";
import Protected from "./components/Protected";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Featured from "./components/protected/Featured";
import Search from "./components/protected/Search";
import Profile from "./components/protected/Profile";
import AuthRoute from "./utils/AuthRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup_apple">
          <SignupApple />
        </Route>
        <Route path="/signup_email">
          <SignupEmail />
        </Route>
        <Route path="/signup_phone">
          <SignupPhone />
        </Route>
        {/* Might need to protect these routes */}
        <AuthRoute path="/protected" component={Protected} />
        <AuthRoute path="/featured" component={Featured} />
        <AuthRoute path="/search" component={Search} />
        <AuthRoute path="/profile" component={Profile} />
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
