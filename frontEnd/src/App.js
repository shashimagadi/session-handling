import logo from "./logo.svg";
import "./App.css";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginSignup/LoginForm";
import Home from "./components/Home";
// import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<LoginSignup />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
