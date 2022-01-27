import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../Components/SignupForm/SignupForm';

function Signup() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      navigate('/')
    }
  }, []);
  return <>
    <SignupForm />
  </>
}

export default Signup;
