import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/userContext";
import AdminHome from "./Pages/AdminHome";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { getUserEmailFromToken } from "./services/auth-services";

function App() {
  // const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)
  useEffect(() => {

    const Email = async () => {
      console.log('dfdsfdsdfdff');
      let email = await getUserEmailFromToken()
      setUser(email)
      // navigate('/')
    }
    Email()


  }, [])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login user={true} />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/home" element={<AdminHome />} />
    </Routes>
  );
}

export default App;

