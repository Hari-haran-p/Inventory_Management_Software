import { React, useEffect } from "react";
import { useAuth } from "../AuthContext";
import Cookies from "js-cookie";


const Navbar = ({ location, open, setOpen, user, loc }) => {

  const setNavState = () => {
    setOpen(open);
  };

  const { logout } = useAuth();

  if (!loc.includes(location.split("/")[1]))
    return null

  return (
    <>
      <div
        key={45}
        className={`${open ? "w-64" : "w-20"
          } h-full w-1/6 fixed left-0 right-0 z-50 navbar duration-300`}
        style={{ backgroundColor: "#0f6af2" }}
      >
        <img
          src="/images/control.png"
          alt=""
          className={`absolute -right-3 phone:hidden lg:block  w-8 border-blue-800 border-2  rounded-full ${!open && "rotate-180"
            } `}
          style={{ top: "88px" }}
          onClick={() => setOpen(!open)}
          title={`${open ? "Close" : "Open"} `}
        />

        <div className="flex gap-2 items-center ml-2 mt-10 font">
          <img
            title="Stores BIT"
            src="/images/bit1.png"
            alt=""
            className={`duration-300 w-12  ${open && "rotate-[360deg]"}`}
          />
          <h1
            className={`ml-2 mb-2.5 text-2xl pt-1 ${!open && "hidden"}`}
          >
            Stores BIT
          </h1>
        </div>

        <div className="mt-10 mr-2 h-screen" style={{ fontSize: "21px" }}>
          <ul>
            <li title="Dashboard">
              <a onClick={setNavState} href="/dashboard" key="1">
                <li
                  className={`flex gap-x-4 mb-4 cursor-pointer ${location.split("/")[1] === "Dashboard".toLocaleLowerCase() ? "bg-white bg-opacity-40" : ""}  rounded-full hover:bg-white hover:bg-opacity-40 pl-5 pt-1 pr-2 pb-2`}
                >
                  <i
                    className={`bi bi-speedometer ${!open && "text-2xl text-center"
                      } duration-300 `}
                  ></i>
                  <span
                    className={` duration-300 ${!open && "hidden"}`}
                  >
                    Dashboard
                  </span>
                </li>
              </a>
            </li>
            <li title="Master">
              <a onClick={setNavState} href="/master" key="2">
                <li
                  className={`flex gap-x-4 mb-4 cursor-pointer ${location.split("/")[1] === "Master".toLocaleLowerCase() ? "bg-white bg-opacity-40" : ""}  rounded-full hover:bg-white hover:bg-opacity-40 pl-5 pt-1 pr-2 pb-2`}
                >
                  <i
                    className={`bi bi-file-person-fill ${!open && "text-2xl text-center"
                      } duration-300 `}
                  ></i>
                  <span
                    className={` duration-300 ${!open && "hidden"}`}
                  >
                    Master
                  </span>
                </li>
              </a>
            </li>
            <li title="Vendors">
              <a onClick={setNavState} href="/vendors" key="2">
                <li
                  className={`flex gap-x-4 mb-4 cursor-pointer ${location.split("/")[1] === "Vendors".toLocaleLowerCase() ? "bg-white bg-opacity-40" : ""}  rounded-full hover:bg-white hover:bg-opacity-40 pl-5 pt-1 pr-2 pb-2`}
                >
                  <i
                    className={`bi bi-building ${!open && "text-2xl text-center"
                      } duration-300 `}
                  ></i>
                  <span
                    className={` duration-300 ${!open && "hidden"}`}
                  >
                    Vendors
                  </span>
                </li>
              </a>
            </li>
            <li title="Entries">
              <a onClick={setNavState} href="/entries" key="2">
                <li
                  className={`flex gap-x-4 mb-4 cursor-pointer ${location.split("/")[1] === "entries".toLocaleLowerCase() ? "bg-white bg-opacity-40" : ""}  rounded-full hover:bg-white hover:bg-opacity-40 pl-5 pt-1 pr-2 pb-2`}
                >
                  <i
                    className={`bi bi-list-check ${!open && "text-2xl text-center"
                      } duration-300 `}
                  ></i>
                  <span
                    className={` duration-300 ${!open && "hidden"}`}
                  >
                    Entries
                  </span>
                </li>
              </a>
            </li>
            {user.role == "slsincharge" &&
              <li title="Stores">
                <a onClick={setNavState} href="/stores" key="2">
                  <li
                    className={`flex gap-x-4 mb-4 cursor-pointer ${location.split("/")[1] === "stores".toLocaleLowerCase() ? "bg-white bg-opacity-40" : ""}  rounded-full hover:bg-white hover:bg-opacity-40 pl-5 pt-1 pr-2 pb-2`}
                  >
                    <i
                      className={`bi bi-shop ${!open && "text-2xl text-center"
                        } duration-300 `}
                    ></i>
                    <span
                      className={` duration-300 ${!open && "hidden"}`}
                    >
                      Stores
                    </span>
                  </li>
                </a>
              </li>
            }
            <li title="Apex">
              <a onClick={setNavState} href="/apex" key="8">
                <li
                  className={`flex gap-x-4 mb-4 cursor-pointer ${location.split("/")[1] === "apex".toLocaleLowerCase() ? "bg-white bg-opacity-40" : ""}  rounded-full hover:bg-white hover:bg-opacity-40 pl-5 pt-1 pr-2 pb-2`}
                >
                  <i
                    className={`bi bi-receipt-cutoff ${!open && "text-2xl text-center"
                      } duration-300 `}
                  ></i>
                  <span
                    className={` duration-300 ${!open && "hidden"}`}
                  >
                    Apex
                  </span>
                </li>
              </a>
            </li>
            <li title="Transfer">
              <a onClick={setNavState} href="/transfer" key="2">
                <li
                  className={`flex gap-x-4 mb-4 cursor-pointer ${location.split("/")[1] === "transfer".toLocaleLowerCase() ? "bg-white bg-opacity-40" : ""}  rounded-full hover:bg-white hover:bg-opacity-40 pl-5 pt-1 pr-2 pb-2`}
                >
                  <i
                    className={`bi bi-arrow-left-right ${!open && "text-2xl text-center"
                      } duration-300 `}
                  ></i>
                  <span
                    className={` duration-300 ${!open && "hidden"}`}
                  >
                    Transfer
                  </span>
                </li>
              </a>
            </li>
            <li title="Scrap">
              <a onClick={setNavState} href="/scrap" key="2">
                <li
                  className={`flex gap-x-4 mb-4 cursor-pointer ${location.split("/")[1] === "scrap".toLocaleLowerCase() ? "bg-white bg-opacity-40" : ""}  rounded-full hover:bg-white hover:bg-opacity-40 pl-5 pt-1 pr-2 pb-2`}
                >
                  <i
                    className={`bi bi-folder-x ${!open && "text-2xl text-center"
                      } duration-300 `}
                  ></i>
                  <span
                    className={` duration-300 ${!open && "hidden"}`}
                  >
                    Scrap
                  </span>
                </li>
              </a>
            </li>
            <li title="Consume">
              <a onClick={setNavState} href="/consume" key="2">
                <li
                  className={`flex gap-x-4 mb-4 cursor-pointer ${location.split("/")[1] === "consume".toLocaleLowerCase() ? "bg-white bg-opacity-40" : ""}  rounded-full hover:bg-white hover:bg-opacity-40 pl-5 pt-1 pr-2 pb-2`}
                >
                  <i
                    className={`bi bi-folder-minus ${!open && "text-2xl text-center"
                      } duration-300 `}
                  ></i>
                  <span
                    className={` duration-300 ${!open && "hidden"}`}
                  >
                    Consume
                  </span>
                </li>
              </a>
            </li>
            <li title="Logout">
              <div
                key="10"
                className={`flex gap-x-4 mb-4 cursor-pointer ${location.split("/")[1] === "logout".toLocaleLowerCase() ? "bg-white bg-opacity-40" : ""}  rounded-full hover:bg-white hover:bg-opacity-40 pl-5 pt-1 pr-2 pb-2`}
                onClick={logout}
              >
                <i
                  className={`bi bi-box-arrow-right ${!open && "text-2xl text-center"
                    } duration-300 `}
                ></i>
                <button
                  className={` duration-300 ${!open && "hidden"}`}
                >
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
