import Navbar from "./Navbar"
import Home from "./Home"
import About from "./About"
import Friends from "./Friends"
import Profile from "./Profile"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
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
  </>
  )
}

export default App;
