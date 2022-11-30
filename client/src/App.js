import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getSongs} from './actions/songFetching';
import {getPrompts} from './actions/promptFetching';
import {setUserData} from './actions/userFetching';
import './App.css'

import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Friends from './friends/Friends';
import Profile from './profile/Profile';
import Navbar from './Navbar';
import Footer from './footer';
import Login from './components/Auth/signin';
import SignUp from './components/Auth/signup';
import Welcome from './welcome/welcome';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getSongs());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPrompts());
}, [dispatch]);
useEffect(() => {
  dispatch(setUserData());
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
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/welcome" element={<Welcome /> } />

    </Routes>
    </div>
    <Footer/>
   
    </>
  );
};

export default App;