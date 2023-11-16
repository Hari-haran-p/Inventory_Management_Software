import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ItemPopUp = ({ isVisible, onClose, setMessage, user, setError, setIsLoading, manufacturer, supplier, quantityUnits,noDataOpenManufacturer ,noDataOpenSupplier }) => {


  //<-------------Assigning state requird state variables --------->

  const [data, setData] = useState({
    itemType: "",
    manufacturerName: "",
    supplierName: "",
    itemName: "",
    subName: "",
    description: "",
    cost: "",
    units: "",
  });

  const navigate = useNavigate();

  const [msuggestion, setMSuggestion] = useState(false);
  const [isMTyping, setIsMTyping] = useState(false);
  const [ssuggestion, setSSuggestion] = useState(false);
  const [isSTyping, setIsSTyping] = useState(false);

  //<----------End of assigning state variables ------------>


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

  const HandleSubmit = async (e) => {
    try {
      setIsLoading(true);
      if (data.itemType == "") {
        setError("Select correct itemtype");
        setIsLoading(false);
        return;
      } else {
        e.preventDefault();
        const response = await axios.post("http://localhost:4000/api/itemAdd", data);
        if (response && response.status == 201) {
          setMessage(response.data.Data);
          setIsLoading(false);
          onClose();
        }
        setData({
          itemType: "",
          manufacturerName: "",
          supplierName: "",
          itemName: "",
          subName: "",
          description: "",
          cost: "",
          units: "",
        });
      }
    } catch (error) {
      if (error && error.response.status == 400) {
        setError(error.response.data.Data);
        setIsLoading(false);
        onClose();
      }
    }
  };

  //<----------End of form handling----------->

  if (!isVisible) return null;

  return (
    <div
    style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}} 
    className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
      <div 
      style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",margin:"15px"}}
      className="flex  flex-col">
        <div
          style={{ height: "80%" }}
          className="bg-white w-full px-14 animate1 py-5 overflow-x-auto overflow-y-auto flex flex-col items-center border-gray-700 rounded-lg"
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
                        {manufacturerResult && manufacturerResult.length > 0 ?
                          (manufacturerResult.slice(0, 4).map((result) => {
                            return (
                              <div
                                key={result.id}
                                value={result.id}
                                className="hover:bg-sky-100 rounded-lg p-1"
                                onClick={() => manuResultClick(result.id)}
                              >
                                {result.id}-{result.name}
                              </div>
                            );
                          })) : (
                            <div className="cursor-pointer" onClick={noDataOpenManufacturer}>click here to add manufacturer</div>
                          )}
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
                        {supplierResult && supplierResult.length > 0 ? (
                          supplierResult.slice(0, 4).map((result) => {
                            return (
                              <div
                                key={result.id}
                                value={result.id}
                                className="hover:bg-sky-100 rounded-lg p-1"
                                onClick={() => supplierResultClick(result.id)}
                              >
                                {result.id}-{result.name}
                              </div>
                            );
                          })) : (
                          <div className="cursor-pointer" onClick={noDataOpenSupplier}>Click here to add Supplier</div>
                        )}
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
                    Item Description
                  </span>
                  <textarea
                    type="text"
                    name="description"
                    max="200"
                    value={data.description}
                    className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex flex-wrap mt-8">
                  <span className="px-1 text-lg text-gray-600">
                    Cost Per Item
                  </span>
                  <input
                    type="number"
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
                      return <option value={unit.name} key={unit.id}>{unit.name}</option>;
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
