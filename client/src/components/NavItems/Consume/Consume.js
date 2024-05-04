import React, { useEffect, useState } from 'react'
import Table from './Table';
import { useAuth } from '../../../AuthContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import ConsumeTrack from './Track/ConsumeTrack';
import ConsumeApprove from './Approve/ScrapApprove';
import ConsumeRequestTable from './Request/ConsumeRequest';

const Consume = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [stockData, setStockData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [scrapData, setScrapData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [scrapTrackData, setScrapTrackData] = useState([]);

    const [noData, setNoData] = useState(true);
    const [noTrackData, setNoTrackData] = useState(true);
    const [noTableData, setNoTableData] = useState(true);

    const { user, getUser, getRequest } = useAuth();

    
    const [getLabDetails, setGetLabDetails] = useState([]);

    async function fetchGetLabDetails() {
      const response = await getRequest("http://localhost:4000/api/getLabDetails")
        .catch((error) => console.log(error));
      setGetLabDetails(response.data);
      
    }

    async function fetchScrapData() {
        const response = await getRequest("http://localhost:4000/api/getConsume");
        if (response && response.status == 200) {
            if (response.data.Data == "No Data") {
                setNoData(true);
                setIsLoading(false);
            } else {
                setNoData(false);
                setScrapData(response.data.Data);
            }
        } else {
            setNoData(true);
        }
    }

    async function fetchTableData() {
        const response = await getRequest("http://localhost:4000/api/getTableConsumeData");
        if (response && response.status == 200) {
            if (response.data.Data == "No Data") {
                setNoTableData(true);
                setIsLoading(false);
            } else {
                setNoTableData(false);
                setTableData(response.data.Data);
            }
        } else {
            setNoTableData(true);
        }
    }


    async function fetchScrapTrackData(id) {
        const response = await getRequest(`http://localhost:4000/api/getConsumeData/${id}`);
        if (response && response.status == 200) {
            if (response.data.Data == "No Data") {
                setNoTrackData(true);
                setIsLoading(false);
            } else {
                setNoTrackData(false);
                setScrapTrackData(response.data.Data);
            }
        } else {
            setNoTrackData(true);
        }
    }

    const [showTrackScrap, setShowTrackScrap] = useState(false);
    const [showScrapApprove, setShowScrapApprove] = useState(false);
    const [showScrap, setShowScrap] = useState(false);
    const [showScrapTable, setShowScrapTable] = useState(true);


    const [message, setMesaage] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
    const [isArrowRotated, setIsArrowRotated] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarVisible((prev) => !prev);
        setIsArrowRotated((prev) => !prev);
    };



    const fetchStockData = async () => {
        try {
            const response = await getRequest("http://localhost:4000/api/getAdminStockData");
            setStockData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!Cookies.get("token")) {
            navigate("/");
        } else {
            getUser();
            fetchStockData();
            fetchGetLabDetails();
            fetchTableData();
            if (user.role == 'slsincharge') {
                fetchScrapData();
            }
        }
    }, [Cookies.get("token")])

    console.log();

    useEffect(() => {
        if ((user.role == "slsincharge" ?
            tableData.length > 0 && scrapData.length > 0 && stockData.length > 0 :
            tableData.length > 0 && stockData.length > 0)) {
            setIsLoading(false);
        }
    }, [scrapData, stockData, tableData])

    const clearMessage = () => {
        setMesaage(null);
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
                </div >
            ) : (
                <div className='pt-10 pl-8'>
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
                            <div className="text-2xl navTransferHeading font-bold text-blue-700 ">Consume</div>
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
                                    <div className="flex flex-wrap gap-5 z-50 items-center justify-between navTransfer">
                                        <div
                                            className={`cursor-pointer font-bold text-black whitespace-nowrap ${showScrapTable == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4 `}
                                            onClick={() => {
                                                setShowTrackScrap(false)
                                                setShowScrapTable(true)
                                                setShowScrapApprove(false)
                                                setShowScrap(false)
                                            }}
                                        >
                                            Home
                                        </div>
                                        <div
                                            className={`cursor-pointer font-bold text-black whitespace-nowrap ${showTrackScrap == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                                            onClick={() => {
                                                setShowTrackScrap(true)
                                                setShowScrapTable(false)
                                                setShowScrapApprove(false)
                                                setShowScrap(false)
                                            }}
                                        >
                                            Track Your Request
                                        </div>
                                        {user.role == "slsincharge" && 
                                        <div
                                            className={`cursor-pointer font-bold text-black whitespace-nowrap ${showScrapApprove == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                                            onClick={() => {
                                                setShowTrackScrap(false)
                                                setShowScrapTable(false)
                                                setShowScrapApprove(true)
                                                setShowScrap(false)
                                            }}
                                        >
                                            Approval Request
                                        </div>
                                        }
                                        <div
                                            className={`cursor-pointer font-bold text-black whitespace-nowrap ${showScrap == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                                            onClick={() => {
                                                setShowScrap(true)
                                                setShowTrackScrap(false)
                                                setShowScrapTable(false)
                                                setShowScrapApprove(false)
                                            }}
                                        >
                                            Consume
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Table
                consumeData={tableData}
                isVisible={showScrapTable}
            />
            <ConsumeTrack
                isVisible={showTrackScrap}
                // onClose={() => setShowTrackScrap(false)}
                user={user}
                setScrapTrackData={setScrapTrackData}
                scrapTrackData={scrapTrackData}
                noTrackData={noTrackData}
                setMesaage={setMesaage}
                setError={setError}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                fetchScrapTrackData={fetchScrapTrackData}
            />
            <ConsumeApprove
                isVisible={showScrapApprove}
                onClose={() => setShowScrapApprove(false)}
                user={user}
                setMesaage={setMesaage}
                setError={setError}
                scrapData={scrapData}
                fetchScrapData={fetchScrapData}
                noData={noData}
            />
            {/* <ScrapRequest
                isVisible={showScrap}
                onClose={() => setShowScrap(false)}
                user={user}
                setMessage={setMesaage}
                setError={setError}
                fetchScrapTrackData={fetchScrapTrackData}
            /> */}
            <ConsumeRequestTable
                user={user}
                isVisible={showScrap}
                onClose={()=>setShowScrap(false)}
                setMessage={setMesaage}
                setError={setError}
                getLabDetails={getLabDetails}
                setGetLabDetails={setGetLabDetails}
                getStock={stockData}
                fetchGetStock={fetchStockData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />

        </>
    )
}

export default Consume