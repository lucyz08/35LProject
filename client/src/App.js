import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getSongs} from './actions/songFetching';
import {getPrompts} from './actions/promptFetching';
import Songs from './components/Songs/printSongs';
import Prompts from './components/Prompts/printPrompts';
import SongForm from './components/Forms/songForm.js';
import PromptForm from './components/Forms/promptForm.js'
import arpeggio from './images/ArpeggioMain.png';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getSongs());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPrompts());
}, [dispatch]);

  return (
    <Container maxidth="lg">
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">Arpeggio</Typography>
        <img src={arpeggio} alt="arpeggio" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Songs />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Prompts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SongForm/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <PromptForm/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>

/* <>
  <div className="App">
    <h1>Arpeggio</h1>
    {
      currentForm === "login" ?<Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
    }
  </div>

  <Navbar />
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </div>
</> */
  );
};

export default App;