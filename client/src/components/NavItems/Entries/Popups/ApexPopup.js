import { React, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../AuthContext";

const AppexPopUp = ({ setMessage, setError }) => {

    const formdata = {
        apexNo: "",
        facId: "",
        facName: "",
        deptId: "",
        materialNature: "",
        apexType: "",
        apexBy: "",
        budget: "",
        advance: "",
        outcome: "",
        requestFor: "",
        detailReason: "",
        materialPurpose: "",
        userId: "",
    }

    const [data, setData] = useState(formdata);

    const { user } = useAuth();
    const { getRequest } = useAuth();

    const [labs, setLabs] = useState([]);
    async function fetchLabs() {
        const response = await getRequest("/api/getLabDetails");
        setLabs(response.data);
    }

    const HandleSubmit = async (e) => {
        console.log("i amm called");
        if (window.confirm("Are you sure want to add Apex ?")) {
            try {
                e.preventDefault();
                data.userId = user.user_id;
                data.deptId = user.dept_code;
                console.log("came here", data);
                const response = await axios.post(
                    "/api/apexAdd",
                    { ...data, user_dept_id: user.dept_code }
                );

                if (response && response.status == 201) {
                    setMessage(response.data.Data);
                    setData(formdata);
                }

            } catch (error) {
                console.log(error);
                if (error && error.response.status == 400) {
                    setError(error.response.data.Data);
                    setData(formdata);
                }
            }
        } else {
            setData(formdata);
        }
    };
    // console.log(labs);
    useEffect(() => {
        fetchLabs();
    });

    return (
        <div className="flex flex-col " >
            <form className="w-full" onSubmit={HandleSubmit} >
                <div className="text-lg font-semibold pb-1 text-gray-600 pt-5">Basic details:</div>
                <hr />
                <div className="flex flex-wrap gap-5 px-5 pt-3 w-full">
                    <div class="">
                        <span class="text-lg pb-1 text-gray-600 ">Apex No</span>
                        <input
                            type="text"
                            name="apexNo"
                            autoComplete="off"
                            value={data.apexNo}
                            onChange={(e) =>
                                setData({ ...data, [e.target.name]: e.target.value })
                            }
                            className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            required
                        />
                    </div>
                </div>
                <div className="text-lg font-semibold pb-1 text-gray-600 pt-5" >Faculty details:</div>
                <hr />
                <div className="flex flex-wrap gap-5 px-5 pt-3">
                    <div class="">
                        <span class="text-lg pb-1 text-gray-600 ">Faculty Id</span>
                        <input
                            type="text"
                            name="facId"
                            value={data.facId}
                            onChange={(e) =>
                                setData({ ...data, [e.target.name]: e.target.value })
                            }
                            className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div class="">
                        <span class="text-lg pb-1 text-gray-600 ">Faculty Name</span>
                        <input
                            type="text"
                            name="facName"
                            value={data.facName}
                            onChange={(e) =>
                                setData({ ...data, [e.target.name]: e.target.value })
                            }
                            className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            required
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="text-lg font-semibold pb-1 text-gray-600 pt-5" >Apex details:</div>
                <hr />
                <div className="flex flex-wrap gap-5 px-5 pt-3">
                    <div class="">
                        <span class="px-1 text-lg text-gray-600">Department Id</span>
                        <select
                            type="text"
                            name="deptId"
                            value={data.deptId}
                            onChange={(e) =>
                                setData({ ...data, [e.target.name]: e.target.value })
                            }
                            className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            required
                        >
                            <option value="" selected>
                                Select Department Id
                            </option>
                            {labs.map((lab)=>{
                                return(
                                    <option value={lab.labcode} >{lab.labname}</option>
                                )   
                            })}

                        </select>
                    </div>
                    <div className="">
                        <span class="px-1 text-lg text-gray-600">Material nature</span>
                        <select
                            name="materialNature"
                            value={data.materialNature}
                            onChange={(e) =>
                                setData({ ...data, [e.target.name]: e.target.value })
                            }
                            className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 h-10 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            required
                            autoComplete="off"
                        >
                            <option value="" selected>
                                Select Yes/No
                            </option>
                            <option value="consumable">Consumable</option>
                            <option value="asset">Asset</option>
                            <option value="service">Service request</option>
                        </select>
                    </div>
                    <div className="">
                        <span class="px-1 text-lg text-gray-600">Apex By</span>
                        <select
                            name="apexBy"
                            value={data.apexBy}
                            onChange={(e) =>
                                setData({ ...data, [e.target.name]: e.target.value })
                            }
                            className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 h-10 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            required
                            autoComplete="off"
                        >
                            <option value="" selected>
                                Select by
                            </option>
                            <option value="BIT">BIT purchase(Local)</option>
                            <option value="BET">BET purchase(Head office)</option>
                        </select>
                    </div>
                    <div className="">
                        <span class="px-1 text-lg text-gray-600">Apex type</span>
                        <select
                            name="apexType"
                            value={data.apexType}
                            onChange={(e) =>
                                setData({ ...data, [e.target.name]: e.target.value })
                            }
                            className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96
                bg-white border-2 border-gray-300 placeholder-gray-600 h-10 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            required
                            autoComplete="off"
                        >
                            <option value="" selected>
                                Select apex type
                            </option>
                            <option value="BIT">Advance type(urgent basis)</option>
                            <option value="BET">Normal type(approval basis)</option>
                        </select>
                    </div>
                </div>
                <div className="text-lg font-semibold pb-1 text-gray-600 pt-5" >Amount details:</div>
                <hr />
                <div className="flex flex-wrap gap-5 px-5 pt-3">
                    <div class="">
                        <span class="px-1 text-lg text-gray-600">Budget Amount</span>
                        <input
                            type="text"
                            name="budget"
                            value={data.budget}
                            onChange={(e) =>
                                setData({ ...data, [e.target.name]: e.target.value })
                            }
                            className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            required
                        />
                    </div>
                    <div class="">
                        <span class="px-1 text-lg text-gray-600">Advance Amount</span>
                        <input
                            type="text"
                            name="advance"
                            value={data.advance}
                            onChange={(e) =>
                                setData({ ...data, [e.target.name]: e.target.value })
                            }
                            className="text-md block px-3 py-2 rounded-lg w-72 sm:w-96 text-gray-500
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            required
                        />
                    </div>
                </div>
                <div className="text-lg font-semibold pb-1 text-gray-600 pt-5">Apex Justification:</div>
                <hr />
                <div className="flex flex-wrap w-full px-5 pt-3">
                    <div class="w-full">
                        <span class="px-1 text-lg text-gray-600">Outcome expected</span>
                        <input
                            type="text"
                            name="outcome"
                            onChange={(e) =>
                                setData({ ...data, [e.target.name]: e.target.value })
                            }
                            value={data.outcome}
                            required
                            className="text-md block px-3 py-2 rounded-lg w-72 lg:w-11/12
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap w-full px-5 pt-3">
                    <div class="w-full">
                        <span class="px-1 text-lg text-gray-600">Material Request For</span>
                        <textarea
                            type="text"
                            name="requestFor"
                            onChange={(e) =>
                                setData({ ...data, [e.target.name]: e.target.value })
                            }
                            value={data.requestFor}
                            required
                            className="text-md block px-3 py-2 rounded-lg w-72 lg:w-11/12
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap w-full px-5 pt-3">
                    <div class="w-full">
                        <span class="px-1 text-lg text-gray-600">Detailed Reason</span>
                        <textarea
                            type="text"
                            name="detailReason"
                            onChange={(e) =>
                                setData({ ...data, [e.target.name]: e.target.value })
                            }
                            value={data.detailReason}
                            required
                            className="text-md block px-3 py-2 rounded-lg w-72 lg:w-11/12
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap w-full px-5 pt-3">
                    <div class="w-full">
                        <span class="px-1 text-lg text-gray-600">Material Purpose</span>
                        <textarea
                            type="text"
                            name="materialPurpose"
                            onChange={(e) =>
                                setData({ ...data, [e.target.name]: e.target.value })
                            }
                            value={data.materialPurpose}
                            required
                            className="text-md block px-3 py-2 rounded-lg w-72 lg:w-11/12
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                        />
                    </div>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mb-10 mt-10"
                    type="submit"
                >
                    Submit
                </button>
            </form>

        </div>
    );
};

export default AppexPopUp;
