// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const TrackCard = ({ data, onClose, user, setMessage, setError }) => {

//     const [isLoading, setIsLoading] = useState(false);


//     const handleCancel = async (e) => {
//         try {
//             setIsLoading(true);
//             e.preventDefault();
//             const response = await axios.post("http://localhost:4000/api/cancelTransferRequest",
//                 {
//                     transfer_id: data.id,
//                     dept_id: user.dept_code
//                 })
//             if (response) {
//                 setIsLoading(false);
//                 setMessage(response.data.Data);
//                 console.log(response.data)
//                 onClose();
//             }
//         } catch (error) {
//             if (error) {
//                 setIsLoading(false);
//                 setError(error.response.data.Data)
//                 console.error(error);
//                 onClose();
//             }
//         }
//     }

//     const handleDelete = async (e) => {
//         try {
//             setIsLoading(true);
//             e.preventDefault();
//             const response = await axios.post("http://localhost:4000/api/deleteTransferRequest",
//                 {
//                     transfer_id: data.id,
//                     dept_id: user.dept_code
//                 })
//             if (response) {
//                 setIsLoading(false);
//                 setMessage(response.data.Data);
//                 console.log(response.data)
//                 onClose();
//             }
//         } catch (error) {
//             if (error) {
//                 setIsLoading(false);
//                 setError(error.response.data.Data)
//                 console.error(error);
//                 onClose();
//             }
//         }
//     }

//     return (

//         <>
//             {isLoading ? (
//                 <div className="flex justify-center items-center h-full"><span class="loader"></span></div>
//             ) : (
//                 <div className="relative animate track-card w-11/12 rounded-xl overflow-hidden">
//                     {/* <div class="pl-4">{index + 1}</div> */}
//                     <div className="flex flex-wrap">
//                         <div class="px-6 py-4 whitespace-nowrap">Item Code:{data.item_code}</div>
//                         <div class="px-6 py-4 whitespace-nowrap">Item Type:{data.item_type}</div>
//                         <div class="px-6 py-4 whitespace-nowrap">Item Name:{data.item_name}</div>

//                     </div>
//                     <div className="flex flex-wrap">
//                         <div class="px-6 py-4 whitespace-nowrap">Item Subname: {data.item_subname}</div>
//                         <div class="px-6 py-4 whitespace-nowrap">Item Spec: {data.item_description}</div>
//                         <div class="px-6 py-4 whitespace-nowrap">Requested From: {data.transfered_from}</div>
//                         <div class="px-6 py-4 whitespace-nowrap">Transfer Quantity: {data.transfer_qty}</div>
//                     </div>
//                     <div className="flex flex-wrap items-center">
//                         <div class="px-6 py-4 whitespace-nowrap">Cost Per Item : {data.cost_per_item}</div>
//                         <div class="px-6 py-4 ">Status : {data.status}</div>
//                         {data.status == "PENDING" ? (
//                             <button
//                                 onClick={handleCancel}
//                                 class="border border-red-500 h-10 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline">
//                                 Cancel
//                             </button>
//                         ) : null}
//                         {data.status == "CANCELED" ? (
//                             <button
//                                 onClick={handleDelete}
//                                 class="border border-red-500 h-10 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline">
//                                 Delete
//                             </button>
//                         ) : null
//                         }
//                     </div>
//                 </div >
//             )}
            
//         </>

//     )
// }

// export default TrackCard