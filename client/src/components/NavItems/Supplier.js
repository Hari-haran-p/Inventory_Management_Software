import { React, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

function Supplier() {

  const navigate = useNavigate();
  const {user, getUser} =useAuth();
  
  useEffect(()=>{
    getUser();
  })

  useEffect(()=>{
    if(!Cookies.get("token")){
      navigate("/");
    }else{
      getUser();
    }
  },[Cookies.get("token")])

  return (

    <div>Supplier</div>
  )
}

export default Supplier