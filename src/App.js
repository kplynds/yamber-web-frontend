import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import SignupApple from "./components/Signups/Signup_Apple";
import SignupEmail from "./components/Signups/Signup_Email";
import SignupPhone from "./components/Signups/Signup_Phone";
import Protected from "./components/Protected";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Featured from "./components/protected/Featured";
import Search from "./components/protected/Search";
import Profile from "./components/protected/Profile";

// REDUX
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    // Not sure if the provider should wrap here, maybe wrap it somewhere else where components are being rendered.
    <Provider store={store}> 
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
          <Route path="/protected">
            <Protected />
          </Route>
          <Route path="/featured">
            <Featured />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
