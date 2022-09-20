import {
  DarkMode,
  ExitToApp,
  Feedback,
  HelpCenter,
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
import React, { useContext, useState } from "react";
import { UserContext } from "./user/UserContext";

const MyToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  marginRight: "100px",
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
  gap: "3px",
  marginLeft: "20px",
}));

const HeaderBar = ({ mode, setMode }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
  }

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
          />
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Switch
            color="default"
            onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
          />
          <UserBox onClick={(e) => setProfileMenuOpen(true)}>
            <ManageAccounts />
            <Typography variant="span">Tony</Typography>
          </UserBox>
        </IconsBox>
      </MyToolbar>
      <Menu
        id="demo-positioned-menu"
        sx={{ marginTop: 4 }}
        aria-labelledby="demo-positioned-button"
        open={profileMenuOpen}
        onClose={(e) => setProfileMenuOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>
          <Settings sx={{ marginRight: 1 }} /> Settings
        </MenuItem>
        <MenuItem>
          <DarkMode sx={{ marginRight: 1 }} /> Display
        </MenuItem>
        <MenuItem>
          <HelpCenter sx={{ marginRight: 1 }} /> Help
        </MenuItem>
        <MenuItem>
          <Feedback sx={{ marginRight: 1 }} /> Feedback
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ExitToApp sx={{ marginRight: 1 }} /> Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default HeaderBar;
