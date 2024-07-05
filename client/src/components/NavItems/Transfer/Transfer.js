import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TransferRequestTable from "./Request/TransferPopup.js";
import TransferCard from "./Approve/TransferCard.js";
import TrackTransfer from "./Track/TrackTransfer.js";
import ApprovalPopup from "./Approve/ApprovalPopup.js";
import Table from "./Table/Table.js";
import TransferImport from "./BulkTransferImport.js";
import TransferTable from "./Table/TransferTable.js";


const Transfer = () => {

  //<<<<---------------Context variables and functions------------------>>>>
  const { getUser, user, getRequest } = useAuth();


  // <<<<-----------Loading , Message and Error state variables--------------->>>>
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState(null);

  const [error, setError] = useState(null);

  // <<<<------------------Visibility related satte variables------------------>>>>
  const [showTransferPopup, setTransferPopup] = useState(false);

  const [showTrackTransfer, setTrackTransfer] = useState(false);

  const [showApprovalRequest, setApprovalRequest] = useState(false);

  const [showTransferImport, setShowTransferImport] = useState(false);


  // <<<<------------Top nave bar erlated state variables and functions---------->>>>
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const [isArrowRotated, setIsArrowRotated] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible((prev) => !prev);
    setIsArrowRotated((prev) => !prev);
  };


  // <<<<--------------Main page Table related variables and fetch fucntions--------------->>
  const [OverallTranferedData, setOverallTranferedData] = useState([]);

  const fetchOverallTranferedData = async () => {
    try {
      const response = await getRequest("http://localhost:4000/api/getOverallTransferedData");
      setOverallTranferedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // <<<<---------------Track Page related variables and fetch functions-------------->>>>
  const [pendingData, setPendingData] = useState([]);

  const fetchPendingData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/getTransferCardData/${user.dept_code}`
      );
      setPendingData(response.data);
    } catch (error) {
      console.error(error);
    }
  };


// <<<<----------------Approval ralted state variables and fetch functions---------------->>>>
  const [transferData, setTransferData] = useState([]);

  const [noData, setNoData] = useState(false);

  async function fetchTransferData(data) {
    try {
      const result = await axios.post("http://localhost:4000/api/getTransferData", data, { headers: { Authorization: Cookies.get("token") } })
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


// <<<<------------------Request Table related state variable and fecth funtions---------------->>>>
  const [getStock, setGetStock] = useState([]);

  async function fetchGetStock() {
    const response = await getRequest(`http://localhost:4000/api/getAdminTransferStockData/${user.dept_code}`)
      .catch((error) => console.log(error));
    setGetStock(response.data);
  }




  const [trackTransferData, setTrackTransferData] = useState([]);

  // const onClose = () => {
  //   setTransferPopup(false);
  //   setTrackTransfer(false);
  //   setApprovalRequest(false);
  //   fetchTransferData();
  //   fetchOverallTranferedData();
  // };

  const navigate = useNavigate();


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



  const [stockData, setStockData] = useState([]);

  const fetchStockData = async () => {
    try {
      const response = await getRequest("http://localhost:4000/api/getAdminStockData");
      setStockData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [showTable, setShowTable] = useState(true);


  useEffect(() => {
    fetchOverallTranferedData();
    fetchStockData();
    fetchGetStock();
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
            <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-xl	">
              <div>
                <div className="text-2xl navTransferHeading font-bold text-blue-700 ">Transfer</div>
              </div>
              <div className="flex justify-end items-center gap-10 navIconArrow">
                <button
                  onClick={toggleNavbar}
                  className={`transition-transform duration-1000 transform ${isArrowRotated ? 'rotate-180' : ''}`}
                >
                  <img style={{ width: "30px" }} className="border-blue-700 border-2 rounded-full" src="/images/control.png" />
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
                            setShowTransferImport(true);
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
          />

          <TrackTransfer
            isVisible={showTrackTransfer}
            user={user}
            setMessage={setMessage}
            setError={setError}
            fetchPendingData={fetchPendingData}
            fetchOverallTranferedData={fetchOverallTranferedData}
            pendingData={pendingData}
          />

          <ApprovalPopup
            isVisible={showApprovalRequest}
            setMessage={setMessage}
            setError={setError}
            transferData={transferData}
            fetchTransferData={fetchTransferData}
            noData={noData}
            fetchPendingData={fetchPendingData}
            fetchOverallTranferedData={fetchOverallTranferedData}

          />

          <TransferRequestTable
            isVisible={showTransferPopup}

            user={user}

            setMessage={setMessage}
            setError={setError}

            isLoading={isLoading}
            setIsLoading={setIsLoading}

            getStock={getStock}
            fetchGetStock={fetchGetStock}

            fetchPendingData={fetchPendingData}
            fetchOverallTranferedData={fetchOverallTranferedData}

          />



          <TransferImport
            isVisible={showTransferImport}
            user={user}
            setMessage={setMessage}
            setError={setError}
            onClose={() => setShowTransferImport(false)}
            setshowTransferTable={setShowTable}
            setShowTransferImport={setShowTransferImport}
          />


        </div>
      )}
    </>

  );
};

export default Transfer;
