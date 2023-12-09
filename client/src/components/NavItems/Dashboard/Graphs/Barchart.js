import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar,Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
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
        },
    },
};





function Barchart({ open, setOpen, categories, labname, labsStock }) {


    const [selectedLab, setSelectedLab] = useState("all");
    const [filteredData, setFilteredData] = useState(categories);




    const handleFilter = (lab) => {
        setSelectedLab(lab)
        if (lab === "all") {
            setFilteredData(categories);
        } else {
            console.log(labsStock);
            console.log("selected", lab);
            const filtered = labsStock.filter((category) => category.labname === lab);

            setFilteredData(filtered);

        }
    };


    const labels = filteredData.map((fi) => fi.name);

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: filteredData.map((fi) => fi.stock),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <>
            <div className="bar animate2" style={{ backgroundColor: "#F4F4F4", width: "44%" }} >
                <div
                    className={` barh shadow-2xl p-10 bg-white rounded-2xl 
                        }`}
                >

                        <div className=" flex flex-wrap justify-between border-b-2 border-black">
                            <h4 style={{ fontFamily: "Iceland" }} className="text-start text-3xl font-bold pb-2" >Stock Analysis</h4>

                                <select
                                    style={{ maxWidth: "200px" }}
                                    value={selectedLab}
                                    onChange={(e)=>handleFilter(e.target.value)}
                                >
                                    <option value="all">All</option>
                                    {labname.map((name) => {
                                        return (
                                            <option value={name.labname}>{name.labname}</option>
                                        )
                                    })}
                                </select>
                            </div>

                    <br />
                    <div className='h-full w-full'>
                        {filteredData.length > 0 ?
                            <Line options={options} data={data} />
                            : <div className="flex items-center justify-center h-96 text-3xl">No Data Available</div>}
                    </div>
                </div>
            </div>
        </>
    )
}



export default Barchart



