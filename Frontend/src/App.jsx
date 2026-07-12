import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import "./App.css";
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Register from "./pages/Register";
import Home from "./pages/Home";
function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>}/>
    </Routes>
   </Router>
  );
}

export default App;