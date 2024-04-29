import React, { useEffect, useState } from "react";
import SupplierImport from "../Imports/SupplierImport";
import SupplierPopUp from "../Popups/SupplierPopUp";

export default function SupplierEntries() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const clearMessage = () => {
    setMessage(null);
    setError(null);
  };

  useEffect(() => {
    setTimeout(clearMessage, 4000);
  }, [message, error]);

  return (
    // <div className="w-full flex h-full">
    //   {message ? (
    //     <div
    //       class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded  fixed z-50 top-0 message"
    //       role="alert"
    //     >
    //       <span class="block sm:inline">{message}</span>
    //     </div>
    //   ) : null}
    //   {error ? (
    //     <div
    //       class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 z-50 message"
    //       role="alert"
    //     >
    //       <span class="block sm:inline">{error}</span>
    //     </div>
    //   ) : null}
    //   <SupplierImport setMessage={setMessage} setError={setError} />
    //   <SupplierPopUp setMessage={setMessage} setError={setError} />
    // </div>
    <>
      <div className="h-full w-full flex  bg-gray-100 flex-col">
        <h1 style={{ fontWeight: "bolder", fontSize: "30px", paddingLeft: "7%" }} class={`text-start pt-4`}>Supplier Entry </h1>
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
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 z-50 "
            role="alert"
          >
            <span class="block sm:inline">{error}</span>
          </div>
        ) : null}
        <div className="bg-gray-100 h-full w-full  px-14 animate1 py-5 flex flex-row-reverse  items-center justify-center rounded-lg">
          <div className=" w-full md:w-1/2 ">
            <div className="bg-white w-full md:w-10/12 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  rounded-2xl ">
              {/* <div className="   rounded-lg"> */}
                {/* <div className="   rounded-lg p-5 flex flex-wrap flex-col justify-center items-start"> */}
                  <SupplierImport setMessage={setMessage} setError={setError} />
                {/* </div> */}
              {/* </div> */}
              <SupplierPopUp setMessage={setMessage} setError={setError} />
            </div>
          </div>
          <div className=" h-full w-1/2 items-center hidden md:flex">
            <div className=" flex flex-col text-2xl font-medium gap-12">
              <span>S</span>
              <span>u</span>
              <span>P</span>
              <span>P</span>
              <span>L</span>
              <span>I</span>
              <span>E</span>
              <span>R</span>
            </div>
            <img src="/images/supplierentry.png" />
          </div>
        </div>
      </div>
    </>
  );
}
