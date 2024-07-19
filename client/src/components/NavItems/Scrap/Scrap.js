import React, { useEffect, useState } from 'react'
import Table from './Table';
import { useAuth } from '../../../AuthContext';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import ScrapTrack from './Track/ScrapTrack';
import ScrapApprove from './Approve/ScrapApprove';
import ScrapRequestTable from './Request/ScrapRequest';

const Scrap = () => {

    //<<<<------------Context get user variable and function------------------>>>>
    const { user, getUser, getRequest } = useAuth();


    //<<<<------------Loading , message and error state variables------------------>>>>
    const [isLoading, setIsLoading] = useState(true);

    const [message, setMessage] = useState(null);

    const [error, setError] = useState(null);


    //<<<<------------Top navbar state variables andn function------------------>>>>
    const cuurNavState = localStorage.getItem('scrapNavState') == null ? true :  JSON.parse(localStorage.getItem('scrapNavState'));

    const [isArrowRotated, setIsArrowRotated] = useState(cuurNavState);

    const [isNavbarVisible, setIsNavbarVisible] = useState(cuurNavState);

    const toggleNavbar = () => {
        localStorage.setItem("scrapNavState", JSON.stringify(!isArrowRotated));
        setIsNavbarVisible((prev) => !prev);
        setIsArrowRotated((prev) => !prev);
    };


    //<<<<------------Visibility state variables------------------>>>>
    const [showTrackScrap, setShowTrackScrap] = useState(false);

    const [showScrapApprove, setShowScrapApprove] = useState(false);

    const [showScrap, setShowScrap] = useState(false);

    const [showScrapTable, setShowScrapTable] = useState(true);


    //<<<<-----------------Scrap main table related state variables and fetch fucntions--------------------->>>>
    const [tableData, setTableData] = useState([]);

    async function fetchTableData() {
        const response = await getRequest("/api/getTableScrapData");
        if (response && response.status == 200) {
            if (response.data.Data == "No Data") {
                setIsLoading(false);
            } else {
                setTableData(response.data.Data);
            }
        }
    }


    //<<<<-----------------Scrap Tracking related state varibles and fetch functions--------------------->>>>
    const [pendingData, setPendingData] = useState([]);

    const fetchPendingData = async () => {
        try {
            const response = await getRequest(
                `/api/getScrapCardData/${user.user_id}`
            );
            console.log(response);
            setPendingData(response.data);
        } catch (error) {
            console.error(error);
        }
    };



    //<<<<--------------------Scrap Request related variables and function----------------->>>>
    const [stockData, setStockData] = useState([]);

    const [noRequestData, setNoRequestData] = useState(true);

    const fetchStockData = async () => {
        try {
            const response = await getRequest(`/api/getAdminScrapStockData/${user.dept_code}`);
            if (response && response.status == 200) {
                if (response.data.Data == "No Data") {
                    setNoRequestData(true);
                    setIsLoading(false);
                } else {
                    setNoRequestData(false);
                    setIsLoading(false);
                    setStockData(response.data.Data);
                }
            } else {
                setIsLoading(false);
                setNoRequestData(true);
            }
        } catch (error) {
            console.error(error);
        }
    };



    //<<<<------------------Scrap Approval related state variables and fetch functions--------------->>>>
    const [scrapData, setScrapData] = useState([]);

    const [noData, setNoData] = useState(true);

    async function fetchScrapData() {
        const response = await getRequest("/api/getScrap");
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

    const navigate = useNavigate();

    const location = useLocation();

    const initalPageLoad = async () => {
        const loc = location.pathname.split("/");
        console.log(loc);
        if (loc.length <= 2) {
            setShowTrackScrap(false)
            setShowScrapTable(true)
            setShowScrapApprove(false)
            setShowScrap(false)
        } else if (loc.length > 2 && loc[2] == "track") {
            setShowTrackScrap(true)
            setShowScrapTable(false)
            setShowScrapApprove(false)
            setShowScrap(false)
        } else if (loc.length > 2 && loc[2] == "approve") {
            setShowTrackScrap(false)
            setShowScrapTable(false)
            setShowScrapApprove(true)
            setShowScrap(false)
        } else if (loc.length > 2 && loc[2] == "request") {
            setShowScrap(true)
            setShowTrackScrap(false)
            setShowScrapTable(false)
            setShowScrapApprove(false)
        } else {
            navigate("/404");
        }
    }

    useEffect(() => {
        if (!Cookies.get("token")) {
            navigate("/");
        } else {
            initalPageLoad();
            getUser();
            fetchStockData();
            fetchTableData();
            if (user.role == 'slsincharge') {
                fetchScrapData();
            }
        }
    }, [Cookies.get("token")])

    useEffect(() => {
        if ((user.role == "slsincharge" ?
            tableData.length > 0 && scrapData.length > 0 && stockData.length > 0 :
            tableData.length > 0 && stockData.length > 0)) {
            setIsLoading(false);
        }
    }, [scrapData, stockData, tableData])

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
                            <div className="text-2xl navTransferHeading font-bold text-blue-700 ">Scrap</div>
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
                                        >
                                            <a href='/scrap'>
                                                Home
                                            </a>
                                        </div>
                                        <div
                                            className={`cursor-pointer font-bold text-black whitespace-nowrap ${showTrackScrap == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                                        >
                                            <a href='/scrap/track'>
                                                Track Your Request
                                            </a>
                                        </div>
                                        {user.role == "slsincharge" &&
                                            <div
                                                className={`cursor-pointer font-bold text-black whitespace-nowrap ${showScrapApprove == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                                            >
                                                <a href='/scrap/approve'>
                                                    Approval Request
                                                </a>
                                            </div>
                                        }
                                        <div
                                            className={`cursor-pointer font-bold text-black whitespace-nowrap ${showScrap == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                                        >
                                            <a href='/scrap/request'>
                                                Scrap
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Table
                scrapData={tableData}
                isVisible={showScrapTable}
            />

            <ScrapTrack
                isVisible={showTrackScrap}
                setMessage={setMessage}
                setError={setError}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                fetchPendingData={fetchPendingData}
                pendingData={pendingData}
            />

            <ScrapApprove
                isVisible={showScrapApprove}
                onClose={() => setShowScrapApprove(false)}
                user={user}
                setMessage={setMessage}
                setError={setError}
                scrapData={scrapData}
                fetchScrapData={fetchScrapData}
                noData={noData}
                fetchTableData={fetchTableData}
            />
            {/* <ScrapRequest
                isVisible={showScrap}
                onClose={() => setShowScrap(false)}
                user={user}
                setMessage={setMesaage}
                setError={setError}
                fetchScrapTrackData={fetchScrapTrackData}
            /> */}

            <ScrapRequestTable
                isVisible={showScrap}
                user={user}
                setMessage={setMessage}
                setError={setError}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                fetchTableData={fetchTableData}
                fetchPendingData={fetchPendingData}
                getStock={stockData}
                fetchGetStock={fetchStockData}
                noRequestData={noRequestData}
            />

        </>
    )
}

export default Scrap