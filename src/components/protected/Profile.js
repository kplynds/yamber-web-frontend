import React from "react";
import { connect } from "react-redux";

import Hidden from "@material-ui/core/Hidden";

import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";

const Profile = ({ counter, increment }) => {
  return (
    <div>
      <h1>test: {counter}</h1>
      <button onClick={increment}>increment</button>
      <Hidden xsDown>
        <DesktopNav />
      </Hidden>
      <Hidden smUp>
        <MobileNav />
      </Hidden>
    </div>
  );
}

const mapState = (state) => {
  return { counter: state.user.testCounter }
}

const mapDispatch = (dispatch) => {
  return {
    increment() {
      dispatch({ type: 'INCREMENT' })
    }
  }
}

export default connect(mapState, mapDispatch) (Profile)
