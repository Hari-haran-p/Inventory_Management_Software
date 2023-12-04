import React, { useEffect, useState } from 'react'
import Table from './Table';
import axios from 'axios';
import { useAuth } from '../../../AuthContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import ScrapTrack from './Track/ScrapTrack';
import ScrapApprove from './Approve/ScrapApprove';
import ScrapRequest from './Request/ScrapRequest';

const Scrap = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [stockData, setStockData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [scrapData, setScrapData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [scrapTrackData, setScrapTrackData] = useState([]);

    const [noData, setNoData] = useState(true);
    const [noTrackData, setNoTrackData] = useState(true);
    const [noTableData, setNoTableData] = useState(true);


    async function fetchScrapData() {
        const response = await axios.get("http://localhost:4000/api/getScrap");
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
        const response = await axios.get("http://localhost:4000/api/getTableScrapData");
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
        const response = await axios.get(`http://localhost:4000/api/getScrapData/${id}`);
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

    const [message, setMesaage] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { user, getUser } = useAuth();

    const fetchStockData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/getAdminStockData");
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
                    <div className='text-2xl flex justify-between '>
                        <h2 className=' whitespace-nowrap'>Scrap Stocks:</h2>
                        <div className=' flex flex-wrap pr-10 gap-5'>
                            <div
                                className="bg-blue-500 animate1 whitespace-nowrap hover:bg-blue-700 text-white text-sm h-10 py-2 px-4 rounded w-42"
                                onClick={() => setShowTrackScrap(true)}
                            >
                                Track Your Request
                            </div>
                            {user.role == 'slsincharge' && (
                                <div
                                    className="bg-blue-500 animate1 whitespace-nowrap hover:bg-blue-700 text-white text-sm h-10 py-2 px-4 rounded w-42"
                                    onClick={() => setShowScrapApprove(true)}
                                >
                                    Approve Request
                                </div>
                            )}
                            <div
                                className="bg-blue-500 animate1  whitespace-nowrap hover:bg-blue-700 text-white h-10 text-sm  py-2 px-6 rounded w-42"
                                onClick={() => setShowScrap(true)}
                            >
                                Scrap
                            </div>
                        </div>
                    </div>
                    <div className='pt-10'>
                        <h4>Your scap history:</h4>
                        <div className=' flex justify-center pt-10'>
                            <Table scrapData={tableData} />
                        </div>
                    </div>
                </div>
            )}
            <ScrapTrack
                isVisible={showTrackScrap}
                onClose={() => setShowTrackScrap(false)}
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
            <ScrapApprove
                isVisible={showScrapApprove}
                onClose={() => setShowScrapApprove(false)}
                user={user}
                setMesaage={setMesaage}
                setError={setError}
                scrapData={scrapData}
                fetchScrapData={fetchScrapData}
                noData={noData}
            />
            <ScrapRequest
                isVisible={showScrap}
                onClose={() => setShowScrap(false)}
                user={user}
                setMessage={setMesaage}
                setError={setError}
                fetchScrapTrackData={fetchScrapTrackData}
            />

        </>
    )
}

export default Scrap