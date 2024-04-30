import { React, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../AuthContext";

const StockPopUp = ({ setMessage, setError, quantityUnits, manufacturer, supplier }) => {

  const [data, setData] = useState({
    apexno: "",
    consumable: "",
    type: "",
    name: "",
    subname: "",
    description: "",
    quantity: "",
    cost: "",
    quantity_units: "",
    faculty_id: "",
    dept_id: "",
    apex_reason: "",
    manufacturerId: "",
    supplierId: ""
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
    console.log("i an called");
    if (window.confirm("Are you sure want to add stock?")) {
      try {
        e.preventDefault();
        data.userId = user.user_id;
        data.dept_id = user.dept_code;
        console.log("came here", data);
        const response = await axios.post(
          "http://localhost:4000/api/stockAdd",
          { ...data, user_dept_id: user.dept_code }
        );

        if (response && response.status == 201) {
          setMessage(response.data.Data);
          setData({
            apexno: "",
            consumable: "",
            type: "",
            name: "",
            subname: "",
            description: "",
            quantity: "",
            cost: "",
            quantity_units: "",
            faculty_id: "",
            dept_id: "",
            apex_reason: "",
            manufacturerId: "",
            supplierId: ""
          });
        }

      } catch (error) {
        console.log(error);
        if (error && error.response.status == 400) {
          setError(error.response.data.Data);
          setData({
            apexno: "",
            consumable: "",
            type: "",
            name: "",
            subname: "",
            description: "",
            quantity: "",
            cost: "",
            quantity_units: "",
            faculty_id: "",
            dept_id: "",
            apex_reason: "",
            manufacturerId: "",
            supplierId: ""
          });
        }
      }
    } else {
      setData({
        apexno: "",
        consumable: "",
        type: "",
        name: "",
        subname: "",
        description: "",
        quantity: "",
        cost: "",
        quantity_units: "",
        faculty_id: "",
        dept_id: "",
        apex_reason: "",
        manufacturerId: "",
        supplierId: ""
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
    <div className="w-full h-3/5 flex flex-col items-center justify-center" >
      <div class="flex mt-5">
        <span class=" text-black font-medium text-2xl whitespace-nowrap">
          Stock Entry
        </span>
      </div>
      <form className="overflow-x-auto overflow-y-auto w-full" onSubmit={HandleSubmit} >
        <div className="flex flex-wrap gap-5 items-center justify-center">
          <div class="w">
            <span class="text-lg pb-1 text-gray-600 ">Apex No</span>
            <input
              type="text"
              name="apexno"
              value={data.apexno}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96 text-gray-500
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
              className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96
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

          <div className="">
            <span class="px-1 text-lg text-gray-600">Item Type</span>
            <select
              name="type"
              value={data.type}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96
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
              className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96 text-gray-500
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
              className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96 text-gray-500
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
              className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              required
            />
          </div>
          <div class="">
            <span class="px-1 text-lg text-gray-600">Quantity</span>
            <input
              type="number"
              name="quantity"
              value={data.quantity}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96 text-gray-500
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
              className="text-md block px-3 py-2 rounded-lg W-52 sm:w-96 text-gray-500
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
              className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 W-52 sm:w-96 h-10 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
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

          <div class="">
            <span class="px-1 text-lg text-gray-600">Manufacturer</span>
            <select
              name="manufacturerId"
              value={data.manufacturerId}
              className="text-md block px-3 py-2 rounded-lg w-full
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
              className="text-md block px-3 py-2 rounded-lg w-full
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
          <div class="">
            <span class="px-1 text-lg text-gray-600">Apex Reason</span>
            <textarea
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
  );
};

export default StockPopUp;
