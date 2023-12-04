import React, { useEffect, useState } from "react";
import axios from "axios";

function ItemEdit({ data, onClose , onSubmit, setMessage, setError}) {

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    item_code: "",
    item_type: "",
    item_name: "",
    item_subname: "",
    item_description: "",
    manufacturer_id: "",
    quantity_units: "",
    supplier_id: "",
    cost_per_item: "",
  });


  useEffect(() => {
    if (data) {
      setFormData(data);
    }
    // onSubmit();
  }, [data]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const HandleSubmit = async (e) => {
  if(window.confirm("Are you sure want to update ?")){
  setIsLoading(true);
  e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/itemEdit", formData);
        console.log(response);
      if( response && response.status==201){
        setMessage(response.data.Data)
        onClose();
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.response.data.Data);
      onClose();
    }
  }else{
    onClose();
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
              Item Table
            </span>
          </div>
          <form onSubmit={HandleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-wrap">
          <div className="flex">
          <label  for="item_code" className="text-md pr-5 ">Item Code</label>
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
          <div className="flex ">
          <label  for="item_type" className="text-md pr-5 ">Item Type</label>
          </div>
          <input
            type="text"
            name="item_type"
            onChange={handleChange}
            value={formData.item_type}
            className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
          />
          </div>
          <div className="flex flex-wrap ">
          <div className="flex ">
          <label  for="item_name" className="text-md pr-4 ">Item Name</label>
          </div>
          <input
            type="text"
            name="item_name"
            onChange={handleChange}
            value={formData.item_name}
            className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
          />
          </div>
          <div className="flex flex-wrap">
          <div className="flex ">
          <label  for="item_subname" className="text-md mr-4 ">Item Subname</label>
          </div>
          <input
            type="text"
            name="item_subname"
            onChange={handleChange}
            value={formData.item_subname}
            className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
          />
          </div>
          <div className="flex flex-wrap">
          <div className="flex ">
          <label  for="item_description" className="text-md pr-5 ">Item Description</label>
          </div>
          <input
            type="text"
            name="item_description"
            onChange={handleChange}
            value={formData.item_description}
            className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
          />
          </div>
          <div className="flex flex-wrap ">
          <div className="flex ">
          <label  for="manufacturer_id" className="text-md pr-5 ">Manufacturer Id</label>
          </div>
          <input
            type="text"
            name="manufacturer_id"
            disabled
            onChange={handleChange}
            value={formData.manufacturer_id}
            className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
          />
          </div>
          <div className="flex flex-wrap">
          <div className="flex ">
          <label  for="quantity_units" className="text-md pr-5 ">Quantity Units</label>
          </div>
          <input
            type="text"
            name="quantity_units"
            onChange={handleChange}
            value={formData.quantity_units}
            className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
          />
          </div>
          <div className="flex flex-wrap">
          <div className="flex ">
          <label  for="supplier_id" className="text-md pr-5 ">Supplier Id</label>
          </div>
          <input
            type="text"
            disabled
            name="supplier_id"
            onChange={handleChange}
            value={formData.supplier_id}
            className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
          />
          </div>
          <div className="flex flex-wrap">
          <div className="flex ">
          <label  for="cost_per_item" className="text-md pr-5 ">Cost Per Item</label>
          </div>
          <input
            type="text"
            name="cost_per_item"
            onChange={handleChange}
            value={formData.cost_per_item}
            className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
          />
          </div>
          <div className="flex justify-center ">
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

export default ItemEdit;
