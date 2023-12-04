import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../AuthContext";
import TrackCard from "./TrackCard.js";

const TrackTransfer = ({ isVisible, onClose, trackTransferData, user , setMessage, setError}) => {

  if (!isVisible) return null;

  return (

    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center lg:w-full ">
        <div className="bg-white w-5/6 h-5/6 animate1  overflow-y-auto rounded-2xl p-4">
          <div className="flex items-center justify-between px-6">
            <div className="text-lg pt-2 mt-2">Your Pending Transfer Requests: </div>
            <button
              className="text-black text-lg border-2 border-black px-2 place-self-end"
              style={{ borderRadius: "50%" }}
              onClick={() => onClose()}
            >
              X
            </button>
          </div>
          <div>
            <div className="mt-6 flex flex-col justify-center items-center gap-10">
              {trackTransferData && trackTransferData.map((data, index) => {
                return (
                  <TrackCard 
                    data={data} 
                    index={index} 
                    onClose={onClose} 
                    user={user} 
                    setError = {setError}
                    setMessage = {setMessage}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackTransfer;
