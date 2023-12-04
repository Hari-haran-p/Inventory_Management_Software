import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../AuthContext';

const ScrapRequest = ({ onClose, isVisible, user, setMessage, setError, fetchScrapTrackData }) => {

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    itemcode: "",
    showStock: "",
    stockReq: "",
    fromLabId: "",
  });

  const [item, setItem] = useState([]);
  const [stock, setStock] = useState([]);
  const { getUser} = useAuth();

  async function fetchItems() {
    const response = await axios.get("http://localhost:4000/api/getItems");
    setItem(response.data);
  }

  async function fetchStock() {
    const response = await axios.get(`http://localhost:4000/api/getStock/${user.dept_code}`);
    setStock(response.data);
  }


  useEffect(() => {
    fetchItems();
    fetchStock();
  }, []);

  const [itemResult, setItemResult] = useState(item);
  const [stockResult, setStockResult] = useState(stock);
  const [suggestion, setSuggestion] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleItemChange = (e) => {
    // stock.map((f)=>console.log(f.item_name));
    if (e.target.value.trim().length > 0) {
      setSuggestion(true);
      setIsTyping(true);
    } else {
      setIsTyping(false);
      setSuggestion(false);
    }
    setStockResult(
      stock.filter((f) => f.item_name.toLowerCase().includes(e.target.value.toLowerCase()))
    );
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [result, setResult] = useState([]);

  function resultClick(code) {
    // setData({ ...data, itemcode: code });
    const result = stock.filter((items) => {
      if (items.item_code == code) {
        return items;
      }
    });
    setResult(result);
    setData({ ...data, itemcode: code, showStock: result[0].stock_qty });
    setSuggestion(false);
    setIsTyping(false);
  }

  const handleReqFromChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      if (stockResult.length > 0) {
        // const sendItem = item.find((f) => f.item_code == data.itemcode);
        const response = await axios.post(
          "http://localhost:4000/api/scrapRequest",
          {
            formData: { ...data },
            resultData: { ...result },
            user_id: user.user_id,
            dept_id: user.dept_code
          }
        );
        if (response.status == 200) {
          setData({
            itemcode: "",
            showStock: "",
            stockReq: "",
            fromLabId: "",
          })
          fetchStock();
          getUser().then((response) => fetchScrapTrackData(response.dept_code));
          setMessage(response.data.Data);
          onClose();
          setIsLoading(false);
        }
      }else{
        setError("Enter a valid Item");
        return;
      }
    } catch (error) {

      if (error) {
        setData({
          itemcode: "",
          showStock: "",
          stockReq: "",
          fromLabId: "",
        })
        getUser().then((response) => fetchScrapTrackData(response.dept_code));
        setError(error.response.data.Data);
        onClose();
        setIsLoading(false);
      }
    }
  };


  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="flex flex-col">
          <div
            style={{ height: "600px" }}
            className="popup-responsive animate1 popup-responsive-small bg-white w-full px-14 py-5 overflow-x-auto overflow-y-auto flex flex-col items-center border-gray-700 rounded-lg"
          >
            <div className="w-full text-end pr-10">
              <button
                className="text-black fixed z-50 rounded-full border-2 border-black px-2 text-3xl"
                onClick={() => onClose()}
              >
                X
              </button>
            </div>
            <div className="flex flex-col justify-center items-center bg-white p-8 rounded-2xl">
              <div className="py-1 flex  pb-8">
                <span className="px-1 text-2xl font-medium text-black">
                  Scrap Stock
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap">
                <label className="text-md pr-5 mb-3 whitespace-nowrap">Item Name</label>
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
                    {stockResult && stockResult.length > 0 ? (
                      stockResult.slice(0, 6).map((result) => {
                        return (
                          <div
                            key={result.item_code}
                            value={result.item_code}
                            className="text-md px-3 py-2 w-full border-none
                              bg-white border-2 focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none hover:bg-sky-100 rounded-lg"
                            onClick={() => resultClick(result.item_code)}
                          >
                            {result.item_code}-{result.item_name}
                          </div>
                        );
                      }))
                      : (
                        <div>No Match</div>
                      )
                    }
                  </div>
                )}
              </div>
              <div class="py-1 flex flex-wrap gap-3 pb-8">
                <label class="text-md pr-5 whitespace-nowrap">Check stock From</label>
                <input
                  type="text"
                  name="fromLabId"
                  value={user.dept_code}
                  onChange={handleReqFromChange}
                  className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  required
                  disabled
                />
              </div>
              <div class="flex flex-wrap ">
                <label class="text-md mb-3 whitespace-nowrap">Stock Available</label>
                <input
                  type="text"
                  name="cost"
                  value={data.showStock}
                  className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  required
                  disabled
                />
              </div>
              <div className="whitespace-nowrap">
                Kindly enter the stock quantity to be scraped{" "}
                <label style={{ color: "red", fontSize: "25px" }}>*</label>
              </div>
              <div class="py-1 flex flex-wrap  pb-8">
                <label class="text-md mb-3 whitespace-nowrap">Scrap Quantity</label>
                <input
                  type="number"
                  name="stockReq"
                  value={data.stockReq}
                  onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                  }
                  className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  required
                />
              </div>
              <center>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mb-10"
                  type="submit"
                >
                  Submit
                </button>
              </center>
            </form>
          </div>

        </div>

      </div>
    </>
  )
}

export default ScrapRequest