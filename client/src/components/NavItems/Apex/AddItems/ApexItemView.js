import React, { useEffect, useState } from 'react'
import ApexView from './Components/ApexView'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../../../AuthContext';
import ItemTable from './Components/ItemTable';

function ApexItemView({ isVisible }) {

    const location = useLocation();
    const id = location.pathname.split("/")[3];

    const { user, getRequest, BackendUrl } = useAuth();

    const [apexData, setApexData] = useState();

    const fetchApexById = async () => {
        try {
            const response = await getRequest(`${BackendUrl}/api/getApexbyId/${id}`);
            setApexData(response.data.Data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const [apexItemsData, setApexItemsData] = useState([]);

    const fetchApexItemsById = async () => {
        try {
            const response = await getRequest(`${BackendUrl}/api/getApexItemsById/${id}`);
            setApexItemsData(response.data.Data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchApexById();
        fetchApexItemsById();
    }, []);

    if (!isVisible) return null

    return (
        <>
            <div className='h-full gap-5 w-full p-6 pl-16'>
                <div className=''>
                    <h2 className='text-blue-700 font-semibold text-xl pb-5'>Apex Details</h2>
                    <ApexView
                        data={apexData}
                    />
                </div>
                <div className=' w-full'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-blue-700 font-semibold text-xl pt-5 pb-5 w-full h-full'>List </h2>
                        <div className='flex gap-2'>
                            <button
                                class="border border-blue-400 h-8 bg-blue-400 text-white flex items-center justify-center rounded-md px-2 py-2  transition duration-500 ease select-none hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                            >
                                Upload
                            </button>
                            <button
                                class="border border-green-400 h-8 bg-green-400 text-white flex items-center justify-center rounded-md px-2 py-2  transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        {apexItemsData.length > 0 ? (
                            <ItemTable
                                data={apexItemsData}
                                user={user}
                            />

                        ) : (
                            "No Items Added Yet"
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApexItemView