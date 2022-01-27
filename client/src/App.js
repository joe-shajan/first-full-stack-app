import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login user={true}/>} />
      <Route path="/admin/login" element={<Login/>} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
