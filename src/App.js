import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./pages/Header";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProtectedRoutes from './ProtectedRoutes';
function App() {
  return (
    <div className="App">
      <Home/>
     
    </div>
  );
}

export default App;
