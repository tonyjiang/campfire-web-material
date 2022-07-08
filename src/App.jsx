import LeftNav from "./components/LeftNav";
import Feed from "./components/Feed";
import RightColumn from "./components/RightColumn";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import HeaderBar from "./components/HeaderBar";
import Create from "./components/Create";
import { useState } from "react";

const App = () => {
  const [mode, setMode] = useState("light");
  const [centerColumn, setCenterColumn] = useState(<Feed />);

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
          <LeftNav setCenterColumn={setCenterColumn} />
          {centerColumn}
          <RightColumn />
        </Stack>
        <Create />
      </Box>
    </ThemeProvider>
  );
}

export default App;
