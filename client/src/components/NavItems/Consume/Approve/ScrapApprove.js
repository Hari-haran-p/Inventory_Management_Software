import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TransferCard from './TransferCard';
import RejectPopup from './RejectPopup';

const ConsumeApprove = ({ onClose, isVisible, user, setMesaage, setError, scrapData, noData ,fetchScrapData}) => {



    // console.log(scrapData);
    if (!isVisible) return null;

    return (
        <>
            <div className="z-40 w-full">
                        <div className="bg-white m-2 p-10 overflow-x-auto overflow-y-auto border-gray-700 rounded-lg">

                            <div className="  flex flex-col">
                                <div
                                    style={{ width: "100%", height: "30%" }}
                                    class=" rounded-2xl overflow-x-auto overflow-y-auto"
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
        </>
    )
}

export default ConsumeApprove