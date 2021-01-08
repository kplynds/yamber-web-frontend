import React from "react";

import Hidden from "@material-ui/core/Hidden";

import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";

export default function Profile() {
  return (
    <div>
      <Hidden xsDown>
        <DesktopNav />
      </Hidden>
      <Hidden smUp>
        <MobileNav />
      </Hidden>
    </div>
  );
}
