import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../AuthContext';
import Table from './Table';
import { useLocation, useNavigate } from 'react-router-dom';
import TrackApex from './Track/TrackApex';


function Apex() {


    //<<<<---------------Context variables and functions------------------>>>>
    const { getUser, user, getRequest, BackendUrl } = useAuth();


    // <<<<-----------Loading , Message and Error state variables--------------->>>>
    const [isLoading, setIsLoading] = useState(false);

    const [message, setMessage] = useState(null);

    const [error, setError] = useState(null);

    // <<<<------------Top nave bar erlated state variables and functions---------->>>>
    const cuurNavState = localStorage.getItem('apexNavState') == null ? true : JSON.parse(localStorage.getItem('apexNavState'));

    const [isArrowRotated, setIsArrowRotated] = useState(cuurNavState);

    const [isNavbarVisible, setIsNavbarVisible] = useState(cuurNavState);

    const toggleNavbar = () => {
        localStorage.setItem("apexNavState", JSON.stringify(!isArrowRotated));
        setIsNavbarVisible((prev) => !prev);
        setIsArrowRotated((prev) => !prev);
    };

    // <<<<----------Home table related variables and functions ------------------>>>>

    const [showApexTable, setShowApexTable] = useState(true);

    const [tableData, setTableData] = useState([]);

    async function fetchApexTableData() {
        try {
            const response = await getRequest(`${BackendUrl}/api/getApexTableData`);
            if (response.status === 200) {
                setTableData(response.data.Data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //<<<<-----------------Consume Tracking related state varibles and fetch functions--------------------->>>>
    const [pendingData, setPendingData] = useState({});

    const [showTrackApex, setShowTrackApex] = useState(false);

    const fetchPendingData = async () => {
        try {
            const response = await getRequest(
                `${BackendUrl}/api/getApexCardData/${user.user_id}`
            );
            setPendingData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    console.log(pendingData);

    const navigate = useNavigate();
    const location = useLocation();

    const initialPageLoad = () => {
        const loc = location.pathname.split("/");
        console.log(loc);
        if (loc.length <= 2) {
            setShowApexTable(true);
            setShowTrackApex(false)
        } else if (loc.length > 2 && loc[2] === 'track') {
            setShowApexTable(false);
            setShowTrackApex(true)
        } else {
            navigate("/404");
        }
    }


    useEffect(() => {
        fetchApexTableData();
        fetchPendingData();
        initialPageLoad();
        getUser();
    }, [])


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
                                <div className="text-2xl navTransferHeading font-bold text-blue-700 ">Apex</div>
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
                                                className={`cursor-pointer font-bold text-black whitespace-nowrap ${showApexTable == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4 `}
                                            >
                                                <a href="/apex" >
                                                    Home
                                                </a>
                                            </div>
                                            <div
                                                className={`cursor-pointer font-bold text-black whitespace-nowrap ${showTrackApex == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                                            >
                                                <a href="/apex/track">
                                                    Track Your Request
                                                </a>
                                            </div>

                                            <div
                                                className={`cursor-pointer font-bold text-black whitespace-nowrap ${false == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                                            >
                                                <a href="/apex/approve">
                                                    Approval Request
                                                </a>
                                            </div>
                                            <div
                                                className={`cursor-pointer font-bold text-black whitespace-nowrap ${false == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                                            >
                                                <a href="/apex/request">
                                                    Request Transfer
                                                </a>
                                            </div>
                                            {user.role == "slsincharge" &&
                                                <button
                                                    className={`cursor-pointer font-bold text-black whitespace-nowrap ${false == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                                                >
                                                    <a href="/apex/import">
                                                        <span>Bulk Transfer</span>
                                                    </a>
                                                </button>
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Table
                        isVisible={showApexTable}
                        apexData={tableData}
                    />

                    <TrackApex
                        isVisible={showTrackApex}
                        user={user}
                        setMessage={setMessage}
                        setError={setError}
                        fetchPendingData={fetchPendingData}
                        // fetchOverallTranferedData={fetchOverallTranferedData}
                        pendingData={pendingData}

                    />
                </div>
            )}
        </>

    )
}

export default Apex