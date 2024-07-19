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
          "/api/supplierAdd",
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
    <div className="md:px-16  w-full" >
        <div className="bg-white py-5 border-gray-700 rounded-lg w-full" >
              <span class="px-1 text-black font-medium text-2xl whitespace-nowrap">
                Supplier Entry
              </span>
            <form  onChange={handleChange}>
              <div class="mt-8">
                <span class=" text-lg pb-1 text-gray-600 ">Supplier Name</span>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  className="text-md block px-3 py-2 rounded-lg w-72 md:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div class="mt-8">
                <span class=" text-lg pb-1 text-gray-600">Address</span>
                <input
                  type="text"
                  name="address"
                  value={data.address}
                  className="text-md block px-3 py-2 rounded-lg w-72 md:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div class="mt-8">
                <span class=" text-lg pb-1 text-gray-600">Contact</span>
                <input
                  type="number"
                  name="contact"
                  min="10"
                  max="10"
                  value={data.contact}
                  className="text-md block px-3 py-2 rounded-lg w-72 md:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
                <button
                  className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
                  onClick={HandleSubmit}
                >
                  Submit
                </button>
            </form>
          </div>
    </div>
  );
};

export default SupplierPopUp;
