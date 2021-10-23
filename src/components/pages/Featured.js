import React from "react";

import Hidden from "@mui/material/Hidden";

import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";

export default function Featured() {
  return (
    <div>
      <Hidden mdDown>
        <DesktopNav />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
      </Hidden>
    </div>
  );
}
