import "./App.css";

import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Vendors from "./components/NavItems/Vendors";
import Entries from "./components/NavItems/Entries/Entries";
import Master from "./components/NavItems/Master";
import Supplier from "./components/NavItems/Supplier";
import { React, useState, useEffect, Suspense } from "react";

import Dashboard from "./components/NavItems/Dashboard/Dashboard";
import Error404 from "./components/ErrorPages/Error404";

import LoginPage from "./components/LoginPage";
// import RegisterPage from "./components/RegisterPage";
// import PrivateRoute from "./PrivateRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "js-cookie";
import Navbar from "./components/Navbar";
import Stores from "./components/NavItems/Stores/Stores";
import Unauthorized from "./components/ErrorPages/Unauthorized";
import Transfer from "./components/NavItems/Transfer/Transfer.js";
import { useAuth } from "./AuthContext";
import Report from "./components/ReportGeneration/Report";
import Excel from "./components/CommonPages/Excel";
import Scrap from "./components/NavItems/Scrap/Scrap";
import { Hover } from "./components/Hover.js";
// import TransferMain from "./components/NavItems/TransferReq/TransferMain.js";



function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (window.innerWidth < 800) {
      setShowNav(false);
    }
    if (!Cookies.get('token')) {
      navigate("/");
    } else {
      getUser().then(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    if (location.pathname == "/") {
      setIsLoading(false);
    }
  })

  const { user, getUser } = useAuth();

  const navItems = [

    { id: 1, Name: "Dashboard", iconName: "bi-speedometer", src: "/dashboard" },
    { id: 2, Name: "Master", iconName: "bi-file-person-fill", src: "/master" },
    { id: 3, Name: "Vendors", iconName: "bi-building", src: "/vendors" },
    { id: 4, Name: "Entries", iconName: "bi-list-check", src: "/entries" },
    { id: 5, Name: "Stores", iconName: "bi-shop", src: "/stores", role: "slsincharge" },
    { id: 6, Name: "Transfer", iconName: "bi-arrow-left-right", src: "/transfer" },
    { id: 7, Name: "Scrap", iconName: "bi-folder-x", src: "/scrap" },
    { id: 8, Name: "Report", iconName: "bi-printer-fill", src: "/report" },
    { id: 9, Name: "Logout", iconName: "bi-box-arrow-right" },

  ];

  function navUsed() {
    return navItems.some((item) => item.src === location.pathname);
  }

  function CheckRole({ element, userRole, allowedRole, redirecTo }) {
    const navigate = useNavigate();
    console.log(userRole, "   ", allowedRole);
    useEffect(() => {
      if (userRole != allowedRole) {
        navigate("/unauthorized")
      }
    }, [allowedRole, userRole])

    return element;
  }
  console.log(user);
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full duration-800 ">
          <span className="loader animate-bounce duration-800"></span>
          Loading
        </div >
      ) : (
        <>
          <div className="relative h-full w-full">
            {showNav &&
              <Navbar
                location={location.pathname}
                navItems={navItems}
                open={open}
                setOpen={setOpen}
                user={user}
              />
            }
            {window.innerWidth < 800 && 
              <div className="absolute top-0 right-0 mr-4 mt-4" onClick={() => {setShowNav((prev) => !prev);}}>
                <i class={`bi ${showNav ?  "bi-x-circle-fill"  : "bi-list"} z-1000`}></i>
              </div>
            }
            <div
              className={`h-screen flex-1 ${navUsed() ? showNav ? (open ? "ml-64" : "ml-20") : "" : ""
                } 
        duration-300`}
            >
              <GoogleOAuthProvider clientId="494572126295-g8ok8a5g0kvr3ceodj12h5orod5oe38v.apps.googleusercontent.com">

                <Routes>
                  <Route
                    path="/*"
                    element={<Error404 />}
                  />
                  <Route
                    path="/"
                    element={<LoginPage />}
                  />
                  <Route
                    path="/dashboard"
                    element={<Dashboard open={open}
                      setOpen={setOpen} />}
                  />
                  {/* <Route path="/registerpage" element={<RegisterPage />} /> */}
                  <Route
                    path="/master"
                    element={<Master />}
                  />
                  <Route
                    path="/report"
                    element={<Report />}
                  />
                  <Route
                    path="/supplier"
                    element={<Supplier />}
                  />
                  <Route
                    path="/vendors"
                    element={<Vendors />}
                  />
                  <Route
                    path="/transfer"
                    element={<Transfer />}
                  />
                  <Route
                    path="/stores"
                    element={
                      <CheckRole
                        element={<Stores />}
                        userRole={user.role}
                        allowedRole={"slsincharge"}
                        redirectTo={"/unauthorized"}
                      />
                    }
                  />
                  <Route
                    path="/scrap"
                    element={<Scrap />}
                  />
                  <Route
                    path="/entries"
                    element={<Entries />}
                  />
                  <Route
                    path="/unauthorized"
                    element={<Unauthorized />}
                  />
                  <Route
                    path="/excel"
                    element={<Excel />}
                  />
                  <Route
                    path="/d"
                    element={<Hover />}
                  />


                </Routes>

              </GoogleOAuthProvider>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
