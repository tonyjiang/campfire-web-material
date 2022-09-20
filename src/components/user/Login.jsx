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
  Switch,
  Link,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useContext, useState } from "react";

import SignUpModal from "./SignUpModal";
import { UserContext } from "./UserContext";

const MyToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const IconsBox = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

export default function Login() {
  const [mode, setMode] = useState("dark");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(UserContext);

  const modeTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const handleLogin = () => {
    setUser({
      id: 1,
      first_name: "Mars",
      last_name: "Jiangster",
      username: "themartian",
      email: "mars@jianster.org",
      profile_picture: "some storage link such as s3",
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={modeTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
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
              <HomeIcon sx={{ marginLeft: 1 }} />
            </Box>
            <IconsBox>
              <Switch
                color="default"
                onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
              />
            </IconsBox>
          </MyToolbar>
        </AppBar>
        <Grid container minHeight="95vh">
          <Grid item sm={0} md={0} lg={3}></Grid>
          <Grid item sm={12} md={10} lg={7}>
            <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
              <h1>Welcome!</h1>
            </Box>
            <Stack spacing={3}>
              <FormControl sx={{ m: 1, width: "49ch" }} variant="outlined">
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  type="text"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  sx={{ marginLeft: "5px" }}
                  label="Password"
                  value={password}
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
                sx={{ m: 1, width: "53ch" }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <div sx={{ marginTop: "100px", marginBottom: "100px" }}>
                <Link href="#">Forgot password?</Link>
              </div>
              <div sx={{ marginTop: "100px", marginBottom: "100px" }}></div>
              <Box sx={{ display: "flex", flexDirection: "row", marginTop: "100px", marginBottom: "100px" }}>
                <span>Don't have an account yet?</span>
                <SignUpModal />
              </Box>
            </Stack>
          </Grid>
          <Grid item sm={0} md={2} lg={2}></Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
