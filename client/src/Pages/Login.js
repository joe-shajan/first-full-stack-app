import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Components/LoginForm.js/LoginForm';


function Login(props) {
  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem("token");
    if(user){
    navigate('/')
    }
  }, []);
  
  return (
   
      <LoginForm user={props.user}/>
   
  );
}

export default Login;
