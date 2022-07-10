import LeftNav from "./components/LeftNav";
import Feed from "./components/Feed";
import RightColumn from "./components/RightColumn";
import { Box, createTheme, Grid, ThemeProvider } from "@mui/material";
import HeaderBar from "./components/HeaderBar";
import FabCreate from "./components/FabCreate";
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
        <Grid container>
          <Grid item xs={3} sx={{bgcolor: "teal"}}>
            <LeftNav setCenterColumn={setCenterColumn} />
          </Grid>
          <Grid item xs={5} sx={{bgcolor: "red"}}>
            {centerColumn}
          </Grid>
          <Grid item xs={4} sx={{bgcolor: "green"}}>
            <RightColumn />
          </Grid>
        </Grid>
        <FabCreate />
      </Box>
    </ThemeProvider>
  );
}

export default App;
