import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Route, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to not logged in
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const BackendUrl ="http://localhost:4000";

  async function getUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const token = Cookies.get('token');
        // console.log(token);
        const result = await axios.post(`${BackendUrl}/api/getUser`, {
          token: token,
        }).catch((error) => console.log(error));
        setUser(result.data);
        resolve(result.data);
      } catch (error) {
        Cookies.remove('token');
        navigate('/');
        reject(error);
      }
    })
  }
  async function handleAdminLogin(formData, setFormData, e) {
    e.preventDefault();
    try {
      console.log("hiiii.....")
      const result = await axios.post(`${BackendUrl}/api/credentiallogin` ,formData);
      Cookies.set("token", result.data)
      setIsLoggedIn(true)
      await getUser();
      await setFormData({ username: "", password: "" });
      navigate("/dashboard");
    } catch (error) {
      if (error && error.response.status == 401 || error.response.status == 400) {
        navigate("/unauthorized")
      }
      console.log(error)
      return;
    }
  }


  async function getRequest(url) {
    try {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/');
      }
      const response = await axios.get(url, { headers: { "Authorization": token } });
      if (response.length == 0) {
        Cookies.remove('token');
        navigate('/');
      }
      return response
    } catch (error) {
      console.log(error);
      Cookies.remove('token');
      navigate('/');
    }
  }

  async function login(response) {
    try {
      console.log("hiiii.....")
      const result = await axios.post(`${BackendUrl}/api/loginUser`, { res: response });
      Cookies.set("token", result.data)
      setIsLoggedIn(true)
      await getUser();
      navigate("/dashboard");
    } catch (error) {
      if (error && error.response.status == 401 || error.response.status == 400) {
        navigate("/unauthorized")
      }
      console.log(error)
      return;
    }

  }

  function logout() {
    if (window.confirm("Are you sure want to logout ?")) {
      setIsLoggedIn(false);
      setUser([]);
      try {
        Cookies.remove("token");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };


  const value = {
    isLoggedIn,
    login,
    logout,
    getUser,
    user,
    getRequest,
    handleAdminLogin,
    BackendUrl,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function CheckRole({ path, element, userRole, allowedRole, redirecTo }) {
  const navigate = useNavigate();
  if (userRole == allowedRole) {
    return <Route path={path} element={element} />
  } else {
    navigate(redirecTo);
    return null;
  }
}
