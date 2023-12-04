import React from 'react'
import TransferCard from './TransferCard';

function ApprovalPopup({ isVisible, transferData, onClose, setError, setMessage, user, noData }) {
    

    if (!isVisible) return null;
    return (
        <>
            <div className="">
                <div className=" inset-0 w-full">
                    <div
                        style={{
                            height: '100vh',
                            width: "100%",

                            margin: '15px',
                        }}
                        className="flex flex-col"
                    >
                        <div className="bg-white px-10 py-5 w-5/6 h-5/6 overflow-x-auto overflow-y-auto border-gray-700 rounded-lg">
                            <div className="w-full text-end pr-10">
                                <button
                                    className="text-black fixed z-50 rounded-full border-2 border-black px-2 text-3xl"
                                    onClick={() => onClose()}
                                >
                                    X
                                </button>
                            </div>
                            <div className="  flex flex-col items-center">
                                <div className="py-1 flex pb-8 pt-8">
                                    <span className="px-1 text-black font-medium text-2xl whitespace-nowrap">
                                        Pending Requests
                                    </span>
                                </div>
                                <div
                                    style={{ width: "100%", height: "30%" }}
                                    class="relative rounded-2xl overflow-x-auto overflow-y-auto"
                                >
                                    <div className="pt-8 flex flex-col  gap-10 ">
                                        <span className=' font-bold text-xl'>Pending request:</span>
                                        {console.log(transferData)}
                                        {noData ? <div>No Data</div> : (
                                            transferData && transferData.map((data) =>
                                                <>
                                                    <TransferCard setMessage={setMessage} setError={setError} data={data} user={user} onClose={onClose} />
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