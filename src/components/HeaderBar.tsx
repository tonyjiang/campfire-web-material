import {
  ExitToApp,
  Settings,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "./user/UserContext";
import { ReactComponent as CampfireLogo } from '../assets/CampfireLogo.svg';


const MyToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const IconsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px"
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const HeaderBar = ({ mode, setMode }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AppBar position="sticky">
      <MyToolbar>
        <Box display="flex" alignItems={"center"}>
        <CampfireLogo height={40} fill={"white"} stroke={"grey"}/>
        </Box>
        <IconsBox sx={{'&:hover': {cursor: "pointer"}}} onClick={(e) => setProfileMenuOpen(true)}>
        <UserBox>
          <Typography variant="inherit">Tony</Typography>
          </UserBox>
          <Avatar
            sx={{ width: 40, height: 40 }}
            src="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          />
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
        <MenuItem onClick={handleLogout}>
          <ExitToApp sx={{ marginRight: 1 }} /> Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default HeaderBar;
