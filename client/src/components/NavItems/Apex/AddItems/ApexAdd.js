import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../../AuthContext';
import Table from './Table';


function ApexAdd({ isVisible }) {

    const { getRequest, BackendUrl, user } = useAuth();
    const [tableData, setTableData] = useState([]);
    const [noData, setNoData] = useState(true);

    const fetchApexItems = async () => {
        try {
            const response = await getRequest(`${BackendUrl}/api/getApexItems/${user.user_id}`);
            const data = response.data.Data;
            if (data.length > 0) {
                setNoData(false);
                setTableData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchApexItems();
    }, [])

    if (!isVisible) return null;

    return (
        <>
            <div style={{ backgroundColor: "#F4F4F4" }} className="bg-white h-full flex items-start justify-center overflow-x-auto overflow-y-auto border-gray-700 rounded-lg w-full">
                {noData ? (
                    <div>No Stocks added to this apex</div>
                ) :
                    <Table
                        stockData={tableData}
                        user={user}
                    />
                }
            </div>
        </>
    )
}

export default ApexAdd