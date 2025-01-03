import { React, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../AuthContext";
import { Link } from "react-router-dom";

const StockPopUp = ({ setMessage, setError, quantityUnits, manufacturer, supplier }) => {

  const formdata = {
    apexno: "",
    consumable: "",
    type: "",
    name: "",
    subname: "",
    description: "",
    quantity: "",
    cost: "",
    quantity_units: "",
    dept_id: "",
    apex_reason: "",
    manufacturerId: "",
    supplierId: ""
  }

  const [data, setData] = useState(formdata);

  const { user, getRequest, BackendUrl } = useAuth();

  const [item, setItem] = useState([]);
  async function fetchItems() {
    const response = await getRequest(`${BackendUrl}/api/getItems`);
    setItem(response.data);
  }

  const HandleSubmit = async (e) => {
    console.log("i amm called");
    if (window.confirm("Are you sure want to add stock ?")) {
      try {
        e.preventDefault();
        data.userId = user.user_id;
        data.dept_id = user.dept_code;
        console.log("came here", data);
        const response = await axios.post(
          `${BackendUrl}/api/stockAdd`,
          { ...data, user_dept_id: user.dept_code }
        );

        if (response && response.status == 201) {
          setMessage(response.data.Data);
          setData(formdata);
        }

      } catch (error) {
        console.log(error);
        if (error && error.response.status == 400) {
          setError(error.response.data.Data);
          setData(formdata);
        }
      }
    } else {
      setData(formdata);
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

  useEffect(() => {
    fetchItems();
  });

  return (
    <div className="flex flex-col " >
      <form className="w-full" onSubmit={HandleSubmit} >
        <div className="text-lg font-semibold pb-1 text-gray-600 pt-5">Basic details:</div>
        <hr />
        <div className="flex flex-wrap gap-5 px-5 pt-3 w-full">
          <div class="">
            <span class="text-lg pb-1 text-gray-600 ">Apex No</span>
            <input
              type="text"
              name="apexno"
              autoComplete="off"
              value={data.apexno}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              required
            />
          </div>
          <div className="">
            <span class="px-1 text-lg text-gray-600">Consumable</span>
            <select
              name="consumable"
              value={data.consumable}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 h-10 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              required
              autoComplete="off"
            >
              <option value="" selected>
                Select Yes/No
              </option>
              <option value="YES">Yes</option>
              <option value="NO">No</option>
            </select>
          </div>
        </div>
        <div className="text-lg font-semibold pb-1 text-gray-600 pt-5" >Item details:</div>
        <hr />
        <div className="flex flex-wrap gap-5 px-5 pt-3">
          <div className="">
            <span class="px-1 text-lg text-gray-600">Item Type</span>
            <select
              name="type"
              value={data.type}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 h-10 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              required
              autoComplete="off"
            >
              <option value="" selected>
                Select Item Type
              </option>
              <option value="Electronics">Electronics</option>
              <option value="Electricals - Hardware">
                Electricals - Hardware
              </option>
              <option value="Electricals - Batteries">
                Electricals - Batteries
              </option>
              <option value="UAV products">UAV products</option>
              <option value="3D Filament">3D Filament</option>
              <option value="Plumping - Hardware">
                Plumping - Hardware
              </option>
              <option value="MS/AL Pipes & sheets - Hardware">
                MS/AL Pipes & sheets - Hardware
              </option>
              <option value="Mechanical consumables/accessories">
                Mechanical consumables/accessories
              </option>
              <option value="Acrylic">Acrylic</option>
            </select>
          </div>
          <div class="">
            <span class="text-lg pb-1 text-gray-600 ">Item Name</span>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              required
              autoComplete="off"
            />
          </div>
          <div class="">
            <span class="px-1 text-lg text-gray-600">Item Subname</span>
            <input
              type="text"
              name="subname"
              value={data.subname}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              required
              autoComplete="off"
            />
          </div>
          <div class="">
            <span class="px-1 text-lg text-gray-600">Item Description</span>
            <input
              type="text"
              name="description"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="text-lg font-semibold pb-1 text-gray-600 pt-5" >Price details:</div>
        <hr />
        <div className="flex flex-wrap gap-5 px-5 pt-3">
          <div class="">
            <span class="px-1 text-lg text-gray-600">Quantity</span>
            <input
              type="number"
              name="quantity"
              value={data.quantity}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              required
            />
          </div>
          <div class="">
            <span class="px-1 text-lg text-gray-600">Cost</span>
            <input
              type="number"
              name="cost"
              value={data.cost}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              required
            />
          </div>
          <div class="">
            <span class="px-1 text-lg text-gray-600">Quantity Units</span>
            <select
              name="quantity_units"
              value={data.quantity_units}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 h-10 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              required
              autoComplete="off"
            >
              <option value="" selected>
                Select Units
              </option>
              {quantityUnits.map((unit) => {
                return <option value={unit.name} key={unit.id}>{unit.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="text-lg font-semibold pb-1 text-gray-600 pt-5" >Vendor details:</div>
        <hr />
        <div className="flex flex-wrap gap-5 px-5 pt-3">
          <div class="">
            <span class="px-1 text-lg text-gray-600">Manufacturer</span>
            <select
              name="manufacturerId"
              value={data.manufacturerId}
              className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 h-10 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              required
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              autoComplete="off"
            >
              <option value="" selected>
                Select Units
              </option>
              {manufacturer.map((item) => {
                return <option value={item.id} key={item.id} >{item.name}</option>;
              })}
            </select>
          </div>
          <div class="">
            <span class="px-1 text-lg text-gray-600">Supplier</span>
            <select
              name="supplierId"
              value={data.supplierId}
              className="text-md block px-3 py-2 rounded-lg  w-72 sm:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 h-10 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              required
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              autoComplete="off"
            >
              <option value="" selected>
                Select Units
              </option>
              {supplier.map((item) => {
                return <option value={item.id} key={item.id} >{item.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="px-5 pt-3">
          <Link to="/entries/manufacturer" className="text-blue-700 underline">Manufacturer not listed ?? click here to add.</Link>
        </div>
        <div className="px-5 pt-3">
          <Link to="/entries/supplier" className="text-blue-700 underline">Supplier not listed ?? click here to add.</Link>
        </div>
        <div className="text-lg font-semibold pb-1 text-gray-600 pt-5">Reason:</div>
        <hr />
        <div className="flex flex-wrap w-full px-5 pt-3">
          <div class="w-full">
            <span class="px-1 text-lg text-gray-600">Apex Reason</span>
            <textarea
              type="number"
              name="apex_reason"
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              value={data.apex_reason}
              required
              className="text-md block px-3 py-2 rounded-lg w-72 lg:w-11/12
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
            />
          </div>
          {/* </div> */}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mb-10 mt-10"
          type="submit"
        >
          Submit
        </button>
      </form>

    </div>
  );
};

export default StockPopUp;
