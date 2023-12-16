import { React, useEffect } from "react";
import { useAuth } from "../AuthContext";
import Cookies from "js-cookie";


const Navbar = ({ location, open, setOpen, navItems, user }) => {




  const setNavState = () => {
    setOpen(open);
  };

  const { logout } = useAuth();

  function navUsed() {
    return navItems.some((item) => item.src === location);
  }

  return (
    <>

      {navItems.map(
        (navItem) =>
          navItem.src === location && (
            <div
            key={navItem.id}
              className={`${open ? "w-64" : "w-20"
                } h-full w-1/6 fixed left-0 right-0 navbar duration-300`}
              style={{ backgroundColor: "#0f6af2" }}
            >
              <img
                src="/images/control.png"
                alt=""
                className={`absolute -right-3 phone:hidden lg:block  w-8 border-blue-800 border-2  rounded-full ${!open && "rotate-180"
                  } `}
                style={{ top: "88px" }}
                onClick={() => setOpen(!open)}
              />

              <div className="flex gap-2 items-center ml-2 mt-10 font">
                <img
                  src="/images/bit1.png"
                  alt=""
                  className={`duration-300 w-12  ${open && "rotate-[360deg]"}`}
                />
                <h1
                  className={`ml-2 mb-2.5 text-2xl pt-1 ${!open && "hidden"}`}
                >
                  Stores BIT {navUsed()}
                </h1>
              </div>

              <div className="mt-10 mr-2 h-screen" style={{ fontSize: "21px" }}>
                <ul>
                  {navItems.map((nav) => {
                    if (nav.Name == "Logout") {
                      return (
                        <>
                          <div
                            key={nav.id}
                            className={`flex gap-x-4 mb-4 cursor-pointer ${location.split("/")[1] ===
                              nav.Name.toLocaleLowerCase()
                              ? (nav.color = "bg-white bg-opacity-40")
                              : ""
                              }  rounded-full  ${nav.color
                              } hover:bg-white hover:bg-opacity-40 pl-5 pt-1 pr-2 pb-2`}
                            onClick={logout}
                          >
                            <i
                              className={`bi ${nav.iconName} ${!open && "text-2xl text-center"
                                } duration-300 `}
                            ></i>
                            <button
                              className={` duration-300 ${!open && "hidden"}`}
                            >
                              {nav.Name}
                            </button>
                          </div>
                        </>
                      );
                    } else {
                      return (
                        (!nav.role || user.role == nav.role) &&
                        (<a onClick={setNavState} href={nav.src} key={nav.id}>
                          <li
                            className={`flex gap-x-4 mb-4 cursor-pointer ${location.split("/")[1] ===
                              nav.Name.toLocaleLowerCase()
                              ? (nav.color = "bg-white bg-opacity-40")
                              : ""
                              }  rounded-full  ${nav.color
                              } hover:bg-white hover:bg-opacity-40 pl-5 pt-1 pr-2 pb-2`}
                          >
                            <i
                              className={`bi ${nav.iconName} ${!open && "text-2xl text-center"
                                } duration-300 `}
                            ></i>
                            <span
                              className={` duration-300 ${!open && "hidden"}`}
                            >
                              {nav.Name}
                            </span>
                          </li>
                        </a>)
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          )
      )}
    </>
  );
};

export default Navbar;
