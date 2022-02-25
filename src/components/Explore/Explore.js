import React from "react";

import Hidden from "@mui/material/Hidden";

import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";
import { connect } from "react-redux";
import Following from "./Following";
import NewUsers from "./NewUsers";
import CoolPlaylists from "./CoolPlaylists";

function Explore({ user }) {
  const exp = localStorage.getItem("featuredExpireTime");
  if (!exp) {
    localStorage.setItem("featuredExpireTime", 0);
  }
  const notLoading = Object.keys(user.data).length > 0;
  return (
    <div>
      <Hidden mdDown>
        <DesktopNav />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
      </Hidden>
      {notLoading && (
        <div>
          <Following loggedInUser={user} /> <NewUsers /> <CoolPlaylists />
        </div>
      )}
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(Explore);
