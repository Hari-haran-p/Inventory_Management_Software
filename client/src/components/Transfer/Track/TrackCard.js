import React, { useState, useEffect } from "react";
import axios from "axios";

const TrackCard = ({ data, onClose, user, setMessage, setError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const response = await axios.post("http://localhost:4000/api/cancelTransferRequest",
        {
          transfer_id: data.id,
          dept_id: user.dept_code
        })
      if (response) {
        setIsLoading(false);
        setMessage(response.data.Data);
        console.log(response.data)
        onClose();
      }
    } catch (error) {
      if (error) {
        setIsLoading(false);
        setError(error.response.data.Data)
        console.error(error);
        onClose();
      }
    }
  }


  const handleDelete = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:4000/api/deleteTransferRequest",
        {
          transfer_id: data.id,
          dept_id: user.dept_code,
        }
      );
      if (response) {
        setIsLoading(false);
        setMessage(response.data.Data);
        console.log(response.data);
        onClose();
      }
    } catch (error) {
      if (error) {
        setIsLoading(false);
        setError(error.response.data.Data);
        console.error(error);
        onClose();
      }
    }
  };
  useEffect(() => {
    console.log(data);
  })
  const toSentenceCase = (str) => {
    str = str.toLowerCase().split(" ").map(function (s) {
      return s.charAt(0).toUpperCase() + s.slice(1)
    })
    return str.join(" ")
  }

  const test = "am,sdhjkamgsbdujgbawidghbkujkuhjacbugawdkuyf,sjfhhjgkhv  kiiajhdiujnakufh"
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <span class="loader"></span>
        </div>
      ) : (
        <div className="relative track-card w-11/12 rounded-xl overflow-hidden p-10">
          <div className="flex flex-col flex-wrap">

            <div className="flex justify-between flex-wrap items-center pb-2">
              <div className="flex items-center flex-wrap gap-2 ">
                <div className="text-lg font-bold">Item Code :</div>
                <div className="font-bold text-indigo-700">
                  {data.item_code}
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
                  <div className="text-sm ">Transfered From</div>
                  <div className="font-bold  text-indigo-700">
                    {data.transfered_from}
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
                    Rs {data.cost_per_item}
                  </div>
                </div>
              </div>
              <div className=" lg:text-end flex flex-col gap-5">
                <div className="flex flex-col flex-wrap ">
                  <div className="text-sm ">Item Description</div>
                  <div className="font-bold text-indigo-700 break-words">
                    {data.item_description.slice(0, 50)}{data.item_description.length > 50 && <span>....</span>}
                  </div>
                </div>

                <div className="flex flex-col ">
                  <div className="text-sm ">Requested Qty</div>
                  <div className="font-bold  text-indigo-700">
                    {data.transfer_qty} nos
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
                  {console.log(data)}
                </div>
              </div>
            }
            {data.status == "PENDING" ? (
              <button
                onClick={handleCancel}
                class="border border-red-500 h-10 bg-red-500 text-white rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            ) : null}
            {data.status == "CANCELED" ? (
              <button
                onClick={handleDelete}
                class="border border-red-500 h-10 bg-red-500 text-white rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            ) : null}
            <div className="flex flex-col">
              <div className={`text-lg border-2 ${data.status == 'PENDING' ? "border-indigo-500 rounded-md p-1  text-indigo-700 bg-indigo-100" : data.status == 'CANCELED' ? "border-red-500  text-red-700 rounded-md p-1 bg-red-100" : data.status == 'LABAPPROVED' ? "border-orange-500  text-orange-700 rounded-md p-1 bg-orange-100" : data.status == 'APPROVED' ? "border-green-500 text-green-700  rounded-md p-1 bg-green-100" : data.status == "REJECTED" ? "border-red-500 text-red-700 rounded-md p-1 bg-red-100" : ""} `}>Status :
                <span className={`font-bold`}>
                  {" "} {data.status}
                </span>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TrackCard;
