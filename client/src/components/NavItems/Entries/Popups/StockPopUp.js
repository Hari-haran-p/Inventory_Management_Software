import { React, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../AuthContext";

const StockPopUp = ({ setMessage, setError }) => {
  const [data, setData] = useState({
    itemcode: "",
    itemname: "",
    itemsubname: "",
    stock_qty: "",
    manufacturerId: "",
    supplierId: "",
    inventoryValue: "",
    userId: "",
    labCode: "",
    apex_no: "",
    apex_reason: "",
  });

  const { getUser, user } = useAuth();
  const { getRequest } = useAuth();

  const [item, setItem] = useState([]);
  async function fetchItems() {
    const response = await getRequest("http://localhost:4000/api/getItems");
    setItem(response.data);
  }

  const [autoForm, setAutoForm] = useState({});

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const HandleSubmit = async (e) => {
    if (window.confirm("Are you sure want to add stock?")) {
      try {
        e.preventDefault();
        const result = item.filter((items) => {
          if (items.item_code == data.itemcode) return items;
        });
        if (result.length > 0) {
          data.manufacturerId = result[0].manufacturer_id;
          data.supplierId = result[0].supplier_id;
          data.inventoryValue = result[0].cost_per_item * data.stock_qty;
          data.userId = user.user_id;

          console.log("came here", data);
          const response = await axios.post(
            "http://localhost:4000/api/stockAdd",
            { ...data, user_dept_id: user.dept_code }
          );

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
              apex_no: "",
              apex_reason: "",
            });
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
            apex_no: "",
            apex_reason: "",
          });
        }
      } catch (error) {
        console.log(error);
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
            apex_no: "",
            apex_reason: "",
          });
        }
      }
    } else {
      setData({
        itemcode: "",
        stock_qty: "",
        manufacturerId: "",
        supplierId: "",
        inventoryValue: "",
        userId: "",
        labCode: "",
        apex_no: "",
        apex_reason: "",
      });
    }
  };

  const uniqueItemNamesArray = [];
  const uniqueItemNamesSet = new Set();

  item.forEach((item) => {
    const itemName = item.item_name;
    if (!uniqueItemNamesSet.has(itemName)) {
      uniqueItemNamesSet.add(itemName);
      uniqueItemNamesArray.push({ itemname: itemName });
    }
  });

  const [subName, setSubName] = useState(item);

  const handleItemChange = (e) => {
    const result = item.filter((items) => {
      if (items.item_name.toUpperCase() == e.target.value.toUpperCase()) {
        return items;
      }
    });
    setSubName(result);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  function finalClick(e) {
    const code = e.target.value;
    if (!data.itemname) {
      setError("Item name cannot be empty");
      return;
    }
    const result = item.filter((items) => {
      if (
        items.item_name.toUpperCase() == data.itemname.toUpperCase() &&
        items.item_subname.toUpperCase() == code.toUpperCase()
      ) {
        return items;
      }
    });
    setData({ ...data, [e.target.name]: code, itemcode: result[0].item_code });
    setAutoForm(result[0]);
  }

  useEffect(() => {
    fetchItems();
  });

  return (
    <div
    style={{height:"auto"}}
      className="flex w-full justify-center items-center"
    >
      <div
        className="flex h-full justify-center items-center flex-col w-full"
      >
        <div
          style={{ height: "80%",width:"80%" }}
          className="animate1 overflow-x-auto overflow-y-auto flex flex-col items-center justify-center border-gray-700 rounded-lg"
        >
          <div class="py-1 flex pb-2">
            <span class="px-1 text-black font-medium text-2xl whitespace-nowrap">
              Stock Entry
            </span>
          </div>
          <form className="flex gap-10 justify-center items-center flex-wrap" >
            <div className="py-1 flex gap-10 flex-wrap">
              <div className="mt-8">
                <span className="text-lg pb-1 text-gray-600 ">Apex No.</span>
                <input
                  type="text"
                  name="apex_no"
                  value={data.apex_no}
                  onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                  }
                  className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96 border-b-0
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mt-8">
                <span className="text-lg pb-1 text-gray-600 ">Item Name</span>
                <select
                  name="itemname"
                  value={data.itemname}
                  onChange={handleItemChange}
                  className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 h-10 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  required
                  autoComplete="off"
                >
                  <option value="" selected>
                    Select Units
                  </option>
                  {uniqueItemNamesArray.map((item) => {
                    return (
                      <option value={item.itemname} key={item.itemname}>
                        {item.itemname}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="mt-8">
              <span class="px-1 text-lg text-gray-600">Item Sub-Name</span>

              <select
                name="itemsubname"
                value={data.itemsubname}
                onChange={(e) => {
                  finalClick(e);
                }}
                className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 h-10 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                required
                autoComplete="off"
              >
                <option value="" selected>
                  Select Units
                </option>
                {subName.map((item) => {
                  return (
                    <option value={item.item_subname} key={item.item_code}>
                      {item.item_subname}
                    </option>
                  );
                })}
              </select>
            </div>
            <div class="mt-8">
              <span class="text-lg pb-1 text-gray-600 ">Item Name</span>
              <input
                type="text"
                name="subName"
                value={autoForm.item_name}
                className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                required
                disabled
              />
            </div>
            <div class="mt-8">
              <span class="px-1 text-lg text-gray-600">Item Description</span>
              <input
                type="text"
                name="subName"
                value={autoForm.item_description}
                className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                required
                disabled
              />
            </div>
            <div class="mt-8">
              <span class="px-1 text-lg text-gray-600">Item Type</span>
              <input
                type="text"
                name="subName"
                value={autoForm.item_type}
                className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                required
                disabled
              />
            </div>
            <div class="mt-8">
              <span class="px-1 text-lg text-gray-600">Cost Per Item</span>
              <input
                type="text"
                name="subName"
                value={autoForm.cost_per_item}
                className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                required
                disabled
              />
            </div>
            <div class="mt-8">
              <span class="px-1 text-lg text-gray-600">Lab Code</span>
              <input
                type="text"
                name="labCode"
                value={data.labCode}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                required
              />
            </div>
            <div class="mt-8">
              <span class="px-1 text-lg text-gray-600">Stock Quantity</span>
              <input
                type="number"
                name="stock_qty"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                value={data.stock_qty}
                required
                className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div class="mt-8">
              <span class="px-1 text-lg text-gray-600">Apex Reason</span>
              <input
                type="number"
                name="apex_reason"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                value={data.apex_reason}
                required
                className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div class="mt-8">
              <span class="px-1 text-lg text-gray-600">Apex Reason</span>
              <input
                type="number"
                name="apex_reason"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                value={data.apex_reason}
                required
                className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div class="mt-8">
              <span class="px-1 text-lg text-gray-600">Apex Reason</span>
              <input
                type="number"
                name="apex_reason"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                value={data.apex_reason}
                required
                className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div class="mt-8">
              <span class="px-1 text-lg text-gray-600">Apex Reason</span>
              <input
                type="number"
                name="apex_reason"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                value={data.apex_reason}
                required
                className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            
          </form>
          <center>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mb-10 mt-10"
                onClick={HandleSubmit}
              >
                Submit
              </button>
            </center>
        </div>
      </div>
    </div>
  );
};

export default StockPopUp;
