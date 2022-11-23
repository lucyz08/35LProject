import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getSongs} from './actions/songFetching';
import {getPrompts} from './actions/promptFetching';
import './App.css'

import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Friends from './friends/Friends';
import Profile from './profile/Profile';
import Navbar from './Navbar';
import Footer from './footer';
import Login from './Auth/login';
import Signup from './Auth/signup';
import Logout from './logout/logout';

const App = () => {
  const dispatch = useDispatch();

  const user = localStorage.getItem("token");
  console.log(user)
  useEffect(() => {
      dispatch(getSongs());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPrompts());
}, [dispatch]);

  return (
    <>
    <Navbar/>
    <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Logout />} />

    </Routes>
    </div>
    <Footer/>
   
    </>


    /*
    <>
    <Container maxidth="lg">
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">Arpeggio</Typography>
        <img className="imag1" src={arpeggio} alt="arpeggio" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
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
    </>
    */

  /* bruuuuh
   <>
  <Navbar />
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </div>
</>  */


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