import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManufacturerPopUp = ({ isVisible, onClose, setMessage, setError,setIsLoading }) => {

  const [name, setName] = useState(null);


  const handleChange = (e) => {
    setName(e.target.value);
  };

  const HandleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const response = await axios
        .post("http://localhost:4000/api/manufacturerAdd", { name: name.toUpperCase() })
      if (response && response.status == 201){
        console.log(response);
        setMessage(response.data.Data);
        onClose();
        setIsLoading(false);
        setName(null);
      }
    }catch (error) {
      if(error && error.response.status == 400){
        setError(error.response.data.Data);
        onClose();
        setIsLoading(false);
        setName(null);
      }
      console.log(error)
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div
      style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",margin:"15px"}}
      className="flex flex-col ">
        <div className="bg-white px-10 py-5 animate1 overflow-x-auto overflow-y-auto border-gray-700 rounded-lg">
          <div className="w-full text-end">
            <button
              className="text-black rounded-full border-2 border-black px-2 text-3xl"
              onClick={() => onClose()}
            >
              X
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div class="py-1 flex  pb-8 ">
              <span class="px-1 text-black font-medium text-2xl whitespace-nowrap">
                Manufacturer Entry
              </span>
            </div>
            <form>
             
              <div className="">
                <div class="py-1 flex flex-wrap">
                  <span class="px-1 py-1 whitespace-nowrap text-md text-gray-600">
                    Manufacturer Name
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={handleChange}
                    className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />
                </div>
                <center>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-4 px-10 rounded mb-10"
                    onClick={HandleSubmit}
                  >
                    Submit
                  </button>
                </center>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerPopUp;
