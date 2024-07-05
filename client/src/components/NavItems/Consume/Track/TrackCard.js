import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../../../AuthContext';

const TrackCard = ({ data, setMesaage, setError, setIsLoading, fetchPendingData }) => {
    const { user, getUser } = useAuth();

    const handleCancel = async (e) => {
        try {
            if (window.confirm("Are you sure want to cancel ?")) {
                setIsLoading(true);
                e.preventDefault();
                const response = await axios.post("http://localhost:4000/api/cancelConsumeRequest",
                    {
                        consume_id: data.id,
                        dept_id: user.dept_code,
                        user_id: user.user_id
                    })
                console.log(response);
                if (response.data.success) {
                    console.log("responded");
                    setIsLoading(false);
                    console.log(user.dept_code);
                    fetchPendingData();
                    setMesaage(response.data.Data);
                }
            }
        } catch (error) {
            if (error) {
                setIsLoading(false);
                console.log(error);
                // setError(error.response.data.Data)
                fetchPendingData();
            }
        }
    }

    const handleDelete = async (e) => {
        try {
            if (window.confirm("Are you sure want to delete ?")) {
                setIsLoading(true);
                e.preventDefault();
                const response = await axios.post(
                    "http://localhost:4000/api/deleteConsumeRequest",
                    {
                        consume_id: data.id,
                        dept_id: user.dept_code,
                        user_id: user.user_id
                    }
                );
                if (response) {
                    setIsLoading(false);
                    fetchPendingData();
                    setMesaage(response.data.Data);
                }
            }
        } catch (error) {
            if (error) {
                setIsLoading(false);
                fetchPendingData();
                setError(error.response.data.Data);
            }
        }
    };

    const toSentenceCase = (str) => {
        str = str.toLowerCase().split(" ").map(function (s) {
            return s.charAt(0).toUpperCase() + s.slice(1)
        })
        return str.join(" ")
    }

    return (
        <>
            <div className=" track-card w-full rounded-xl overflow-hidden p-10">
                <div className="flex flex-col flex-wrap">
                    <div className="flex justify-between flex-wrap items-center pb-2">
                        <div className="flex items-center flex-wrap gap-2 ">
                            <div className="text-lg font-bold">Stock Id :</div>
                            <div className="font-bold text-indigo-700">
                                {data.stock_id}
                            </div>
                        </div>

                        <div className="flex gap-2 flex-wrap items-center ">
                            <div className="text-lg font-bold">Item Name :</div>
                            <div className="font-bold text-indigo-700">
                                {toSentenceCase(data.item_name)}
                            </div>
                        </div>
                    </div>

                    <div className="border-2 border-black" />
                    <br />
                    <div className="flex justify-between flex-wrap">
                        <div className="lg:text-start flex flex-col gap-5">
                            <div className="flex flex-col">
                                <div className="text-sm ">Item Type</div>
                                <div className="font-bold  text-indigo-700">
                                    {data.item_type}
                                </div>
                            </div>
                            <div className="flex flex-col ">
                                <div className="text-sm ">Date</div>
                                <div className="font-bold  text-indigo-700">
                                    {data.date.split("T")[0]}
                                </div>
                            </div>
                        </div>
                        <div className="lg:text-center flex flex-col gap-5">
                            <div className="flex flex-col ">
                                <div className="text-sm ">Item Subname</div>
                                <div className="font-bold text-indigo-700">
                                    {data.item_subname}
                                </div>
                            </div>
                            <div className="flex flex-col ">
                                <div className="text-sm ">Cost Per Item</div>
                                <div className="font-bold text-indigo-700">
                                    Rs. {data.inventory_value}
                                </div>
                            </div>

                        </div>
                        <div className=" lg:text-end flex flex-col gap-5">
                            <div className="flex flex-col ">
                                <div className="text-sm ">Consume Qty</div>
                                <div className="font-bold  text-indigo-700">
                                    {data.consume_qty} nos
                                </div>
                            </div>

                            <div className="flex flex-col ">
                                <div className="text-sm ">Inventory Venue</div>
                                <div className="font-bold  text-indigo-700">
                                    Rs. {data.inventory_value}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="flex justify-between items-center">
                    {data.status == "REJECTED" &&
                        <div className="flex flex-col ">
                            <div className="text-sm ">Rejected Reason</div>
                            <div className="font-bold  text-indigo-700">
                                {data.reject_description.slice(0, 70)}{data.reject_description.length > 70 && <span>....</span>}
                            </div>
                        </div>
                    }
                    {data.status == "INITIATED" ? (
                        <button
                            onClick={handleCancel}
                            class="border border-red-500 h-10 bg-red-500 text-white rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    ) : null}
                    {data.status == "CANCELLED" ? (
                        <button
                            onClick={handleDelete}
                            class="border border-red-500 h-10 bg-red-500 text-white rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                        >
                            Delete
                        </button>
                    ) : null}
                    <div className="flex flex-col">
                        <div className={`text-lg border-2 ${data.status == 'INITIATED' ? "border-indigo-500 rounded-md p-1  text-indigo-700 bg-indigo-100" : data.status == 'CANCELLED' ? "border-red-500  text-red-700 rounded-md p-1 bg-red-100" : data.status == 'LABAPPROVED' ? "border-orange-500  text-orange-700 rounded-md p-1 bg-orange-100" : data.status == 'APPROVED' ? "border-green-500 text-green-700  rounded-md p-1 bg-green-100" : data.status == "REJECTED" ? "border-red-500 text-red-700 rounded-md p-1 bg-red-100" : ""} `}>Status :
                            <span className={`font-bold`}>
                                {" "} {data.status}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default TrackCard