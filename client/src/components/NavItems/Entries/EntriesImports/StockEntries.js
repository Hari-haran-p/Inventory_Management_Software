import React, { useEffect, useState } from 'react';
import StockImport from '../Imports/StockImport';
import StockPopUp from '../Popups/StockPopUp';
import { useAuth } from '../../../../AuthContext';

export default function StockEntries() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const {getRequest, BackendUrl} = useAuth();
  

  const clearMessage = () => {
    setMessage(null);
    setError(null);
  };
  const [quantityUnits, setQuantityUnits] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const [supplier, setSupplier] = useState([]);

  async function fetchQuantityUnits() {
    const response = await getRequest(
      `${BackendUrl}/api/getQuantityUnits`
    );
    setQuantityUnits(response.data);
  }
  async function fetchManufacturer() {
    const response = await getRequest(
      `${BackendUrl}/api/getManufacturer`
    );
    setManufacturer(response.data);
  }
  async function fetchSupplier() {
    const response = await getRequest(`${BackendUrl}/api/getSupplier`);
    setSupplier(response.data);
  }

  useEffect(() => {
    fetchManufacturer();
    fetchSupplier();
    fetchQuantityUnits();
  }, [])


  useEffect(() => {
    setTimeout(clearMessage, 4000);
  }, [message, error]);
  return (
    <>
      <div className="h-full w-full flex  bg-gray-100 flex-col">
        <h1 style={{ fontWeight: "bolder", fontSize: "30px", paddingLeft: "7%" }} class={`text-start pt-4`}>Stock Entry </h1>
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
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 z-50 "
            role="alert"
          >
            <span class="block sm:inline">{error}</span>
          </div>
        ) : null}
        <div className="bg-gray-100 h-10/12 w-full px-7 lg:px-14 flex flex-row-reverse animate-fadeIn  items-center justify-center rounded-lg">
          <div className=" bg-gray-100 h-full w-full lg:px-20 pt-5">
              <StockPopUp
                manufacturer={manufacturer}
                supplier={supplier}
                quantityUnits={quantityUnits}
                setMessage={setMessage}
                setError={setError}
              />
          </div>
        </div>
      </div>
    </>


  )
}
