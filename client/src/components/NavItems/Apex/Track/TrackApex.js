// Update TrackTransfer component
import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import axios from "axios";

const TrackApex = ({
  isVisible,
  user,
  setMessage,
  setError,
  fetchPendingData,
  pendingData,
  fetchOverallTranferedData
}) => {

  const [accordions, setAccordions] = useState([]);

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
      },
      {
        key: 2,
        title: "Approved",
        data: pendingData.approved || [],
        isOpen: false,
        noDataMessage: "No approved data available",
      },
      {
        key: 3,
        title: "Forwarded",
        data: pendingData.forwarded || [],
        isOpen: false,
        noDataMessage: "No forwarded data available",
      },
      {
        key: 4,
        title: "Stocked",
        data: pendingData.stocked || [],
        isOpen: false,
        noDataMessage: "No Stocked data available",
      },
      {
        key: 5,
        title: "Rejected",
        data: pendingData.rejected || [],
        isOpen: false,
        noDataMessage: "No rejected data available",
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
      <div>
        <div className="p-2 m-8">
          {accordions.map((accordion) => (
            <Accordion
              key={accordion.key}
              title={accordion.title}
              data={accordion.data}
              isOpen={accordion.isOpen}
              user={user}
              setMessage={setMessage}
              fetchOverallTranferedData={fetchOverallTranferedData}
              setError={setError}
              toggleAccordion={() => toggleAccordion(accordion.key)}
              noDataMessage={accordion.noDataMessage}
              fetchPendingData={fetchPendingData}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TrackApex;
