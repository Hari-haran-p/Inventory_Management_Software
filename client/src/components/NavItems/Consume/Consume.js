import React, { useEffect, useState } from 'react'
import Table from './Table';
import { useAuth } from '../../../AuthContext';
import Cookies from 'js-cookie';
import { json, useLocation, useNavigate } from 'react-router-dom';
import ConsumeTrack from './Track/ConsumeTrack';
import ConsumeApprove from './Approve/ScrapApprove';
import ConsumeRequestTable from './Request/ConsumeRequest';

const Consume = () => {

    //<<<<------------Context get user variable and function------------------>>>>
    const { user, getUser, getRequest, BackendUrl } = useAuth();

    //<<<<------------loading , message and error state variables------------------>>>>
    const [isLoading, setIsLoading] = useState(true);

    const [message, setMesaage] = useState(null);

    const [error, setError] = useState(null);


    //<<<<------------Top navbar state variables------------------>>>>
    const cuurNavState = window.innerWidth < 800 ? false : localStorage.getItem('consumeNavState') == null ? true :  JSON.parse(localStorage.getItem('consumeNavState'));

    const [isArrowRotated, setIsArrowRotated] = useState(cuurNavState);

    const [isNavbarVisible, setIsNavbarVisible] = useState(cuurNavState);

    const toggleNavbar = () => {
        localStorage.setItem("consumeNavState", JSON.stringify(!isArrowRotated));
        setIsNavbarVisible((prev) => !prev);
        setIsArrowRotated((prev) => !prev);
    };


    //<<<<------------visibility state variables------------------>>>>
    const [showTrackConsume, setShowTrackConsume] = useState(false);

    const [showConsumeApprove, setShowConsumeApprove] = useState(false);

    const [showConsume, setShowConsume] = useState(false);

    const [showConsumeTable, setShowConsumeTable] = useState(true);


    //<<<<-----------------Consume main table related state variables and fetch fucntions--------------------->>>>

    const [tableData, setTableData] = useState([]);

    async function fetchTableData() {
        const response = await getRequest(`${BackendUrl}/api/getTableConsumeData`);
        if (response && response.status == 200) {
            if (response.data.Data == "No Data") {
                setIsLoading(false);
            } else {
                setTableData(response.data.Data);
            }
        } else {
        }
    }

    //<<<<-----------------Consume Tracking related state varibles and fetch functions--------------------->>>>
    const [pendingData, setPendingData] = useState([]);

    const fetchPendingData = async () => {
        try {
            const response = await getRequest(
                `${BackendUrl}/api/getConsumeCardData/${user.user_id}`
            );
            setPendingData(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    //<<<<--------------------Consume Request related variables and function----------------->>>>
    const [requestTabledata, setRequestTabledata] = useState([]);

    const [noRequestData, setNoRequestData] = useState(true);

    const fetchRequestTableData = async () => {
        try {
            const response = await getRequest(`${BackendUrl}/api/getRequestTableData/${user.dept_code}`);
            if (response && response.status == 200) {
                if (response.data.Data == "No Data") {
                    setNoRequestData(true);
                    setIsLoading(false);
                } else {
                    setNoRequestData(false);
                    setRequestTabledata(response.data.Data);
                }
            } else {
                setNoRequestData(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    //<<<<------------------Consume Approval related state variables and fetch functions--------------->>>>

    const [consumeData, setConsumeData] = useState([]);

    const [noData, setNoData] = useState(true);

    async function fetchConsumeData() {
        const response = await getRequest(`${BackendUrl}/api/getConsume`);
        if (response && response.status == 200) {
            if (response.data.Data == "No Data") {
                setNoData(true);
                setIsLoading(false);
            } else {
                setNoData(false);
                setConsumeData(response.data.Data);
            }
        } else {
            setNoData(true);
        }
    }

    const navigate = useNavigate();
    const location = useLocation();

    const initialPageLoad = async () => {
        const loc = location.pathname.split("/");
        if (loc.length <= 2) {
            setShowTrackConsume(false)
            setShowConsumeTable(true)
            setShowConsumeApprove(false)
            setShowConsume(false)
        } else if (loc.length > 2 && loc[2] == "track") {
            setShowTrackConsume(true)
            setShowConsumeTable(false)
            setShowConsumeApprove(false)
            setShowConsume(false)
        } else if (loc.length > 2 && loc[2] == "approve") {
            setShowTrackConsume(false)
            setShowConsumeTable(false)
            setShowConsumeApprove(true)
            setShowConsume(false)
        } else if (loc.length > 2 && loc[2] == "request") {
            setShowConsume(true)
            setShowTrackConsume(false)
            setShowConsumeTable(false)
            setShowConsumeApprove(false)
        } else {
            navigate("/404");
        }
    }

    useEffect(() => {
        if (!Cookies.get("token")) {
            navigate("/");
        } else {
            initialPageLoad();
            getUser();
            fetchRequestTableData();
            fetchTableData();
            if (user.role == 'slsincharge') {
                fetchConsumeData();
            }
        }
    }, [Cookies.get("token")])

    const stopIsLoading = () => {
        if ((user.role == "slsincharge" ?
            tableData.length > 0 && consumeData.length > 0 && requestTabledata.length > 0 :
            tableData.length > 0 && requestTabledata.length > 0)) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        stopIsLoading();
    }, [consumeData, requestTabledata, tableData])

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
                                            className={`cursor-pointer font-bold text-black whitespace-nowrap ${showConsumeTable == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4 `}
                                        >
                                            <a href='/consume'>
                                                Home
                                            </a>
                                        </div>
                                        <div
                                            className={`cursor-pointer font-bold text-black whitespace-nowrap ${showTrackConsume == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                                        >
                                            <a href='/consume/track'>
                                                Track
                                            </a>
                                        </div>
                                        {user.role == "slsincharge" &&
                                            <div
                                                className={`cursor-pointer font-bold text-black whitespace-nowrap ${showConsumeApprove == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                                            >
                                                <a href='/consume/approve'>
                                                    Approval Request
                                                </a>
                                            </div>
                                        }
                                        <div
                                            className={`cursor-pointer font-bold text-black whitespace-nowrap ${showConsume == true ? ' border-blue-700 border-b-4' : ''} hover:border-blue-700 hover:border-b-4`}
                                        >
                                            <a href='/consume/request'>
                                                Consume
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
                isVisible={showConsumeTable}
                consumeData={tableData}
            />

            <ConsumeTrack
                isVisible={showTrackConsume}
                setMesaage={setMesaage}
                setError={setError}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                fetchPendingData={fetchPendingData}
                pendingData={pendingData}
            />

            <ConsumeApprove
                isVisible={showConsumeApprove}
                onClose={() => setShowConsumeApprove(false)}
                user={user}
                setMesaage={setMesaage}
                setError={setError}
                consumeData={consumeData}
                fetchConsumeData={fetchConsumeData}
                fetchPendingData={fetchPendingData}
                fetchTableData={fetchTableData}
                noData={noData}
            />

            <ConsumeRequestTable
                user={user}
                isVisible={showConsume}
                setIsLoading={setIsLoading}
                setMessage={setMesaage}
                setError={setError}
                requestTabledata={requestTabledata}
                fetchGetStock={fetchRequestTableData}
                noRequestData={noRequestData}
                fetchTableData={fetchTableData}
                fetchPendingData={fetchPendingData}
            />
        </>
    )
}

export default Consume