

import React from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '',
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
  parsing: {
    xAxisKey: 'name',
    yAxisKey: 'Cost',
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Duration (months)',
        color:'rgb(238, 130, 238)',
        font: {
          size: 16,
          weight:'bold'
        },
      },
    },
    y: {
      title: {
        display: true,
        text: 'Cost (Rs)',
        color:'rgb(238, 130, 238)',
        font: {
          size: 16,
          weight:'bold', // Adjust the font size for the y-axis title
        },
      },
      ticks: {
        font: {
          size: 12, // Adjust the font size for the y-axis ticks
        },
      },
    },
  },
  layout: {
    padding: {
      left: 20,
      right: 20,
      top: 10,
      bottom: 10,
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  maintainAspectRatio: false,
};


const Areachart = ({ inventory }) => {

  const labels = inventory.map((inv) => inv.name)
  const graphdata = inventory.map((inv) => inv.Cost)
  console.log(inventory);
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Cost',
        data: graphdata,
        borderColor: 'rgba(154, 7, 184,0.5)',
        backgroundColor: 'rgba(154, 7, 184, 0.6)',
      },
    ],
  };

  return (
    // <div className="bg-white p-8 rounded-2xl h-5/6 relative">
    <>
      <div
        className={`mt-10 md:mt-0 p-4 lg:p-10  flex flex-col items-center justify-center bg-white rounded-2xl `}
        style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '90%' }}
      >
        <h4 style={{ fontFamily: 'Iceland', fontWeight: "bold", borderBottom: "1px solid gray", display: "flex", justifyContent: "space-between" }} className=" text-start text-3xl pb-2">Cost Overview </h4>

        <Line options={options} data={data} />
      </div>
    </>
    // </div>
  )
}

export default Areachart



