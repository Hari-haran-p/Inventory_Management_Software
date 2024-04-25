import React, { useEffect, useState } from 'react'

const RejectPopup = ({ isVisible, onClose, getRejectDesc, rejectDesc, setError, handleReject, setRejectDesc }) => {


    if (!isVisible) return null;

    return (
        <>
            {/* <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                <div
                    style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", margin: "15px" }}
                    className="flex flex-col ">
                    <div className="bg-white px-10 py-5 animate1 overflow-x-auto overflow-y-auto border-gray-700 rounded-lg">
                        <div className="w-full text-end">
                            <button
                                className="text-black rounded-full border-2 border-black px-2 text-3xl"
                                onClick={() => onClose()}
                            >
                                X
                            </button>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div class="py-1 flex  pb-8 ">
                                <span class="px-1 text-black font-medium text-2xl whitespace-nowrap">
                                    Reject reason
                                </span>
                            </div>
                            <form onSubmit={(e)=>handleReject(e)}>
                                <div className="">
                                    <div class="py-1 flex flex-wrap">
                                        <span class="px-1 py-1 whitespace-nowrap text-md text-gray-600">
                                            reason for reject
                                        </span>
                                        <input
                                            type="text"
                                            value={rejectDesc}
                                            onChange={(e) => setRejectDesc(e.target.value)}
                                            className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                        />
                                    </div>
                                    <center>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 mt-4 px-10 rounded mb-10"
                                            type='submit'
                                        >
                                            Rject
                                        </button>
                                    </center>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
                <div
                    style={{ width:"80%", display: "flex", alignItems: "center", justifyContent: "center", }}
                    className="flex flex-col ">
                    <div className="bg-white h-5/6 w-5/6 px-10  animate1 overflow-x-auto overflow-y-auto border-gray-700 rounded-lg">
                        <div className="w-full text-end">
                            <button
                                className="text-black fixed  rounded-full mt-5 border-2 border-black px-2 text-3xl"
                                onClick={() => onClose()}
                            >
                                X
                            </button>
                        </div>
                        <div className="flex flex-col justify-center pt-6 items-center">
                            <form onSubmit={(e)=>handleReject(e)}>
                                <div className="">
                                    <div class="py-1 flex flex-wrap">
                                        <span class="px-1 py-1 whitespace-nowrap text-md text-gray-600">
                                            Reason for reject
                                        </span>
                                        <input
                                            type="text"
                                            value={rejectDesc}
                                            onChange={(e) => setRejectDesc(e.target.value)}
                                            className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                        />
                                    </div>
                                    <center>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 mt-4 px-10 rounded mb-10"
                                            type='submit'
                                        >
                                            Reject
                                        </button>
                                    </center>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RejectPopup