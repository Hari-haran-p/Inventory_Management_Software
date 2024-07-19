import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../AuthContext";

const TrackCard = ({ data, onClose, user, setMessage, setError, fetchPendingData, fetchOverallTranferedData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {BackendUrl} = useAuth();

  const handleCancel = async (e) => {

    try {
      setIsLoading(true);
      e.preventDefault();
      const response = await axios.post(`${BackendUrl}/api/cancelTransferRequest`,
        {
          transfer_id: data.id,
          dept_id: user.dept_code
        })
      if (response) {
        setIsLoading(false);
        fetchPendingData();
        fetchOverallTranferedData();
        setMessage(response.data.Data);
      }
    } catch (error) {
      if (error) {
        setIsLoading(false);
        fetchPendingData();
        fetchOverallTranferedData();
        setError(error.response.data.Data)

      }
    }
  }

  const handleAcknowledge = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BackendUrl}/api/acknowledgeTransfer`, { ...data, ...user })
      if (response) {
        setIsLoading(false);
        fetchPendingData();
        fetchOverallTranferedData();
        setMessage(response.data.Data);
        // onClose();
      }
    } catch (error) {
      if (error) {
        setIsLoading(false);
        setError(error.response.data.Data)
        fetchOverallTranferedData();
        console.error(error);
      }
    }
  }


  const handleDelete = async (e) => {
    try {
      if (window.confirm("Are you sure want toi delete ?")) {
        setIsLoading(true);
        e.preventDefault();
        const response = await axios.post(
          `${BackendUrl}/api/deleteTransferRequest`,
          {
            transfer_id: data.id,
            dept_id: user.dept_code,
          }
        );
        if (response) {
          setIsLoading(false);
          fetchPendingData();
          fetchOverallTranferedData();
          setMessage(response.data.Data);
        }
      }

    } catch (error) {
      if (error) {
        setIsLoading(false);
        fetchPendingData();
        fetchOverallTranferedData();
        setError(error.response.data.Data);
      }
    }
  };

  // const toSentenceCase = (str) => {
  //   str = str.toLowerCase().split(" ").map(function (s) {
  //     return s.charAt(0).toUpperCase() + s.slice(1)
  //   })
  //   return str.join(" ")
  // }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <span class="loader"></span>
        </div>
      ) : (
        <div className="track-card w-full rounded-xl overflow-hidden p-10">
          <div className="flex flex-col flex-wrap">

            <div className="flex justify-between flex-wrap items-center pb-2">
              <div className="flex items-center flex-wrap gap-2 ">
                <div className="text-lg font-bold">Apex No :</div>
                <div className="font-bold text-indigo-700">
                  {data.apex_no}
                </div>
              </div>{console.log(data)}

              <div className="flex gap-2 flex-wrap items-center ">
                <div className="text-lg font-bold">Budget :</div>
                <div className="font-bold text-indigo-700">
                  {(data.budget)}
                </div>
              </div>
            </div>

            <div className="border-2 border-black" />
            <br />
            <div className="flex justify-between flex-wrap">
              <div className="lg:text-start flex flex-col gap-5">
                <div className="flex flex-col">
                  <div className="text-sm ">Apex Type</div>
                  <div className="font-bold  text-indigo-700">
                    {data.apex_type}
                  </div>
                </div>
                <div className="flex flex-col ">
                  <div className="text-sm ">Apex By</div>
                  <div className="font-bold  text-indigo-700">
                    {data.apex_by}
                  </div>
                </div>
              </div>
              <div className="lg:text-center flex flex-col gap-5">
                <div className="flex flex-col ">
                  <div className="text-sm ">Material Nature</div>
                  <div className="font-bold text-indigo-700">
                    {data.material_nature}
                  </div>
                </div>
                <div className="flex flex-col ">
                  <div className="text-sm ">Faculty name</div>
                  <div className="font-bold text-indigo-700">
                    {data.faculty_name}
                  </div>
                </div>
              </div>
              <div className=" lg:text-end flex flex-col gap-5">
                <div className="flex flex-col flex-wrap ">
                  <div className="text-sm ">Department Id</div>
                  <div className="font-bold text-indigo-700 break-words">
                    {data.dept_id}
                  </div>
                </div>

                <div className="flex flex-col ">
                  <div className="text-sm ">Department name</div>
                  <div className="font-bold  text-indigo-700">
                    {data.dept_name}
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
                  {data.reject_description}{data.reject_description && data.reject_description.length > 70 && <span>....</span>}
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
            <div className="flex flex-wrap items-center justify-between">
              <div className={`text-lg border-2 ${data.status == 'INITIATED' ? "border-indigo-500 rounded-md p-1  text-indigo-700 bg-indigo-100" : data.status == 'CANCELLED' ? "border-red-500  text-red-700 rounded-md p-1 bg-red-100" : data.status == 'APPROVED' ? "border-orange-500  text-orange-700 rounded-md p-1 bg-orange-100" : data.status == 'STOCKED' ? "border-green-500 text-green-700  rounded-md p-1 bg-green-100" : data.status == "REJECTED" ? "border-red-500 text-red-700 rounded-md p-1 bg-red-100" : data.status == "FORWARDED" ? "border-2 border-purple-600 text-purple-800  rounded-md p-1 bg-purple-100 " : ""} `}>Status :
                <span className={`font-bold`}>
                  {" "} {data.status}
                </span>
              </div>
              {/* <div>
                {data.status == "STORESAPPROVED" && <div><button onClick={() => handleAcknowledge()} className="text-lg font-bold border-2 border-sky-500 text-sky-700  rounded-md p-1 bg-sky-100 hover:bg-sky-500 hover:text-white">Acknowledge</button></div>}
              </div> */}
            </div>
          </div>

        </div>
      )}
    </>
  );
}

export default TrackCard;