import {
  Article,
  FormatListBulleted,
  Groups,
  People,
} from "@mui/icons-material";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import React from "react";

const LeftNav = () => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
        <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <FormatListBulleted />
              </ListItemIcon>
              <ListItemText primary="Classes" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Groups />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="People you follow" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="Documents" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default LeftNav;
