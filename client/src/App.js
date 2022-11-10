import Navbar from "./Navbar"
import Home from "./Home"
import About from "./About"
import Friends from "./Friends"
import Profile from "./Profile"
import Auth from "./Auth"
import { Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';


function App() {

  return (
  <>
    {/* <div className="App">
      <h1></h1>
      {
      }
    </div> */}

    <Navbar />
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </div>
  </>
  )
}

export default App;
