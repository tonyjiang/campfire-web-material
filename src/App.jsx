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
        <HeaderBar mode={mode} setMode={setMode} minHeight="5vh" />
        <Grid container minHeight="95vh">
          <Grid item xs={0} sm={0} md={3}>
            <LeftNav setCenterColumn={setCenterColumn} />
          </Grid>
          <Grid item xs={12} sm={8} md={5.5}>
            {centerColumn}
          </Grid>
          <Grid item xs={0} sm={4} md={3.5}>
            <RightColumn />
          </Grid>
        </Grid>
        <FabCreate />
      </Box>
    </ThemeProvider>
  );
}

export default App;
