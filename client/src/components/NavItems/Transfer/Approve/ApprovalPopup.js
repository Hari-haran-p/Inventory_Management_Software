import React from 'react'
import TransferCard from './TransferCard';

function ApprovalPopup({ isVisible, setMessage, setError, transferData, fetchTransferData, noData, fetchPendingData, fetchOverallTranferedData }) {

    if (!isVisible) return null;

    return (
        <>
            <div className="">
                <div className=" w-full">
                    <div
                        style={{
                            height: '100vh',
                            width: "100%",
                            margin: '15px',
                        }}
                        className="flex flex-col"
                    >
                        <div style={{ backgroundColor: "#F4F4F4" }} className=" px-10 py-5 w-full h-full overflow-x-auto overflow-y-auto border-gray-700 rounded-lg">
                            <div className="w-full text-end pr-10">
                            </div>
                            <div className="  flex flex-col items-center">
                                <div
                                    style={{ width: "100%", height: "30%" }}
                                    class="overflow-x-auto overflow-y-auto"
                                >
                                    <div className="pt-8 flex flex-col  gap-10 ">
                                        <span className=' font-bold text-xl'>Pending request:</span>
                                        {noData ? <div>No Request Available</div> : (
                                            transferData && transferData.map((data) =>
                                                <>
                                                    <TransferCard data={data} setMessage={setMessage} setError={setError} fetchTransferData={fetchTransferData} fetchPendingData={fetchPendingData} fetchOverallTranferedData={fetchOverallTranferedData} />
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

export default ApprovalPopup