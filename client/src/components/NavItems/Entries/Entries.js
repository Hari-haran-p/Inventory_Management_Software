import React from "react";
import ManufacturerPopUp from "./Popups/ManufacturerPopUp";
import { useState, useEffect, useContext } from "react";
import SupplierPopUp from "./Popups/SupplierPopUp";
import StockPopUp from "./Popups/StockPopUp";
// import ItemPopUp from "./Popups/ItemPopUp";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import Cookies from "js-cookie";
import axios from "axios";
// import ItemImport from "./Imports/ItemImport";
import StockImport from "./Imports/StockImport";
import ManufcturerImport from "./Imports/ManufcturerImport";
import SupplierImport from "./Imports/SupplierImport";

function Entries() {
  const navigate = useNavigate();

  const { getUser, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const [showManufacturer, setShowManufacturer] = useState(false);
  // const [showItem, setShowItem] = useState(false);
  const [showStock, setShowStock] = useState(false);
  const [showSupplier, setShowSupplier] = useState(false);

  // const [showItemImport, setShowItemImport] = useState(false);
  const [showStockImport, setShowStockImport] = useState(false);

  const [showManufacturerImport, setShowManufacturerImport] = useState(false);
  const [showSupplierImport, setShowSupplierImport] = useState(false);


  const [manufacturer, setManufacturer] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [quantityUnits, setQuantityUnits] = useState([]);
  const { getRequest } = useAuth();
  const [item, setItem] = useState([]);
  async function fetchItems() {
    const response = await getRequest("http://localhost:4000/api/getItems");
    setItem(response.data);
  }

  async function fetchManufacturer() {
    const response = await getRequest(
      "http://localhost:4000/api/getManufacturer"
    );
    setManufacturer(response.data);
  }
  async function fetchSupplier() {
    const response = await getRequest("http://localhost:4000/api/getSupplier");
    setSupplier(response.data);
  }
  async function fetchQuantityUnits() {
    const response = await getRequest(
      "http://localhost:4000/api/getQuantityUnits"
    );
    setQuantityUnits(response.data);
  }

  // const noDataOpenManufacturer = () => {
  //   setShowItem(false)
  //   setShowManufacturer(true)
  // }
  // const noDataOpenSupplier = () => {
  //   setShowItem(false)
  //   setShowSupplier(true)
  // }

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    } else {
      getUser();
      fetchItems();
      fetchManufacturer();
      fetchSupplier();
      fetchQuantityUnits();
    }
  }, []);

  useEffect(() => {
    if (
      item.length > 0 &&
      manufacturer.length > 0 &&
      supplier.length > 0 &&
      quantityUnits.length > 0
    ) {
      setIsLoading(false);
    }
  }, [item, supplier, manufacturer, quantityUnits]);

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const clearMessage = () => {
    setMessage(null);
    setError(null);
  };

  useEffect(() => {
    setTimeout(clearMessage, 6000);
  }, [message, error]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full duration-800 ">
          <span class="loader animate-bounce duration-800"></span>
          Loading
        </div>
      ) : (
        <div
          style={{ backgroundColor: "#F4F4F4" }}
          className="flex h-auto justify-center items-center"
        >
          {message ? (
            <div
              class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded  fixed z-50 top-0 message"
              role="alert"
            >
              <span class="block sm:inline">{message}</span>
            </div>
          ) : null}
          {error ? (
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 z-50 message"
              role="alert"
            >
              <span class="block sm:inline">{error}</span>
            </div>
          ) : null}
          {/* <div className="entry-div"> */}
          <div className="pt-10 pb-10 animate1 flex flex-wrap w-full h-auto min-h-screen justify-center items-center gap-10 lg:gap-20">
            {/* <div className="flex flex-col items-center justify-center gap-10 lg:gap-32"> */}
            <div
              style={{ width: "400px" }}
              className="entry-card shadow-2xl bg-white rounded-3xl text-2xl animate text-black flex flex-col justify-center p-4 py-10 items-center"
            >
              <img className="w-40" src="/images/manufa.png" alt="" />
              <div className="flex gap-2 flex-col justify-center items-center w-full">
                <div className="text-lg font-bold">Manufacturer Entry</div>
                <div
                  style={{ color: "#5e9ff2" }}
                  className="text-sm break-words py-3"
                >
                  Streamline Manufacturer Data Entry Process.
                </div>
                <div className="button-container flex gap-3 justify-center">
                  <Link
                    to={"/entries/manufacturer"}
                    class="w-11/12 md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  >
                    <span class="mx-auto text-lg">Upload</span>
                  </Link>
                  <Link
                    to={"/entries/manufacturer"}
                    class="w-11/12 md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  >
                    <span class="mx-auto text-lg">Entry</span>
                  </Link>
                </div>
              </div>
            </div>
            {/* <ManufacturerPopUp
                  isVisible={showManufacturer}
                  onClose={() => setShowManufacturer(false)}
                  setMessage={setMessage}
                  setError={setError}
                  setIsLoading={setIsLoading}
                />
                <ManufcturerImport
                  isVisible={showManufacturerImport}
                  user={user}
                  setMessage={setMessage}
                  setError={setError}
                  onClose={() => setShowManufacturerImport(false)}
                  setIsLoading={setIsLoading}

                /> */}
            <div
              style={{ width: "400px" }}
              className="entry-card shadow-2xl bg-white rounded-3xl text-2xl animate text-black flex flex-col justify-center p-4 py-10 items-center"
            >
              <img className="w-40" src="/images/supplierentry.png" alt="" />
              <div className="flex gap-2 justify-center items-center flex-col w-full">
                <div className="text-lg font-bold">Supplier Entry</div>
                <div
                  style={{ color: "#5e9ff2" }}
                  className="text-sm break-words py-3"
                >
                  Efficient Supplier Data Entry Process.
                </div>
                <div className="flex button-container gap-3 items-center justify-center">
                  <Link
                    to={"/entries/supplier"}
                    class="w-11/12 md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  >
                    <span class="mx-auto text-lg">Upload</span>
                  </Link>
                  <Link
                    to={"/entries/supplier"}
                    class="w-11/12 md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  >
                    <span class="mx-auto text-lg">Entry</span>
                  </Link>
                </div>
              </div>
            </div>
            {/* <SupplierPopUp
              isVisible={showSupplier}
              onClose={() => setShowSupplier(false)}
              setMessage={setMessage}
              setError={setError}
              setIsLoading={setIsLoading}
            />
            <SupplierImport
              isVisible={showSupplierImport}
              user={user}
              setMessage={setMessage}
              setError={setError}
              onClose={() => setShowSupplierImport(false)}
              setIsLoading={setIsLoading}
            /> */}
            {/* </div> */}
            {/* {user.role === "slbincharge" && (
              <> */}
            {/* <div className="flex flex-col items-center justify-center gap-10 lg:gap-32"> */}
            {/* <div

                  style={{ width: "500px" }}
                  className="h-52 entry-card  shadow-2xl bg-white animate2 rounded-3xl flex text-2xl animate text-black p-5 items-center "
                >
                  <img className="w-40" src="/images/item.png" alt="" />
                  <div className="pl-2 flex gap-2 flex-col w-full">
                    <div className="text-lg font-bold">Item Entry</div>
                    <div style={{ color: "#5e9ff2" }} className="text-sm break-words ">Optimize Item Data Entry Process. </div>
                    <div className="flex button-container gap-3 items-center justify-center w-full">
                      <button
                        onClick={() => setShowItemImport(true)}
                        class="w-11/12 md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        <span class="mx-auto text-lg">Upload</span>
                      </button>
                      <button
                        onClick={() => { setShowItem(true) }}
                        class="w-11/12 md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        <span class="mx-auto text-lg">Entry</span>
                      </button>
                    </div>
                  </div>
                </div>
                <ItemPopUp
                  isVisible={showItem}
                  user={user}
                  setMessage={setMessage}
                  setError={setError}
                  onClose={() => setShowItem(false)}
                  setIsLoading={setIsLoading}
                  manufacturer={manufacturer}
                  supplier={supplier}
                  quantityUnits={quantityUnits}
                />
                <ItemImport
                  isVisible={showItemImport}
                  user={user}
                  setMessage={setMessage}
                  setError={setError}
                  onClose={() => setShowItemImport(false)}
                  setIsLoading={setIsLoading}

                /> */}
            <div
              style={{ width: "400px" }}
              className="entry-card shadow-2xl bg-white rounded-3xl text-2xl animate text-black flex flex-col justify-center p-4 py-10 items-center"
            >
              <img className="w-40" src="/images/stockentry.png" alt="" />
              <div className="flex gap-2 justify-center items-center flex-col pl-2 w-full">
                <div className="text-lg font-bold">Stock Entry</div>
                <div
                  style={{ color: "#5e9ff2" }}
                  className="text-sm  break-words py-3"
                >
                  Simplify Stock Data Entry Process.{" "}
                </div>
                <div className="flex button-container gap-3 items-center justify-center">
                  <Link
                    to={"/entries/stock"}
                    class="w-11/12 md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  >
                    <span class="mx-auto text-lg">Upload</span>
                  </Link>
                  <Link
                    to={"/entries/stock"}
                    class=" w-11/12 md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  >
                    <span class="mx-auto text-lg">Entry</span>
                  </Link>
                </div>
              </div>
            </div>
            {/* <StockPopUp
              isVisible={showStock}
              user={user}
              setMessage={setMessage}
              setError={setError}
              onClose={() => setShowStock(false)}
              setIsLoading={setIsLoading}
              item={item}
            />
            <StockImport
              isVisible={showStockImport}
              user={user}
              setMessage={setMessage}
              setError={setError}
              onClose={() => setShowStockImport(false)}
              setIsLoading={setIsLoading}
            /> */}
          </div>
          {/* </div> */}
        </div>
        // </div>
      )}
    </>
  );
}

export default Entries;
