import { React, useEffect, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar,Line, Doughnut } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



function Piechart({ labitem }) {


    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const data = {
        labels: labitem.map((lab)=>lab.name),
        datasets: [
          {
            data: labitem.map((lab)=>lab.value),
            backgroundColor: labitem.map(() => getRandomColor()),
            borderWidth: 1,
          },
        ],
      };

      const options = {
        responsive: true, 
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: false,
            },
        },
    };

    return (
        <>
            <div className="pie animate2" style={{ backgroundColor: "#F4F4F4", width: "40%" }}>
                
                    <div className={` pieh shadow-2xl p-12 bg-white rounded-2xl h-96 w-full`}>
                        <h4 style={{ fontFamily: 'Iceland', fontWeight: "bold", borderBottom: "1px solid gray", display: "flex", justifyContent: "space-between" }} className="text-start text-3xl pb-2">Item Analysis </h4>
                        <div className="h-full w-full flex items-center justify-center pt-2">
                        <Doughnut data={data} options={options}/>
                        </div>

                    </div>
                
            </div>

        </>
    )
}


export default Piechart



