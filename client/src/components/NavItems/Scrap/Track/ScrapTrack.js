import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import axios from "axios";
import { useAuth } from '../../../../AuthContext';

const ScrapTrack = ({isVisible,setMessage,onClose,setError,setIsLoading,isLoading,fetchScrapTrackData}) => {

  const [pendingData, setPendingData] = useState([]);
  const [accordions, setAccordions] = useState([]);

  const { user, getUser, getRequest } = useAuth();


  const fetchPendingData = async () => {
    try {
      const response = await getRequest(
        `http://localhost:4000/api/getScrapCardData/${user.user_id}`
      );
      console.log(response);
      setPendingData(response.data);
    } catch (error) {
      console.error(error); 
    }
  };
      
  useEffect(() => {
    fetchPendingData();
  }, []);


  useEffect(() => {
    setAccordions([
      {
        key: 1,
        title: "Initiated",
        data: pendingData.pending || [],
        isOpen: true,
        noDataMessage: "No initiated data available",
        icon:"&#9660;"
      },
      {
        key: 2,
        title: "Approved",
        data: pendingData.approved || [],
        isOpen: false,
        noDataMessage: "No approved data available",
        icon:"&#9660;"
      },
      // {
      //   key: 3,
      //   title: "Acknowledged",
      //   data: pendingData.acknowledged || [],
      //   isOpen: false,
      //   noDataMessage: "No acknowledged data available",
      // },
      {
        key: 3,
        title: "Rejected",
        data: pendingData.rejected || [],
        isOpen: false,
        noDataMessage: "No rejected data available",
        icon:"&#9660;"
      },
    ]);
  }, [pendingData]);


  const toggleAccordion = (accordionkey) => {
    const updatedAccordions = accordions.map((accord) => {
      if (accord.key === accordionkey) {
        return { ...accord, isOpen: !accord.isOpen };
      } else {
        return { ...accord, isOpen: false };
      }
    });

    setAccordions(updatedAccordions);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="p-2 m-8">
          {accordions.map((accordion) => (
            <Accordion
              key={accordion.key}
              title={accordion.title}
              data={accordion.data}
              isOpen={accordion.isOpen}
              getUser = {getUser}
              user={user}
              setMessage={setMessage}
              isLoading = {isLoading}
              setIsLoading = {setIsLoading}
              onClose={onClose}
              setError={setError}
              fetchPendingData = {fetchPendingData}
              toggleAccordion={() => toggleAccordion(accordion.key)}
              noDataMessage={accordion.noDataMessage}
            />
          ))}
        </div>


    </>
  )
}

export default ScrapTrack