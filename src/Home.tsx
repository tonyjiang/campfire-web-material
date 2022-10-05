import { Box, createTheme, Grid, ThemeProvider } from "@mui/material";
import { useState } from "react";

import LeftNav from "./components/LeftNav";
import HomeFeed from "./components/HomeFeed";
import HeaderBar from "./components/HeaderBar";
import React from "react";
import useAppBarHeight from "./Utils";

const Home = () => {
  const [mode, setMode] = useState("dark");
  const [centerColumn, setCenterColumn] = useState(<HomeFeed />);

  const modeTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const appBarHeight = useAppBarHeight()

  return (
    <ThemeProvider theme={modeTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"} sx={{minHeight: "100vh", maxHeight: "100vh", overflow: 'hidden'}}>
        <HeaderBar 
          mode={mode} 
          setMode={setMode}
        />
        <Grid container  sx={{minWidth: "100%"}}>
          <Grid
            item 
            sx={{maxWidth: "20%", minWidth: 200, minHeight: `calc(100vh - ${appBarHeight}px)`, maxHeight: `calc(100vh - ${appBarHeight}px)`}}

          >
            <LeftNav setCenterColumn={setCenterColumn}/>
          </Grid>
          <Grid item
           xs={true}
           >
            {centerColumn}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
