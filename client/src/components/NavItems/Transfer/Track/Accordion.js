// Update Accordion component
import React from "react";
import TrackCard from "./TrackCard";

const Accordion = (props) => {
  return (
    <div className=" rounded-lg bg-white mb-4">
      <button
        className={`w-full ${props.isOpen ? "p-4" : "p-5"} font-bold flex items-center justify-between hover:bg-blue-600 hover:text-white text-left border-b-2 border-blue-700  
        bg-white transition-transform duration-1000 rounded-lg`}
        onClick={props.toggleAccordion}
      >
        {props.title}
        {props.isOpen ? <span className="text-3xl">&#9662;</span> : <span className="text-sm">&#9650;</span>}
      </button>
      {props.isOpen && props.data && Array.isArray(props.data) && (
        <div
          style={{ height: "auto", maxHeight: "350px" }}
          className="p-4 bg-white overflow-scroll"
        >
          {props.data.length > 0 ? (
            props.data.map((data, index) => (
              <TrackCard
                key={index}
                data={data}
                index={index}
                onClose={props.onClose}
                user={props.user}
                setError={props.setError}
                setMessage={props.setMessage}
                fetchPendingData = {props.fetchPendingData}
              />
            ))
          ) : (
            <div>{props.noDataMessage}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Accordion;
