import {
  Home,
  ManageAccounts,
  Notifications,
  Settings,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  Switch,
} from "@mui/material";
import React, { useState } from "react";

const MyToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const IconsBox = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const HeaderBar = ({ mode, setMode }) => {
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky">
      <MyToolbar>
        <Box display="flex" alignItems={"center"}>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Campfire
          </Typography>
          <Typography
            variant="h8"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            Campfire
          </Typography>
          <Home sx={{ marginLeft: 1 }} />
        </Box>
        <Search>
          <InputBase placeholder="Search..." />
        </Search>
        <IconsBox>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            onClick={(e) => setOpen(true)}
          />
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Switch
            onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
          />
          <ManageAccounts onClick={(e) => setOpen(true)} />
        </IconsBox>
        <UserBox onClick={(e) => setOpen(true)}>
          <Typography variant="span">Tony</Typography>
        </UserBox>
      </MyToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>
          <Settings /> Settings
        </MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default HeaderBar;
