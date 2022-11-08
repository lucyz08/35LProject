import Navbar from "./Navbar"
import Home from "./Home"
import About from "./About"
import Friends from "./Friends"
import Profile from "./Profile"
import { Routes, Route } from "react-router-dom"
import './App.css';
import React, { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }

  return (
  <>
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
  </>
  )
}

export default App;
