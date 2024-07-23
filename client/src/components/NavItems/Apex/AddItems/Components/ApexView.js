import React from 'react'

function ApexView({ data }) {

    return (
        <>
            {data &&
                <div className='bg-gray-100'>
                    <div className=" text-lg gap-6 pl-3">
                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start  mr-5 whitespace-nowrap">
                                Apex No:
                            </div>
                            :<div className="pl-5"> {data.apex_no}</div>
                        </div>

                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start  mr-5 whitespace-nowrap ">
                                Apex By:
                            </div>
                            :<div className="pl-5 "> {data.apex_by}</div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start  mr-5 whitespace-nowrap ">
                                Apex Type
                            </div>
                            :<div className="pl-5 "> {data.apex_type}</div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start  mr-5 whitespace-nowrap ">
                                Material nature
                            </div>
                            :<div className="pl-5 "> {data.material_nature}</div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start  mr-5 whitespace-nowrap ">
                                Department Id
                            </div>
                            :
                            <div className="pl-5 ">
                                {data.dept_id}
                            </div>
                        </div>

                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start mr-5 whitespace-nowrap ">
                                Department name
                            </div>
                            :
                            <div className="pl-5 "> {data.dept_name}</div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-40 flex justify-start overflow-hidden  mr-5 whitespace-nowrap ">
                                Faculty Id
                            </div>
                            :
                            <div className="pl-5 ">
                                {data.faculty_id}
                            </div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start  mr-5 whitespace-nowrap ">
                                Faculty Name
                            </div>
                            :<div className="pl-5 "> {data.faculty_name}</div>
                        </div>

                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start  mr-5 whitespace-nowrap ">
                                Advanced amout
                            </div>
                            :<div className="pl-5 "> {data.advance}</div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start  mr-5 whitespace-nowrap ">
                                Budget amount
                            </div>
                            :<div className="pl-5"> {data.budget}</div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start  mr-5 whitespace-nowrap ">
                                Outcome expected
                            </div>
                            :
                            <div className="pl-5 ">
                                {" "}
                                {data.outcome}
                            </div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start  mr-5 whitespace-nowrap ">
                                Material request
                            </div>
                            :<div className="pl-5 whitespace-nowrap"> {data.material_request}</div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start  mr-5 whitespace-nowrap ">
                                Material purpose
                            </div>
                            :<div className="pl-5 whitespace-nowrap"> {data.material_purpose}</div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start  mr-5 whitespace-nowrap ">
                                Detailed reason
                            </div>
                            :<div className="pl-5 whitespace-nowrap"> {data.detailed_reason}</div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start  mr-5 whitespace-nowrap ">
                                Status
                            </div>
                            :<div className="pl-5 whitespace-nowrap"> {data.status}</div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start  mr-5 whitespace-nowrap ">
                                Date
                            </div>
                            :<div className="pl-5 whitespace-nowrap"> {data.created_at.split("T")[0]}</div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-40 flex overflow-hidden justify-start  mr-5 whitespace-nowrap ">
                                Updated by
                            </div>
                            :<div className="pl-5 whitespace-nowrap"> {data.updated_by ? data.updated_by : "-"}</div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ApexView