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

  async function getUser() {

    return new Promise(async (resolve, reject) => {
      try {
        const token = Cookies.get("token");
        // console.log(token);
        const result = await axios.post("/api/getUser", {
          token: token,
        }).catch((error) => console.log(error));
        setUser(result.data);
        resolve(result.data);
      } catch (error) {
        setIsLoggedIn(false);
        reject(error);
      }
    })
  }

  async function login(response) {
    try {
      console.log("hiiii.....")
      const result = await axios.post("/api/loginUser", { res: response });
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
    if(window.confirm("Are you sure want to logout ?")){
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
    user
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
