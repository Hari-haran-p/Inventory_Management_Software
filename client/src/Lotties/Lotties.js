import Lottie from "react-lottie";

import React, { useState } from "react";

const Lotties = ({ height, width, animationData, click, clickData}) => {

  const [stopped, setStopped] = useState(true);

  const options = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className="relative z-1"
      onMouseEnter={() => {
        setStopped(false);
      }}
      onMouseLeave={() => {
        setStopped(true); 
      }}
      onClick={()=>click(clickData)}
    >
      <Lottie
        options={options}
        isClickToPauseDisabled
        isStopped={stopped}
        height={height}
        width={width}
      />
    </div>
  );
};

export default Lotties;
