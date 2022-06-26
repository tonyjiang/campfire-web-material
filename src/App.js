import './App.css'
import Grid from '@mui/material/Grid'

function App() {
  return (
    <Grid container direction='column' className='App-container'>
      <Grid container item className='App-header' xs={2} md={2}>
        <Grid item className='upper-left' xs={3.5}>App Icon & Search Box</Grid>
        <Grid item xs={5}>Icon Links to Main Components</Grid>
        <Grid item xs={3.5}>Profile Icon & Notification Icon & Grid Icon</Grid>
      </Grid>
      <Grid container item className='App-body' xs={10} md={10}>
        <Grid item xs={2} lg={3.5}>Left Nav</Grid>
        <Grid item xs={8} lg={5}>Feed</Grid>
        <Grid item xs={2} lg={3.5}>What's Happening</Grid>
      </Grid>
    </Grid>
  );
}

export default App;
