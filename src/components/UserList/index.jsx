import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

export default function UserList() {
  const users = models.userListModel();

  return (
    <div>
      <List component="nav" disablePadding>
        {users.map((user) => (
          <ListItem key={user._id} disablePadding divider>
            <ListItemButton component={RouterLink} to={`/users/${user._id}`}>
              <ListItemText primary={`${user.first_name} ${user.last_name}`}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
