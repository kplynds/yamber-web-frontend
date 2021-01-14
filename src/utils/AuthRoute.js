import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authRouteReached } from "../redux/actions/dataActions";

const AuthRoute = ({
  component: Component,
  authenticated,
  authRouteReached,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (authenticated) {
          return <Component />;
        } else {
          authRouteReached();
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

const mapState = (state) => {
  return {
    authenticated: state.user.authenticated,
  };
};

const mapDispatch = {
  authRouteReached,
};

export default connect(mapState, mapDispatch)(AuthRoute);
