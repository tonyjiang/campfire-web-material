import { Box, createTheme, Grid, ThemeProvider } from "@mui/material";
import { useState } from "react";

import LeftNav from "./components/LeftNav";
import HomeFeed from "./components/HomeFeed";
import HeaderBar from "./components/HeaderBar";
import FabCreate from "./components/FabCreate";

const Home = () => {
  const [mode, setMode] = useState("dark");
  const [centerColumn, setCenterColumn] = useState(<HomeFeed />);

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
          <Grid item sm={0} md={0} lg={3}>
            <LeftNav setCenterColumn={setCenterColumn} />
          </Grid>
          <Grid item sm={12} md={10} lg={7}>
            {centerColumn}
          </Grid>
          <Grid item sm={0} md={2} lg={2}>
            <div />
          </Grid>
        </Grid>
        <FabCreate />
      </Box>
    </ThemeProvider>
  );
};

export default Home;
