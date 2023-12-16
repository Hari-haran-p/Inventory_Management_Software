import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TransferRequestTable from "./TransferPopup";
import TransferCard from "./TransferCard";
import TrackTransfer from "./Track/TrackTransfer.js";
import ApprovalPopup from "./ApprovalPopup";
import Table from "./Table";
import TransferImport from "./BulkTransferImport.js";
import TransferTable from "./TransferTable.js";
// import TransferRequestTable from "./TransferRequestTable.js";


const Transfer = () => {

  const [showTransferPopup, setTransferPopup] = useState(false);
  const [showTrackTransfer, setTrackTransfer] = useState(false);
  const [showApprovalRequest, setApprovalRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [trackTransferData, setTrackTransferData] = useState([]);
  const [transferData, setTransferData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showTransferImport, setShowTransferImport] = useState(false);
  const [showTransferTable, setshowTransferTable] = useState(false);



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
      const result = await axios.post("/api/getTransferData", data)
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
        "/api/getTrackTransfer", data
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
      const response = await axios.get("/api/getOverallTransferedData");
      setOverallTranferedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [stockData, setStockData] = useState([]);

  const fetchStockData = async () => {
    try {
      const response = await axios.get("/api/getAdminStockData");
      setStockData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [showTable, setShowTable] = useState(true);


  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isArrowRotated, setIsArrowRotated] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible((prev) => !prev);
    setIsArrowRotated((prev) => !prev);
  };

  const [getStock, setGetStock] = useState([]);
  async function fetchGetStock() {
    const response = await axios
      .get("/api/getAdminStockData")
      .catch((error) => console.log(error));
    setGetStock(response.data);
  }

  const [getLabDetails, setGetLabDetails] = useState([]);
  async function fetchGetLabDetails() {
    const response = await axios
      .get("/api/getLabDetails")
      .catch((error) => console.log(error));
    setGetLabDetails(response.data);
  }

  // console.log(getLabDetails);
  // const {user, getUser} = useAuth();

  useEffect(() => {
    fetchOverallTranferedData();
    fetchStockData();
    fetchGetStock();
    fetchGetLabDetails();
  }, []);

  return (
    <>
      {"" ? (
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
            <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-xl	">
              <div>
                  <div className="text-2xl navTransferHeading font-bold text-blue-700 ">Transfer</div>
              </div>
              <div className="flex justify-end items-center gap-10 navIconArrow">
                <button
                  onClick={toggleNavbar}
                  className={`transition-transform duration-1000 transform ${isArrowRotated ? 'rotate-180' : ''}`}
                >
                  <img style={{width:"30px"}}className="border-blue-700 border-2 rounded-full" src="/images/control.png" />
                </button>
                <div
                  className={`transition-transform transform duration-1000 ${isNavbarVisible ? '' : 'lg:translate-x-full'}`}
                >
                  {isNavbarVisible && (
                    <div className="flex flex-wrap gap-5 items-center justify-between navTransfer">
                      <div
                        className={`cursor-pointer font-bold text-black whitespace-nowrap ${showTable == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4 `}
                        onClick={() => {
                          setApprovalRequest(false);
                          setTransferPopup(false)
                          setTrackTransfer(false);
                          setShowTable(true);
                          setShowTransferImport(false)
                        }}
                      >
                        Home
                      </div>
                      <div
                        className={`cursor-pointer font-bold text-black whitespace-nowrap ${showTrackTransfer == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                        onClick={() => {
                          setApprovalRequest(false);
                          setTransferPopup(false)
                          setTrackTransfer(true);
                          setShowTable(false);
                          setShowTransferImport(false)
                        }}
                      >
                        Track Your Request
                      </div>

                      <div
                        className={`cursor-pointer font-bold text-black whitespace-nowrap ${showApprovalRequest == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                        onClick={() => {
                          setApprovalRequest(true);
                          setTransferPopup(false)
                          setTrackTransfer(false);
                          setShowTable(false);
                          setShowTransferImport(false)

                        }}
                      >
                        Approval Request
                      </div>
                      <div
                        className={`cursor-pointer font-bold text-black whitespace-nowrap ${showTransferPopup == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                        onClick={() => {
                          setTransferPopup(true)
                          setShowTable(false)
                          setTrackTransfer(false);
                          setApprovalRequest(false);
                          setShowTransferImport(false)
                        }}
                      >
                        Request Transfer
                      </div>
                      {user.role == "slsincharge" && 
                      <button
                        onClick={() => {
                          setTransferPopup(false)
                          setShowTable(false)
                          setTrackTransfer(false);
                          setApprovalRequest(false);
                          setShowTransferImport(true) // Close the navbar 
                        }}
                        className={`cursor-pointer font-bold text-black whitespace-nowrap ${showTransferImport == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                      >
                        <span>Bulk Transfer</span>
                      </button>
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <TransferTable
            OverallTranferedData={OverallTranferedData}
            isVisible={showTable}
            onClose={onClose}
          />

          <TransferRequestTable
            user={user}
            isVisible={showTransferPopup}
            onClose={onClose}
            setMessage={setMessage}
            setError={setError}
            getLabDetails={getLabDetails}
            setGetLabDetails={setGetLabDetails}
            getStock={getStock}
            fetchGetStock={fetchGetStock}
            isLoading={isLoading}
            setIsLoading={setIsLoading}

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
            fetchTransferData = {fetchTransferData}
            isVisible={showApprovalRequest}
            onClose={onClose}
            setError={setError}
            setMessage={setMessage}
            noData={noData}
          />

          <TransferImport
            isVisible={showTransferImport}
            user={user}
            setMessage={setMessage}
            setError={setError}
            onClose={() => setShowTransferImport(false)}
            setshowTransferTable = {setShowTable}
            setShowTransferImport = {setShowTransferImport}
          />


        </div>
      )}
    </>

  );
};

export default Transfer;
