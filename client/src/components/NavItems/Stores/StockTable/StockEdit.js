import React, { useEffect, useState } from "react";
import axios from "axios";

function StockEdit({ data, onClose, onSubmit, setMessage, setError, setIsLoading, isLoading }) {

  const [formData, setFormData] = useState({
    item_code: "",
    manufacturer_id: "",
    supplier_id: "",
    stock_qty: "",
    created_at: "",
    dept_id: "",
    inventory_value: "",
    user_id: "",
    stock_id: "",
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const HandleSubmit = async (e) => {
    if (window.confirm("Are you sure want to update ?")) {
      setIsLoading(true);
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:4000/api/stockEdit",
          formData
        );

        if (response.status == 201) {
          console.log(response);
          setMessage(response.data.Data);
          onClose();
          setIsLoading(false);
        }
        // setMessage(response.data);
      } catch (error) {
        if(error.response){
          setError(error.response.data.Data);
          onClose();
          setIsLoading(false);
        }
        console.log(error);
      }
    }

  };

  return (
    <>
        <div className="fixed inset-0 z-40 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="flex flex-col">
            <div
              style={{ height: "600px" }}
              className="popup-responsive animate1 bg-white w-full px-14 py-5 overflow-x-auto overflow-y-auto flex flex-col items-center border-gray-700 rounded-lg"
            >
              <button
                className="text-black rounded-full border-black border-2 px-2 text-3xl place-self-end"
                onClick={() => onClose()}
              >
                X
              </button>
              <div class="py-1 flex pb-2">
                <span class="px-1 text-black font-medium text-2xl whitespace-nowrap">
                  Stock Table
                </span>
              </div>
              <form onSubmit={HandleSubmit} className="flex flex-col gap-3">
                <input className="hidden" value={formData.stock_id} />
                <div className="flex flex-wrap">
                  <div className="  flex ">
                    <label for="item_code" className="text-md pr-5 ">Item Code</label>
                  </div>
                  <input

                    type="text"
                    name="item_code"
                    onChange={handleChange}
                    value={formData.item_code}
                    disabled
                    className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />
                </div>
                <div className="flex flex-wrap">
                  <div className="  flex ">
                    <label for="manufacturer_id" className="text-md pr-5 ">Manufacturer Id</label>
                  </div>
                  <input
                    type="text"
                    name="manufacturer_id"
                    onChange={handleChange}
                    value={formData.manufacturer_id}
                    className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />
                </div>
                <div className="flex flex-wrap">
                  <div className="  flex ">
                    <label for="supplier_id" className="text-md pr-5 ">Supplier Id</label>
                  </div>
                  <input
                    type="text"
                    name="supplier_id"
                    onChange={handleChange}
                    value={formData.supplier_id}
                    className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />
                </div>
                <div className="flex flex-wrap">
                  <div className="  flex ">
                    <label for="stock_qty" className="text-md pr-5 ">Stock Qty</label>
                  </div>
                  <input
                    type="text"
                    name="stock_qty"
                    onChange={handleChange}
                    value={formData.stock_qty}
                    className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />
                </div>
                <div className="flex flex-wrap">
                  <div className="  flex ">
                    <label for="created_at" className="text-md pr-5 ">Created At</label>
                  </div>
                  <input
                    type="text"
                    name="created_at"
                    onChange={handleChange}
                    value={formData.created_at}
                    className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />
                </div>
                <div className="flex flex-wrap">
                  <div className="  flex ">
                    <label for="dept_id" className="text-md pr-5 ">Dept Id</label>
                  </div>
                  <input
                    type="text"
                    name="dept_id"
                    onChange={handleChange}
                    value={formData.dept_id}
                    className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />
                </div>
                <div className="flex flex-wrap">
                  <div className="  flex ">
                    <label for="inventory_value" className="text-md pr-5 ">Inventory Value</label>
                  </div>
                  <input
                    type="text"
                    name="inventory_value"
                    onChange={handleChange}
                    value={formData.inventory_value}
                    className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />
                </div>
                <div className="flex flex-wrap">
                  <div className="  flex ">
                    <label for="user_id" className="text-md pr-5 ">User Id</label>
                  </div>
                  <input
                    type="text"
                    name="user_id"
                    onChange={handleChange}
                    value={formData.user_id}
                    className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mt-4"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
}

export default StockEdit;
