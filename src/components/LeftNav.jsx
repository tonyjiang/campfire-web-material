import {
  AddSharp,
  Article,
  FormatListBulleted,
  Groups,
  People,
  StarBorder,
} from "@mui/icons-material";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
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
            <Tooltip title="Create a new class">
              <AddSharp sx={{ marginRight: 4 }} />
            </Tooltip>
          </ListItem>
          <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Evolutionary Psychology" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Practical Statistics" />
            </ListItemButton>
          </List>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Groups />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItemButton>
            <Tooltip title="Create a new group">
              <AddSharp sx={{ marginRight: 4 }} />
            </Tooltip>
          </ListItem>
          <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Evolution Breakout Discussion 1" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Campus Soccer League" />
            </ListItemButton>
          </List>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="People" />
            </ListItemButton>
            <AddSharp sx={{ marginRight: 4 }} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="Documents" />
            </ListItemButton>
            <AddSharp sx={{ marginRight: 4 }} />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default LeftNav;
