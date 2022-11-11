import {
  InputAdornment,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  styled,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "./UserContext";
import React from "react";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function SignUpModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [university, setUniversity] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('student');
  const { setUser } = useContext(UserContext);
  const oauth_client_id = process.env.REACT_APP_OAUTH_CLIENT_ID;

  const handleSignUp = () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      user_type: userType,
      email: email,
      password: password,
      institution_id: 1,
      client_id: oauth_client_id,
    };
    axios
      .post("/api/v1/users", data)
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        setUser(resp.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setOpen(false);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box>
      <Link sx={{ marginLeft: "10px" }} href="#" onClick={(e) => setOpen(true)}>
        Sign Up
      </Link>
      <SytledModal open={open} onClose={(e) => setOpen(false)}>
        <Box
          width="60ch"
          height={550}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Stack spacing={3}>
            <div>
              <h1>Create new account</h1>
            </div>
            <div
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <FormControl sx={{ width: "24ch" }} variant="outlined">
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <OutlinedInput
                  id="firstName"
                  required
                  type="text"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ ml: 2, width: "24ch" }} variant="outlined">
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <OutlinedInput
                  id="lastName"
                  required
                  type="text"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
            </div>
            <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
              <InputLabel htmlFor="institution">Your University</InputLabel>
              <OutlinedInput
                id="institution"
                type="text"
                label="Your University"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
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
            <FormControl sx={{ marginTop: "30px", width: "25ch" }}>
              <InputLabel id="select-user-type-label">Your primary role</InputLabel>
              <Select
                labelId="select-user-type-label"
                id="select-user-type"
                value={userType}
                label="Your primary role"
                onChange={(e) => setUserType(e.target.value)}
              >
                <MenuItem value="instructor">Instructor</MenuItem>
                <MenuItem value="assistant">Assistant</MenuItem>
                <MenuItem value="student">Student</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <Button
                variant="contained"
                size="large"
                sx={{ marginTop: "15px", width: "53ch" }}
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </Box>
          </Stack>
        </Box>
      </SytledModal>
    </Box>
  );
}
