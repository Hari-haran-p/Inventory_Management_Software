// Update Accordion component
import React from "react";
import TrackCard from "./TrackCard";

const Accordion = (props) => {
  return (
    <div className=" rounded-lg bg-white mb-4">
      <button
        className="w-full p-4 font-bold hover:bg-blue-700 hover:text-white text-left border-b-2 border-blue-700  
        bg-white transition-transform duration-1000 rounded-lg"
        onClick={props.toggleAccordion}
      >
        {props.title}
        <span
          className={`float-right transform ${
            props.isOpen ? "rotate-180" : "rotate-0"
          } transition-transform duration-300`}
        >
          &#9660;
        </span>
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
