import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const SupplierPopUp = ({ setMessage, setError }) => {
  const [data, setData] = useState({ name: "", address: "", contact: "" });

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value.toUpperCase() });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data != "") {
        const response = await axios.post(
          "http://localhost:4000/api/supplierAdd",
          data
        );
        if (response && response.status == 201) {
          setMessage(response.data.Data); 
        }
        setData({ name: "", address: "", contact: "" });
      }
    } catch (error) {
      if (error && error.response.status == 400) {
        setError(error.response.data.Data);
      }
    }
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="flex w-1/2 justify-center items-center"
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "15px",
        }}
        className="flex flex-col"
      >
        <div
          style={{ height: "80%" }}
          className="bg-white flex flex-col justify-center items-center px-14 py-5 animate1 overflow-x-auto overflow-y-auto border-gray-700 rounded-lg"
        >
          <div className="w-full text-end"></div>
          <div className="flex flex-col justify-center items-center">
            <div class="py-1 flex  pb-5 ">
              <span class="px-1 text-black font-medium text-2xl whitespace-nowrap">
                Supplier Entry
              </span>
            </div>
            <form onChange={handleChange}>
              <div class=" flex flex-wrap mt-8">
                <span class=" text-lg pb-1 text-gray-600 ">Supplier Name</span>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div class=" flex flex-wrap mt-8">
                <span class=" text-lg pb-1 text-gray-600">Address</span>
                <input
                  type="text"
                  name="address"
                  value={data.address}
                  className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div class="flex flex-wrap mt-8">
                <span class=" text-lg pb-1 text-gray-600">Contact</span>
                <input
                  type="number"
                  name="contact"
                  min="10"
                  max="10"
                  value={data.contact}
                  className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <center>
                <button
                  className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mb-10"
                  onClick={HandleSubmit}
                >
                  Submit
                </button>
              </center>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierPopUp;
