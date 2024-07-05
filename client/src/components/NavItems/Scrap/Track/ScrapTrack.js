import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import axios from "axios";
import { useAuth } from '../../../../AuthContext';

const ScrapTrack = ({isVisible,setMessage,setError,setIsLoading,isLoading,fetchPendingData, pendingData}) => {

  const [accordions, setAccordions] = useState([]);

  const { user, getUser, getRequest } = useAuth();

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