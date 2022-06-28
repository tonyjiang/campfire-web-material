import LeftNav from "./components/LeftNav";
import Feed from "./components/Feed";
import RightBar from "./components/RightBar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import HeaderBar from "./components/HeaderBar";
import Add from "./components/Add";
import { useState } from "react";

const App = () => {
  const [mode, setMode] = useState("light");

  const modeTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={modeTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <HeaderBar mode={mode} setMode={setMode} />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <LeftNav />
          <Feed />
          <RightBar />
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  );
}

export default App;
