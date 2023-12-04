import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TransferPopup from "./TransferPopup";
import TransferCard from "./TransferCard";
import TrackTransfer from "./Track/TrackTransfer.js";
import ApprovalPopup from "./ApprovalPopup";
import Table from "./Table";


const Transfer = () => {

  const [showTransferPopup, setTransferPopup] = useState(false);
  const [showTrackTransfer, setTrackTransfer] = useState(false);
  const [showApprovalRequest, setApprovalRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [trackTransferData, setTrackTransferData] = useState([]);
  const [transferData, setTransferData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);


  const onClose = () => {
    setTransferPopup(false);
    setTrackTransfer(false);
    setApprovalRequest(false);
    fetchTransferData();
    fetchOverallTranferedData();
  };

  const navigate = useNavigate();

  const { getUser, user } = useAuth();

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    } else {
      getUser()
        .then((result) => {
          fetchTransferData(result);
          fetchTrackTransferData(result)
        })
        .catch((error) => console.log(error));
    }
  }, [isLoading, message, error]);

  useEffect(() => {
    if (trackTransferData.length > 0 && transferData.length > 0) {
      setIsLoading(false);
    }
  })


  async function fetchTransferData(data) {
    try {
      const result = await axios.post("http://localhost:4000/api/getTransferData", data)
      if (result.status == 200) {
        if (result.data.data == "No Data") {
          setNoData(true);
          setIsLoading(false);
        } else {
          setTransferData(result.data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const clearMessage = () => {
    setMessage(null);
    setError(null);
  };

  useEffect(() => {
    setTimeout(clearMessage, 6000);
  }, [message, error]);

  async function fetchTrackTransferData(data) {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/getTrackTransfer", data
      );
      if (response.status == 200) {
        setTrackTransferData(response.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [OverallTranferedData, setOverallTranferedData] = useState([]);

  const fetchOverallTranferedData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/getOverallTransferedData");
      setOverallTranferedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [stockData, setStockData] = useState([]);

  const fetchStockData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/getAdminStockData");
      setStockData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOverallTranferedData();
    fetchStockData();
  }, []);


  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full duration-800 ">
          <span class="loader animate-bounce duration-800"></span>
          Loading
        </div >
      ) : (
        <div style={{ backgroundColor: "#F4F4F4" }} className="bg-white h-full  animate overflow-x-auto overflow-y-auto border-gray-700 rounded-lg w-full">
          <div className="p-8">
            {message ? (
              <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded  fixed z-50 top-0 message" role="alert">
                <span class="block sm:inline">{message}</span>
              </div>
            ) : null}
            {error ? (
              <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 z-50 message" role="alert">
                <span class="block sm:inline">{error}</span>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-5 items-center justify-between	pt-4">
              <div className="text-2xl whitespace-nowrap animate1">Transfer Items :</div>
              <div className="flex flex-wrap gap-5">
                <div
                  className="bg-blue-500 animate1 cursor-pointer whitespace-nowrap hover:bg-blue-700 text-white text-sm h-10 py-2 px-4 rounded w-42"
                  onClick={() => setTrackTransfer(true)}
                >
                  Track Your Request
                </div>

                <div
                  className="bg-blue-500 animate1 whitespace-nowrap cursor-pointer hover:bg-blue-700 text-white text-sm h-10 py-2 px-4 rounded w-42"
                  onClick={() => setApprovalRequest(true)}
                >
                  Approval Request
                </div>
                <div
                  className="bg-blue-500 animate1  whitespace-nowrap cursor-pointer hover:bg-blue-700 text-white h-10 text-sm  py-2 px-6 rounded w-42"
                  onClick={() => setTransferPopup(true)}
                >
                  Request Transfer
                </div>
              </div>
            </div>
          </div>
          <div className="pl-8">Transfer History</div>
          <br /><br />
          <div className="flex items-center flex-col">

            <Table stockData={OverallTranferedData} />
          </div>
          <TransferPopup
            user={user}
            isVisible={showTransferPopup}
            onClose={onClose}
            setMessage={setMessage}
            setError={setError}
          />

          <TrackTransfer
            user={user}
            trackTransferData={trackTransferData}
            isVisible={showTrackTransfer}
            onClose={onClose}
            setError={setError}
            setMessage={setMessage}
          />
          
          <ApprovalPopup
            user={user}
            transferData={transferData}
            isVisible={showApprovalRequest}
            onClose={onClose}
            setError={setError}
            setMessage={setMessage}
            noData={noData}
          />

        </div>
      )}
    </>

  );
};

export default Transfer;
