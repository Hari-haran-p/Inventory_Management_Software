import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const TransferPopup = ({ isVisible, onClose, user, setMessage, setError }) => {

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    itemcode: "",
    showStock: "",
    stockReq: "",
    fromLabId: "",
  });

  const [item, setItem] = useState([]);
  const [stock, setStock] = useState([]);

  async function fetchItems() {
    const response = await axios.get("http://localhost:4000/api/getItems");
    setItem(response.data);
  }

  async function fetchStock() {
    const response = await axios.get("http://localhost:4000/api/getStock");
    setStock(response.data);
  }

  useEffect(() => {
    fetchItems();
    fetchStock();
  }, []);

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

    setSuggestion(false);
    setIsTyping(false);
  }

  const [result, setResult] = useState([]);
  //   const [stockResult, setStockResult] = useState({});

  const handleReqFromChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
    setResult(
      stock.filter((f) =>
        f.dept_id.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    result.find(
      (res) => res.item_code.toLowerCase() == data.itemcode.toLowerCase()
    );
  };
  
  const checkAvailability = (e) => {
    e.preventDefault();
    const foundElement = result.find(
      (res) => res.item_code.toLowerCase() == data.itemcode.toLowerCase()
    );
    if (foundElement != null)
      setData({ ...data, showStock: foundElement.stock_qty });
    else setData({ ...data, showStock: 0 });
  };

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const sendItem = item.find((f) => f.item_code == data.itemcode);
      const response = await axios.post(
        "http://localhost:4000/api/transferRequest",
        {
          resData: {
            ...data,
            manufacturerId: sendItem.manufacturer_id,
            supplierId: sendItem.supplier_id,
            reqLabId: user.dept_code,
            user_id: user.user_id,
          },
        }
      );
      if (response.status == 200) {
        setData({
          itemcode: "",
          showStock: "",
          stockReq: "",
          fromLabId: "",
        })
        console.log(response.data);
        setMessage(response.data.Data);
        onClose();
        setIsLoading(false);
      }
    } catch (error) {

      if (error) {
        setData({
          itemcode: "",
          showStock: "",
          stockReq: "",
          fromLabId: "",
        })
        console.log(error);
        setError(error.response.data.Data);
        onClose();
        setIsLoading(false);
      }
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full"><label class="loader"></label></div>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="flex flex-col">
          <div
          style={{ height: "600px" }}
          className="popup-responsive animate1 popup-responsive-small bg-white w-full px-14 py-5 overflow-x-auto overflow-y-auto flex flex-col items-center border-gray-700 rounded-lg"
        >
            <button
              className="text-black rounded-full border-black px-2 border-2 text-3xl place-self-end"
              onClick={() => onClose()}
            >
              X
            </button>
            <div className="flex flex-col justify-center items-center bg-white p-8 rounded-2xl">
              <div className="py-1 flex  pb-8">
                <span className="px-1 text-2xl font-medium text-black">
                  Transfer Request
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                {/* {message ? <div>{message}</div>: null} */}
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
                      {itemResult && itemResult.length > 0 ? (
                        itemResult.slice(0, 2).map((result) => {
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
                        }) )
                        : (
                          <div>No Match</div>
                        )}
                    </div>
                  )}
                </div>
                <div class="py-1 flex flex-wrap gap-3 pb-8">
                  <label class="text-md pr-5 whitespace-nowrap">Request From</label>
                  <input
                    type="text"
                    name="fromLabId"
                    value={data.fromLabId}
                    onChange={handleReqFromChange}
                    className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    required
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={checkAvailability}
                  >
                    Check avail
                  </button>
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
                  Kindly enter the stock after checking availablity{" "}
                  <label style={{ color: "red", fontSize: "25px" }}>*</label>
                </div>
                <div class="py-1 flex flex-wrap  pb-8">
                  <label class="text-md mb-3 whitespace-nowrap">Stock required</label>
                  <input
                    type="text"
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
        </div>
      )}
    </>
  );
};

export default TransferPopup;
