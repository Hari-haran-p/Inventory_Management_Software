import { React, useState, useEffect } from "react";
import axios from "axios";

const StockPopUp = ({ isVisible, onClose, user, setMessage, setError, setIsLoading, item }) => {

  const [data, setData] = useState({
    itemcode: "",
    stock_qty: "",
    manufacturerId: "",
    supplierId: "",
    inventoryValue: "",
    userId: "",
    labCode: "",
    apex_no:"",
  });

  const [autoForm, setAutoForm] = useState({});

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const HandleSubmit = async (e) => {
    if (window.confirm("Are you sure want to add stock?")) {
      try {
        setIsLoading(true);
        e.preventDefault();
        const result = item.filter((items) => {
          if (items.item_code == data.itemcode) return items;
        });
        if (result.length > 0) {
          data.manufacturerId = result[0].manufacturer_id;
          data.supplierId = result[0].supplier_id;
          data.inventoryValue = result[0].cost_per_item * data.stock_qty;
          data.userId = user.user_id;
          const response = await axios.post("/api/stockAdd", { ...data, user_dept_id: user.dept_code });
          if (response && response.status == 201) {
            setMessage(response.data.Data);
            setData({
              itemcode: "",
              stock_qty: "",
              manufacturerId: "",
              supplierId: "",
              inventoryValue: "",
              userId: "",
              labCode: "",
              apex_no:"",
            })
            setIsLoading(false);
            onClose();
          }
        } else {
          setError("Enter Valid item name");
          setData({
            itemcode: "",
            stock_qty: "",
            manufacturerId: "",
            supplierId: "",
            inventoryValue: "",
            userId: "",
            labCode: "",
            apex_no:"",
          });
          setIsLoading(false);
          onClose();
        }
      } catch (error) {
        if (error && error.response.status == 400) {
          setError(error.response.data.Data);
          setData({
            itemcode: "",
            stock_qty: "",
            manufacturerId: "",
            supplierId: "",
            inventoryValue: "",
            userId: "",
            labCode: "",
            apex_no:"",
          })
          setIsLoading(false);
          onClose();
        }
      }
    }else {
      setIsLoading(false);
      setData({
        itemcode: "",
        stock_qty: "",
        manufacturerId: "",
        supplierId: "",
        inventoryValue: "",
        userId: "",
        labCode: "",
        apex_no:"",
      })
      onClose();
    }
  };

  const [itemResult, setItemResult] = useState(item);
  const [suggestion, setSuggestion] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleItemChange = (e) => {
    if (e.target.value.trim().length > 0) {
      setSuggestion(true);
      setIsTyping(true);
    } else {
      setIsTyping(false);
      setSuggestion(false);
    }
    setItemResult(
      item.filter((f) => f.item_name.toLowerCase().includes(e.target.value))
    );
    setData({ ...data, [e.target.name]: e.target.value });
  };

  function resultClick(code) {
    setData({ ...data, itemcode: code });
    const result = item.filter((items) => {
      if (items.item_code == code) {
        return items;
      }
    });
    setAutoForm(result[0]);
    setSuggestion(false);
    setIsTyping(false);
  }


  if (!isVisible) return null;

  return (
    <div 
    style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}} 
    className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div
      style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",margin:"15px"}}
       className="flex flex-col">
        <div
          style={{ height: "80%" }}
          className="bg-white w-full px-14 py-5 animate1 overflow-x-auto overflow-y-auto flex flex-col items-center border-gray-700 rounded-lg"
        >
          <button
            className="text-black rounded-full border-black border-2 px-2 text-3xl place-self-end"
            onClick={() => onClose()}
          >
            X
          </button>
          <div class="py-1 flex pb-2">
            <span class="px-1 text-black font-medium text-2xl whitespace-nowrap">
              Stock Entry
            </span>
          </div>
          <form onSubmit={HandleSubmit}>
            <div className="py-1  ">
            <div className="flex flex-wrap mt-8">
                <span className="text-lg pb-1 text-gray-600 ">Apex No.</span>
                <input
                  type="text"
                  name="apex_no"
                  value={data.apex_no}
                  onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                  }
                  className="text-md block px-3 py-2 rounded-lg w-full border-b-0
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-wrap mt-8">
                <span className="text-lg pb-1 text-gray-600 ">Item</span>
                <input
                  type="text"
                  name="itemcode"
                  list="itemcode"
                  value={data.itemcode}
                  onChange={handleItemChange}
                  className="text-md block px-3 py-2 rounded-lg w-full border-b-0
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                {isTyping && suggestion && (
                  <div
                    className="text-md block px-3 py-2 rounded-b-lg w-full border-t-0
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  >
                    {itemResult && itemResult.length > 0 ? (
                      itemResult.slice(0, 4).map((result) => {
                        return (
                          <div
                            key={result.item_code}
                            value={result.item_code}
                            className="hover:bg-sky-100 rounded-lg"
                            onClick={() => resultClick(result.item_code)}
                          >
                            {result.item_code}-{result.item_name}
                          </div>
                        );
                      })) : (
                      <div>No Match</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div class="py-1 flex flex-wrap pb-8">
              <span class="text-lg pb-1 text-gray-600 ">Item Name</span>
              <input
                type="text"
                name="subName"
                value={autoForm.item_name}
                className="text-md block px-3 py-2 rounded-lg w-full text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                required
                disabled
              />
            </div>
            <div class="py-1 flex flex-wrap pb-8">
              <span class="px-1 text-lg text-gray-600">Item Sub-Name</span>
              <input
                type="text"
                name="subName"
                value={autoForm.item_subname}
                className="text-md block px-3 py-2 rounded-lg w-full text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                required
                disabled
              />
            </div>
            <div class="py-1 flex flex-wrap pb-8">
              <span class="px-1 text-lg text-gray-600">Item Description</span>
              <input
                type="text"
                name="subName"
                value={autoForm.item_spec1}
                className="text-md block px-3 py-2 rounded-lg w-full text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                required
                disabled
              />
            </div>
            <div class="py-1 flex flex-wrap pb-8">
              <span class="px-1 text-lg text-gray-600">Item Type</span>
              <input
                type="text"
                name="subName"
                value={autoForm.item_type}
                className="text-md block px-3 py-2 rounded-lg w-full text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                required
                disabled
              />
            </div>
            <div class="py-1 flex flex-wrap pb-8">
              <span class="px-1 text-lg text-gray-600">Cost Per Item</span>
              <input
                type="text"
                name="subName"
                value={autoForm.cost_per_item}
                className="text-md block px-3 py-2 rounded-lg w-full text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                required
                disabled
              />
            </div>
            <div class="py-1 flex flex-wrap pb-8">
              <span class="px-1 text-lg text-gray-600">Lab Code</span>
              <input
                type="text"
                name="labCode"
                value={data.labCode}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                className="text-md block px-3 py-2 rounded-lg w-full text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                required
              />
            </div>
            <div class=" flex flex-wrap mt-2">
              <span class="px-1 text-lg text-gray-600">Stock Quantity</span>
              <input
                type="number"
                name="stock_qty"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                value={data.stock_qty}
                required
                className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <center>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mb-10 mt-10"
                type="submit"
              >
                Submit
              </button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StockPopUp;
