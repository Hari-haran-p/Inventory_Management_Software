import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../AuthContext";

function TransferEdit({
  data,
  user,
  onClose,
  setMessage,
  setError,
  setIsLoading,
}) {
  const [formData, setFormData] = useState({
    id: "",
    item_type: "",
    item_name: "",
    item_subname: "",
    item_description: "",
    apex_no: "",
    stock_qty: "",
    dept_id: "",
    inventory_value: "",
    required_stock: "",
    to_lab: "",
    manufacturer_id: "",
    supplier_id: "",
  });

  const [selectedLab, setSelectedLab] = useState("");

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const {BackendUrl} = useAuth();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const HandleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const response = await axios.post(
        `${BackendUrl}/api/transferRequest`, { items: formData, user_id: user }
      );
      if (response.status == 200) {
        setMessage(response.data.Data);
        onClose();
        setIsLoading(false);
      }
    } catch (error) {
      if (error) {
        console.log(error);
        setError(error.response.data.Data);
        onClose();
        setIsLoading(false);
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
                  <label for="apex_no" className="text-md pr-5 ">
                    Apex No
                  </label>
                </div>
                <input
                  type="text"
                  name="apex_no"
                  onChange={handleChange}
                  value={formData.apex_no}
                  disabled
                  className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap">
                <div className="  flex ">
                  <label for="item_code" className="text-md pr-5 ">
                    Item Code
                  </label>
                </div>
                <input
                  type="text"
                  name="item_code"
                  disabled
                  onChange={handleChange}
                  value={formData.id}
                  className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap">
                <div className="  flex ">
                  <label for="item_name" className="text-md pr-5 ">
                    Item Name
                  </label>
                </div>
                <input
                  type="text"
                  disabled
                  name="item_name"
                  onChange={handleChange}
                  value={formData.item_name}
                  className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap">
                <div className="  flex ">
                  <label for="item_subname" className="text-md pr-5 ">
                    Item Subname
                  </label>
                </div>
                <input
                  type="text"
                  disabled
                  name="item_subname"
                  onChange={handleChange}
                  value={formData.item_subname}
                  className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap">
                <div className="  flex ">
                  <label for="item_type" className="text-md pr-5 ">
                    Item Type
                  </label>
                </div>
                <input
                  type="text"
                  disabled
                  name="item_type"
                  onChange={handleChange}
                  value={formData.item_type}
                  className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap">
                <div className="  flex ">
                  <label for="item_description" className="text-md pr-5 ">
                    Item Description
                  </label>
                </div>
                <input
                  type="text"
                  disabled
                  name="item_description"
                  onChange={handleChange}
                  value={formData.item_description}
                  className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap">
                <div className="  flex ">
                  <label for="stock_qty" className="text-md pr-5 ">
                    Available Stock Qty
                  </label>
                </div>
                <input
                  type="text"
                  name="stock_qty"
                  disabled
                  onChange={handleChange}
                  value={formData.stock_qty}
                  className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap">
                <div className="  flex ">
                  <label for="inventory_value" className="text-md pr-5 ">
                    Inventory Value
                  </label>
                </div>
                <input
                  type="text"
                  disabled
                  name="inventory_value"
                  onChange={handleChange}
                  value={formData.inventory_value}
                  className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap">
                <div className="  flex ">
                  <label for="dept_id" className="text-md pr-5 ">
                    Lab Code
                  </label>
                </div>
                <input
                  type="text"
                  disabled
                  name="dept_id"
                  onChange={handleChange}
                  value={formData.dept_id}
                  className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap">
                <div className="  flex ">
                  <label for="to_lab" className="text-md pr-5 ">
                    To Lab
                  </label>
                </div>
                <select
                  disabled
                  value={selectedLab}
                  onChange={(e) => {
                    setSelectedLab(e.target.value);
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="to_lab"
                  id="to_lab"
                  required
                  className="text-md px-3 py-2 rounded-lg w-full
    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                >
                  <option value={user.dept_code}>{user.dept_code}</option>
                </select>
              </div>
              <div className="flex flex-wrap">
                <div className="flex">
                  <label for="required_stock" className="text-md pr-5 ">
                    Required Stock
                  </label>
                </div>
                <input
                  type="number"
                  autoComplete="off"
                  name="required_stock"
                  onChange={handleChange}
                  required
                  value={formData.required_stock}
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

export default TransferEdit;
