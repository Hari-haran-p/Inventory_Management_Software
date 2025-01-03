import React, { useState } from "react";
import Lotties from "../../../../Lotties/Lotties";
import Accept from "../../../../Lotties/accept.json";
import Reject from "../../../../Lotties/reject.json";
import axios from "axios";
import RejectPopup from './RejectPopup';
import { useAuth } from "../../../../AuthContext";


const TransferCard = ({ data, setMessage, setError, fetchTransferData, fetchPendingData, fetchOverallTranferedData }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [showManufacturer, setShowManufacturer] = useState(false);
  const [rejectDesc, setRejectDesc] = useState("");
  const [isRejected, setIsrejected] = useState(false);

  const {user, getUser, BackendUrl}= useAuth();

  const handleAccept = async (id) => {

    try {
      setIsLoading(true);
      const response = await axios.post(`${BackendUrl}/api/acceptRequest`, { ...data, user_id: user.user_id, role: user.role })
        .then(async (response) => {
          await fetchTransferData(user);
          fetchPendingData();
          fetchOverallTranferedData();
          setIsLoading(false);
          if (response && response.status == 201) {
            setMessage(response.data.Data);
          }
        })
    } catch (error) {
      fetchPendingData();
      fetchOverallTranferedData();
      setIsLoading(false);
      setError(error.response.data.Data)
    }
  }

  console.log(rejectDesc);

  const handleReject = async (e) => {
    e.preventDefault();
    if (rejectDesc == "") {
      setError("Kindly enter reason for rejection");
    } else {
      if (window.confirm("Are you sure?")) {
        //i need to wait here till he finishes filling reject form and then execute it
        try {
          // setIsLoading(true);
          // setShowManufacturer(false);
          // setRejectDesc("")
          console.log("hiiiiiiii");
          const response = await axios.post(`${BackendUrl}/api/rejectRequest`, { ...data, user_id: user.user_id, role: user.role, rejectDesc: rejectDesc })
            .then((response) => {
              setIsLoading(false);
              fetchPendingData();
              fetchOverallTranferedData();
              if (response && response.status == 201) {
                setMessage(response.data.Data);
              }
            })
            console.log("uy uo hoio hio ");

        } catch (error) {
          console.log(error);
          setIsLoading(false);
          fetchPendingData();
          fetchOverallTranferedData();
          if (error && error.response.status == 500) {
            setError(error.response.data.Data);
          }
          console.log(error);
        }
      } else {
        setShowManufacturer(false);
        setRejectDesc("");
      }
    }
  }

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
        </div >
      ) : (
        <div className="card">
          <div className="p-3 flex items-center justify-between">
            <div>
              <div className="lg:text-lg">Requested By : {(data.faculty_name)}</div>
              <div className="lg:text-lg ">
                Requested for: {(data.to_labname)}({data.transfer_to})
              </div>
            </div>
            <div className="lg:flex gap-2">
              <Lotties
                animationData={Accept}
                height={50}
                width={50}
                click={handleAccept}
                clickData={data.id}
              />
              <Lotties
                animationData={Reject}
                height={50}
                width={50}
                click={() => setShowManufacturer(true)}
                clickData={data.id}

              />
            </div>
          </div>
          <center>
            <div
              style={{ width: "95%" }}
              className="border-b-2 h-2 border-slate-300"
            ></div>
          </center>
          <div className="flex card-sub" style={{ gap: "13%" }}>
            <div className="lg:text-sm p-6">
              <div className="">Item code(Apex No) :{data.item_code}({data.apex_no})</div>
              <div className="pt-4">Item Name : {data.item_name}</div>
            </div>
            <div className="text-sm p-6   ">
              <div>Item Subame : {data.item_subname}</div>
              <div className="pt-4">Item Desc : {data.item_description}</div>
            </div>
            <div className="text-sm p-6">
              <div>Transfer item From : {(data.from_labname)}</div>
              <div className="pt-4">Transfer Qty : {data.transfer_qty}</div>
            </div>
          </div>
          <RejectPopup
            isVisible={showManufacturer}
            onClose={() => setShowManufacturer(false)}
            rejectDesc={rejectDesc}
            setRejectDesc={setRejectDesc}
            handleReject={handleReject}
          />
        </div>
      )}


    </>
  );
};

export default TransferCard;


