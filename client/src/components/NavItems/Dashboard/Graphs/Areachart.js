import { React, useEffect, useState } from "react";

import axios from 'axios';
import {
    Brush,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
    Legend,
    Area,
    ResponsiveContainer,
} from 'recharts';


function Areachart({ inventory }) {


    const [isCostFullScreen, setisCostFullScreen] = useState(false);

    const toggleCostFullScreen = () => {
        setisCostFullScreen(!isCostFullScreen);
    };


    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload;
            const stockValue = dataPoint.Cost;
            const yAxisName = dataPoint.name;

            return (
                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: "white", padding: "15px" }}>
                    <span>{yAxisName}</span>
                    <span>Cost: Rs {stockValue}</span>
                </div>
            );
        }

        return null;
    };

    return (
        <>

            <div className="flex items-center justify-center h-full" style={{paddingLeft:"5%"}}>
                <div
                    className={` shadow-2xl p-8  flex-col bg-white rounded-2xl ${isCostFullScreen ? 'fixed top-0 left-0 z-50 full-screen' : ''
                        }`}
                    style={{ width: '100%', height: isCostFullScreen ? '100%' : '100%' }}
                >
                    <h4 style={{ fontFamily: 'Iceland', fontWeight: "bold", borderBottom: "1px solid gray", display: "flex", justifyContent: "space-between" }} className=" text-start text-3xl pb-2">Cost Overview <button className="spin icon" onClick={toggleCostFullScreen}><i class={`bi bi-arrows-${isCostFullScreen ? 'collapse' : 'fullscreen'}`}></i></button></h4>
                    <br />
                    <div className=" justify-center gap-5 font-bold hidden md:flex" >
                        <div className="text-red-600 ">
                            <span>X-Axis : Duration<span className="text-sm">(months)</span></span>
                        </div>
                        <div className="text-blue-700">
                            <span>Y-Axis : Cost<span className="text-sm">(Rs)</span></span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="80%">
                        <AreaChart
                            width={300}
                            height={200}
                            data={inventory}
                            syncId="anyId"
                            margin={{
                                top: 10,
                                right: 30,
                                left: 20,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fill: '#00000', fontWeight: '500' }} />
                            <YAxis tick={{ fill: '#00000', fontWeight: '500' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="Cost" stroke="#220129" fill="#9a07b8" isAnimationActive={true} animationDuration={2000} />
                            <Brush startIndex={0} endIndex={10} dataKey={null} height={10} stroke="#8884d8" />
                        </AreaChart>
                    </ResponsiveContainer>


                </div>
            </div>
        </>
    )

}
export default Areachart



