import React from "react";

import Hidden from "@mui/material/Hidden";

import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Search() {
  return (
    <div>
      <Hidden mdDown>
        <DesktopNav />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
      </Hidden>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Link
          to="/kyle"
          style={{
            textDecoration: "none",
            textAlign: "center",
            color: "white",
            marginTop: "2rem",
            margin: "0 auto",
          }}
        >
          <Button>Kyle's Profile</Button>
        </Link>
      </div>
    </div>
  );
}
