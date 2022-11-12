import Navbar from "./Navbar"
import Home from "./Home"
import About from "./about/About"
import Friends from "./Friends"
import Profile from "./Profile"
import Auth from "./Auth"
import { Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import ProtectedRoutes from "./ProtectedRoutes"


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
        <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  </>
  )
}

export default App;
