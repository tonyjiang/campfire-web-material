import {
  InputAdornment,
  AppBar,
  Box,
  Button,
  createTheme,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  styled,
  ThemeProvider,
  Toolbar,
  Typography,
  Link,
  responsiveFontSizes,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useContext, useState } from "react";
import axios from "axios";

import SignUpModal from "./SignUpModal";
import { UserContext } from "./UserContext";
import { ReactComponent as CampfireLogo } from '../../assets/CampfireLogo.svg';
import React from "react";

const MyToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});


export default function Login() {
  const [mode] = useState("dark");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(UserContext);
  const oauth_client_id = process.env.REACT_APP_OAUTH_CLIENT_ID;

  let modeTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  modeTheme = responsiveFontSizes(modeTheme);

  const handleLogin = () => {
    const data = {
      email: email,
      password: password,
      client_id: oauth_client_id,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/users/login`, data)
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setUser(resp.data);
      })
      .catch((err) => {
        console.error(err);
      })
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={modeTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <AppBar position="sticky">
          <MyToolbar>
            <Box display="flex">
              <CampfireLogo height={40} fill={"white"} stroke={"grey"}/>
            </Box>
          </MyToolbar>
        </AppBar>
        <Grid container sx={{minHeight: "95vh", maxHeight: "95vh"}}>
          <Grid item xs={true}></Grid>
          <Grid 
            item
            container xs={"auto"} 
            justifyContent="center" 
            alignItems="center" 
            direction="column"
            sx={{marginTop: "-25vh"}}> 
          <Stack spacing={2}>
              <div style={{
                display: 'inline-flex'
              }}>
                <Typography variant="h4">
                  <CampfireLogo height={"1.15em"} fill={"white"} stroke={"grey"} style={{marginRight: 8}}/>
                </Typography>
                <Typography variant="h4">
                  Welcome to Campfire!
                  </Typography>
              </div>
              <FormControl sx={{maxWidth: "450px" }} variant="outlined">
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  type="text"
                  label="Email"
                  value={email || ''}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{maxWidth: "450px" }} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  value={password || ''}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                variant="contained"
                size="large"
                sx={{maxWidth: "450px" }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <div>
                <Link href="#">Forgot password?</Link>
              </div>
              <Box sx={{ display: "flex", flexDirection: "row", marginTop: "100px", marginBottom: "100px" }}>
                <span>Don't have an account yet?</span>
                <SignUpModal />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={true}></Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
