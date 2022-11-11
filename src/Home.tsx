import { Box, createTheme, Grid, ThemeProvider } from "@mui/material";

import LeftNav from "./components/leftNav/LeftNav";
import HeaderBar from "./components/HeaderBar";
import React from "react";
import useAppBarHeight from "./Utils";
import { Outlet } from "react-router-dom";

const Home = () => {
  const modeTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  
  const appBarHeight = useAppBarHeight()

  return (
    <ThemeProvider theme={modeTheme}>
      <Box 
        bgcolor={"background.default"} 
        color={"text.primary"} 
        style={{
          minHeight: "100vh", 
          maxHeight: "100vh", 
          overflow: 'hidden'  
        }}
      >
        <HeaderBar/>
        <Grid container  sx={{minWidth: "100%"}}>
          <Grid
            item 
            sx={{
              paddingTop: 1, 
              paddingLeft: 1, 
              paddingBottom: 1, 
              maxWidth: "20%", 
              minWidth: {
                xs: 0, 
                sm: 225
              }, 
              minHeight: `calc(100vh - ${appBarHeight}px)`, 
              maxHeight: `calc(100vh - ${appBarHeight}px)`
            }}
          >
            <LeftNav/>
          </Grid>
          <Grid 
          item
          sx = {{
            paddingLeft: 1,
            paddingRight: 1,
            paddingTop : 1,
          }}
          xs={true}
          >
            <Outlet/>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
