import { React, useEffect, useState } from 'react'
import ItemTable from './ItemTable/ItemTable';
import StockTable from './StockTable/StockTable';
import axios from 'axios';



function Stores() {

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);



  //<----------------itemtable data-------------------->

  const [itemData, setItemData] = useState([]);
  async function fetchItemData() {
    const response = await axios.get("http://localhost:4000/api/getItems");
    setItemData(response.data);
    // console.log(response.data);
  }

  //<----------------itemtable data-------------------->

  const [getStock, setGetStock] = useState([]);
  async function fetchGetStock() {
    const response = await axios
      .get("http://localhost:4000/api/getStock")
      .catch((error) => console.log(error));
    setGetStock(response.data);
  }
  
  useEffect(() => {
    fetchGetStock();
    fetchItemData();
  }, []);

  useEffect(() => {
    if (getStock.length > 0 && itemData.length > 0) {
      setIsLoading(false);
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, [4000])
  }, [message, error]);

  return (
    <>

      {/* <-------------- Loading state -------------> */}

      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full duration-800 ">
          <span class="loader animate-bounce duration-800"></span>
          Loading
        </div >
      ) : (
        <div
          className={`overflow-x-hidden gap-6 h-full justify-center  duration-300 `}
          style={{ backgroundColor: "#F4F4F4" }}
        >
          {/* <--------------Message & Error Showing function -------------> */}

          {message ? (
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded  fixed z-50 top-0 message" role="alert">
              <span class="block sm:inline">{message}</span>
            </div>
          ) : null}
          {error ? (
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 z-50 " role="alert">
              <span class="block sm:inline">{error}</span>
            </div>
          ) : null}

          {/* <-------------- Itemtable Rendering -------------> */}

          <ItemTable itemData={itemData} fetchItemData={fetchItemData} isLoading={isLoading} setIsLoading={setIsLoading} setMessage={setMessage} setError={setError} />

          {/* <--------------Stock table Rendering-------------> */}

          <StockTable getStock={getStock} fetchGetStock={fetchGetStock} isLoading={isLoading} setIsLoading={setIsLoading} setMessage={setMessage} setError={setError} />
          <br />

        </div>
      )}
    </>



  )
}

export default Stores