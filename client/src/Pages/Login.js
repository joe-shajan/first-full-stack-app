import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Components/LoginForm.js/LoginForm';


function Login(props) {
  const navigate = useNavigate()
  useEffect(() => {
    if (props.user) {
      const user = localStorage.getItem("token");
      if (user) {
        navigate('/')
      }
    }else{
      const admin = localStorage.getItem('adminToken')
      if(admin){
        navigate('/admin/home')
      }
    }
  }, []);

  return (

    <LoginForm user={props.user} />

  );
}

export default Login;
