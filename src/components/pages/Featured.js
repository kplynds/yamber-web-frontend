import React from "react";

import Hidden from "@material-ui/core/Hidden";

import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";

export default function Featured() {
  return (
    <div>
      <Hidden smDown>
        <DesktopNav />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
      </Hidden>
    </div>
  );
}
