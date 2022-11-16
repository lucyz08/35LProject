import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getPosts} from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Forms/songForm.js';
import arpeggio from './images/ArpeggioMain.png';

const App = () => {
  // const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName)
  // }

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getPosts());
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
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form/>
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