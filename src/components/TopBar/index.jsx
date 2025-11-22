import React, { useMemo } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function buildContextTitle(pathname) {
  const mPhotos = pathname.match(/^\/photos\/([^/]+)$/);
  if (mPhotos) {
    const user = models.userModel(mPhotos[1]);
		return user ? `Photos of ${user.first_name} ${user.last_name}` : "Photos";
  }
  const mUser = pathname.match(/^\/users\/([^/]+)$/);
  if (mUser) {
    const user = models.userModel(mUser[1]);
    return user ? `${user.first_name} ${user.last_name}` : "User Detail";
  }
  if (pathname === "/users") return "User List";

  return "Photo Sharing";
}

export default function TopBar() {
  const location = useLocation();
  const rightTitle = useMemo(
    () => buildContextTitle(location.pathname),
    [location.pathname]
  );

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Lê Anh Duy</Typography>
        <Typography variant="h6">
          {rightTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
