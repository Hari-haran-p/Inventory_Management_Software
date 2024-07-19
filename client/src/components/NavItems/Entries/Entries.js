import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import Cookies from "js-cookie";

function Entries() {
  const navigate = useNavigate();

  const { getUser, user } = useAuth();

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    } else {
      getUser();
    }
  }, []);

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const clearMessage = () => {
    setMessage(null);
    setError(null);
  };

  useEffect(() => {
    setTimeout(clearMessage, 6000);
  }, [message, error]);

  return (  
    <>
        <div
          style={{ backgroundColor: "#F4F4F4" }}
          className="flex h-auto justify-center items-center"
        >

          {message ? (
            <div
              class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded  fixed z-50 top-0 message"
              role="alert"
            >
              <span class="block sm:inline">{message}</span>
            </div>
          ) : null}
          {error ? (
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 z-50 message"
              role="alert"
            >
              <span class="block sm:inline">{error}</span>
            </div>
          ) : null}
          <div className="pt-10 pb-10  flex flex-wrap w-full h-auto min-h-screen justify-center items-center gap-10 lg:gap-20">
            {/* <div
              style={{ width: "400px" }}
              className="entry-card shadow-2xl bg-white rounded-3xl text-2xl text-black flex flex-col justify-center p-4 py-10 items-center"
            >
              <img className="w-40" src="/images/manufa.png" alt="" />
              <div className="flex gap-2 flex-col justify-center items-center w-full">
                <div className="text-lg font-bold">Manufacturer Entry</div>
                <div
                  style={{ color: "#5e9ff2" }}
                  className="text-sm break-words py-3"
                >
                  Streamline Manufacturer Data Entry Process.
                </div>
                <div className="button-container flex gap-3 justify-center">
                  <Link
                    to={"/entries/manufacturer"}
                    class="w-11/12 md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  >
                    <span class="mx-auto text-lg">Upload</span>
                  </Link>
                  <Link
                    to={"/entries/manufacturer"}
                    class="w-11/12 md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  >
                    <span class="mx-auto text-lg">Entry</span>
                  </Link>
                </div>
              </div>
            </div> */}
            <div
              style={{ width: "400px" }}
              className="entry-card shadow-2xl bg-white rounded-3xl text-2xl text-black flex flex-col justify-center p-4 py-10 items-center"
            >
              <img className="w-40" src="/images/supplierentry.png" alt="" />
              <div className="flex gap-2 justify-center items-center flex-col w-full">
                <div className="text-lg font-bold">Apex Entry</div>
                <div
                  style={{ color: "#5e9ff2" }}
                  className="text-sm break-words py-3"
                >
                  Efficient Apex Entry Process.
                </div>
                <div className="flex button-container gap-3 items-center justify-center">
                  <Link
                    to={"/entries/apex"}
                    class="w-11/12 md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  >
                    <span class="mx-auto text-lg">Upload</span>
                  </Link>
                  <Link
                    to={"/entries/apex"}
                    class="w-11/12 md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  >
                    <span class="mx-auto text-lg">Entry</span>
                  </Link>
                </div>
              </div>
            </div>
            <div
              style={{ width: "400px" }}
              className="entry-card shadow-2xl bg-white rounded-3xl text-2xl text-black flex flex-col justify-center p-4 py-10 items-center"
            >
              <img className="w-40" src="/images/stockentry.png" alt="" />
              <div className="flex gap-2 justify-center items-center flex-col pl-2 w-full">
                <div className="text-lg font-bold">Stock Entry</div>
                <div
                  style={{ color: "#5e9ff2" }}
                  className="text-sm  break-words py-3"
                >
                  Simplify Stock Data Entry Process.{" "}
                </div>
                <div className="flex button-container gap-3 items-center justify-center duration-100">
                  <Link
                    to={"/entries/stock"}
                    class="w-11/12 md:w-32 bg-white tracking-wide duration-100 text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  >
                    <span class="mx-auto text-lg">Upload</span>
                  </Link>
                  <Link
                    to={"/entries/stock"}
                    class=" w-11/12 md:w-32 bg-white tracking-wide duration-100 text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  >
                    <span class="mx-auto text-lg">Entry</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Entries;
