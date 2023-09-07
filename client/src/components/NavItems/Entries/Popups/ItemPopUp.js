import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ItemPopUp = ({ isVisible, onClose }) => {


  const [message, setMessage] = useState(null)
  //<-------------Assigning state requird state variables --------->

  const [data, setData] = useState({
    itemType: "",
    manufacturerName: "",
    supplierName: "",
    itemName: "",
    subName: "",
    desc: "",
    cost: "",
    units: "",
  });

  const navigate = useNavigate();
  const [manufacturer, setManufacturer] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [quantityUnits, setQuantityUnits] = useState([]);
  const [msuggestion, setMSuggestion] = useState(false);
  const [isMTyping, setIsMTyping] = useState(false);
  const [ssuggestion, setSSuggestion] = useState(false);
  const [isSTyping, setIsSTyping] = useState(false);

  //<----------End of assigning state variables ------------>

  //<--------Fetching datas required for form input--------->

  async function fetchManufacturer() {
    const response = await axios.get("http://localhost:4000/api/getManufacturer");
    setManufacturer(response.data);
  }
  async function fetchSupplier() {
    const response = await axios.get("http://localhost:4000/api/getSupplier");
    setSupplier(response.data);
  }
  async function fetchQuantityUnits() {
    const response = await axios.get("http://localhost:4000/api/getQuantityUnits");
    setQuantityUnits(response.data);
  }

  useEffect(() => {
    fetchManufacturer();
    fetchSupplier();
    fetchQuantityUnits();
  }, []);

  //<----------End of Fetch data for forms ------------->



  //<--------Functions to show suggestion for manufacturer in form -------------->

  const [manufacturerResult, setManufacturerResult] = useState(manufacturer);

  const handleManufacturerChange = (e) => {
    if (e.target.value.trim().length > 0) {
      setMSuggestion(true);
      setIsMTyping(true);
    } else {
      setIsMTyping(false);
      setMSuggestion(false);
    }

    setManufacturerResult(
      manufacturer.filter((f) => f.name.toLowerCase().includes(e.target.value))
    );
    // console.log(manufacturerResult)
    setData({ ...data, [e.target.name]: e.target.value });
  };

  function manuResultClick(code) {
    setData({ ...data, manufacturerName: code });
    const result = manufacturer.filter((manu) => {
      if (manu.id == code) {
        return manu;
      }
    });
    // setAutoForm(result[0]);
    setMSuggestion(false);
    setIsMTyping(false);
  }

  //<--------End of Functions to show suggestion for Manufacturer in form -------------->

  //<--------Functions to show suggestion for Supplier in form ------------>

  const [supplierResult, setSupplierResult] = useState(manufacturer);

  const handleSupplierChange = (e) => {
    if (e.target.value.trim().length > 0) {
      setSSuggestion(true);
      setIsSTyping(true);
    } else {
      setIsSTyping(false);
      setSSuggestion(false);
    }
    setSupplierResult(
      supplier.filter((f) => f.name.toLowerCase().includes(e.target.value))
    );
    // console.log(manufacturerResult)
    setData({ ...data, [e.target.name]: e.target.value });
  };

  function supplierResultClick(code) {
    setData({ ...data, supplierName: code });
    const result = supplier.filter((supp) => {
      if (supp.id == code) {
        return supp;
      }
    });
    // setAutoForm(result[0]);
    setSSuggestion(false);
    setIsSTyping(false);
  }

  //<--------End of fdtunctions to show suggestion for Supplier in form -------------->

  //<--------Form handling --------------->

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [error, setError] = useState(true);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios
      .post("http://localhost:4000/api/itemadd", data)
      .catch((error) => console.log(error))
      .then((response) => setMessage(response.data));
    window.scrollTo({ top: 0 });
    // setData({
    //   itemType: "",
    //   manufacturerName: "",
    //   supplierName: "",
    //   itemName: "",
    //   subName: "",
    //   Spec1: "",
    //   Spec2: "",
    //   Spec3: "NIL",
    //   cost: "",
    //   units: "",
    // });
  };
  // console.log(supplier)
  //<----------End of form handling----------->

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col">
        <div
          style={{ height: "600px" }}
          className="popup-responsive bg-white w-full px-14 py-5 overflow-x-auto overflow-y-auto flex flex-col items-center border-gray-700 rounded-lg"
        >
          <button
            className="text-black rounded-full border-black border-2 px-2 text-3xl place-self-end"
            onClick={() => onClose()}
          > 
            X
          </button>
          <div className="flex flex-col justify-center items-center">
            <div className="py-1 flex pb-2">
              <span className="px-1 text-black font-medium text-2xl whitespace-nowrap">
                Item Entry
              </span>
            </div>
            {manufacturer && supplier && (

              <form onChange={handleChange}>
                {message ? <div className="absolute">{message}</div> : null}
                <div className="py-1 flex flex-wrap">
                  <span className="px-1 text-lg text-gray-600">Item Type</span>
                  <select
                    id="itemType"
                    name="itemType"
                    value={data.itemType}
                    className="text-md block px-3 py-2 rounded-lg w-full
              bg-white border-2 h-10 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    required
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
                <div className="py-1 ">
                  <div className="flex flex-wrap mt-8 ">
                    <span className="px-1 text-lg text-gray-600">
                      Manufacturer Name
                    </span>
                    <input
                      type="text"
                      name="manufacturerName"
                      value={data.manufacturerName}
                      list="manufacturers"
                      className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      required
                      onChange={handleManufacturerChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex flex-wrap">
                    {isMTyping && msuggestion && (
                      <div
                        className="text-md block px-3 py-2 rounded-b-lg w-full border-t-0
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      >
                        {manufacturerResult &&
                          manufacturerResult.slice(0, 4).map((result) => {
                            return (
                              <div
                                key={result.id}
                                value={result.id}
                                className="hover:bg-sky-100 rounded-lg"
                                onClick={() => manuResultClick(result.id)}
                              >
                                {result.id}-{result.name}
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                </div>
                <div className="py-1">
                  <div className="flex flex-wrap mt-8">
                    <span className="px-1 text-lg text-gray-600">
                      Supplier Name
                    </span>
                    <input
                      type="text"
                      name="supplierName"
                      value={data.supplierName}
                      list="supplier"
                      className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      required
                      onChange={handleSupplierChange}
                    />
                  </div>
                  <div className="flex flex-wrap ">
                    {isSTyping && ssuggestion && (
                      <div
                        className="text-md block px-3 py-2 rounded-b-lg w-full border-t-0
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      >
                        {supplierResult &&
                          supplierResult.slice(0, 4).map((result) => {
                            return (
                              <div
                                key={result.id}
                                value={result.id}
                                className="hover:bg-sky-100 rounded-lg"
                                onClick={() => supplierResultClick(result.id)}
                              >
                                {result.id}-{result.name}
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                </div>
                <div class="flex flex-wrap mt-8">
                  <span className="px-1 text-lg text-gray-600">Item Name</span>
                  <input
                    type="text"
                    name="itemName"
                    value={data.itemName}
                    className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-wrap mt-8">
                  <span className="px-1 text-lg text-gray-600">
                    Item Sub-Name
                  </span>
                  <input
                    type="text"
                    name="subName"
                    value={data.subName}
                    className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-wrap mt-8">
                  <span className="px-1 text-lg text-gray-600">
                    Item Spec-1
                  </span>
                  <input
                    type="text"
                    name="Spec1"
                    value={data.Spec1}
                    className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex flex-wrap mt-8">
                  <span className="px-1 text-lg text-gray-600">
                    Item Spec-2
                  </span>
                  <input
                    type="text"
                    name="Spec2"
                    value={data.Spec2}
                    className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex flex-wrap mt-8">
                  <span className="px-1 text-lg text-gray-600">
                    Item Spec-3
                  </span>
                  <input
                    type="text"
                    name="Spec3"
                    value={data.Spec3}
                    className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-wrap mt-8">
                  <span className="px-1 text-lg text-gray-600">
                    Cost Per Item
                  </span>
                  <input
                    type="text"
                    name="cost"
                    value={data.cost}
                    className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-wrap mt-8">
                  <span className="px-1 text-lg text-gray-600">
                    Quantity Units
                  </span>
                  <select
                    name="units"
                    value={data.units}
                    className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 h-10 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    required
                    autoComplete="off"
                  >
                    <option value="" selected>
                      Select Units
                    </option>
                    {quantityUnits.map((unit) => {
                      return <option value={unit.name}>{unit.name}</option>;
                    })}
                  </select>
                </div>
                <center>
                  <button
                    className="bg-blue-500 mt-6 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mb-10 "
                    onClick={HandleSubmit}
                  >
                    Submit
                  </button>
                </center>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPopUp;