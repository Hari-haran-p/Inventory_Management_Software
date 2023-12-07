import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TransferCard from './TransferCard';
import RejectPopup from './RejectPopup';

const ScrapApprove = ({ onClose, isVisible, user, setMesaage, setError, scrapData, noData ,fetchScrapData}) => {



    // console.log(scrapData);
    if (!isVisible) return null;

    return (
        <>
            <div className="flex justify-center items-center  z-40">
                <div className=" w-full flex justify-center items-center">
                    <div
                        style={{
                            height: '100vh',
                            width: "100%",
                            display: 'flex',
                        
                            justifyContent: 'center',
                            margin: '15px',
                        }}
                        className="flex flex-col"
                    >
                        <div className="bg-white w-5/6 h-5/6 overflow-x-auto overflow-y-auto border-gray-700 rounded-lg">
                            {/* <div className="w-full text-end pr-10">
                                <button
                                    className="text-black fixed z-50 rounded-full border-2 border-black px-2 text-3xl"
                                    onClick={() => onClose()}
                                >
                                    X
                                </button>
                            </div> */}
                            <div className="  flex flex-col">
                                {/* <div className="py-1 flex pb-8 pt-8">
                                    <span className="px-1 text-black font-medium text-2xl whitespace-nowrap">
                                        Scrap Request
                                    </span>
                                </div> */}
                                <div
                                    style={{ width: "100%", height: "30%" }}
                                    class="relative rounded-2xl overflow-x-auto overflow-y-auto"
                                >
                                    <div className="pt-8 flex flex-col  gap-10 ">
                                        <span className=' font-bold text-xl'>Pending request:</span>
                                        {noData ? <div>No Data</div> : (
                                            scrapData && scrapData.map((data) =>
                                                <>
                                                    <TransferCard setMessage={setMesaage} fetchScrapData={fetchScrapData} setError={setError} data={data} user={user} onClose={onClose} />
                                                </>
                                            )
                                        )}
                                    </div>
                                </div>
                                <button id="scrollToTopButton">Scroll to Top</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScrapApprove