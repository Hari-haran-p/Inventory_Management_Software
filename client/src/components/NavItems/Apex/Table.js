import React, { useState, useEffect } from "react";
// import MasterTablePopup from "./MasterTablePopup";

function Table({ apexData,isVisible }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // Search functionality

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [click, setClick] = useState(false);
  console.log(apexData);
  useEffect(() => {
    if (click || searchQuery == "") {
      const filteredResults = apexData.filter((item) => {
        const propertiesToSearch = [
          "id",
          "apex_no",
          "faculty_id",
          "faculty_name",
          "faculty_contact",
          "dept_id",
          "dept_name",
          "material_nature",
          "apex_by",
          "apex_type",
          "budget",
          "advance",
          'outcome',
          "material_request",
          "detailed_reason",
          "material_purpose",
          "status",
          "create_at",
          "updated_by",
          "updated_at"
        ];
        return propertiesToSearch.some((property) =>
          typeof item[property] === "string"
            ? item[property].toLowerCase().includes(searchQuery.toLowerCase())
            : typeof item[property] === "number"
              ? item[property].toString().includes(searchQuery)
              : false
        );
      });

      setFilteredData(filteredResults);
    }
  }, [click, apexData, searchQuery]);

  //sort by functionality
  const [sortOrder, setSortOrder] = useState({
    id: "asc",
    apex_no:"asc",
    faculty_id: "asc",
    faculty_name: "asc",
    faculty_contact: "asc",
    dept_id: "asc",
    dept_name: "asc",
    material_nature: "asc",
    apex_by: "asc",
    apex_type: "asc",
    budget: "asc",
    advance: "asc",
    outcome:"asc",
    material_request:"asc",
    detailed_reason:"asc",
    material_purpose:"asc",
    status:"asc",
    create_at:"asc",
    updated_by:"asc",
    updated_at:"asc",
  });
  const [sortedColumn, setSortedColumn] = useState("");

  const sortData = (column) => {
    setSortOrder((prevSortOrders) => ({
      ...prevSortOrders,
      [column]: prevSortOrders[column] === "asc" ? "desc" : "asc",
    }));

    setSortedColumn(column);

    filteredData.sort((a, b) => {
      const valueA =
        typeof a[column] === "string" ? a[column].toLowerCase() : a[column];
      const valueB =
        typeof b[column] === "string" ? b[column].toLowerCase() : b[column];

      if (valueA < valueB) {
        return sortOrder[column] === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder[column] === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(filteredData);
  };

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      setClick(true);
    }
  };
  console.log(isVisible);
  if (!isVisible) return null;

  return (
    <div className="w-full flex justify-center p-10 items-center">
    <div className=" w-10/12 border-2 bg-white rounded-t-3xl h-auto">
      <div className="flex flex-wrap h-auto w-full my-4 items-center justify-center md:justify-between  font-semibold">
        <div className="pl-4 text-2xl w-1/5 flex items-center whitespace-nowrap  text-blue-600 font-semibold">
          Apex Table
        </div>
        <div className="flex gap-4 items-center w-4/5 justify-end pr-6">
          <div className="flex flex-wrap justify-center items-center">
            <input
              name="inputQuery"
              type="text"
              onKeyDown={handleKeyEnter}
              value={searchQuery}
              onChange={(e) => {
                setClick(false);
                setSearchQuery(e.target.value);
              }}
              placeholder="Search..."
              style={{minWidth: "70%" }}
              className="text-black indent-2 h-9 font-medium border-2 rounded-lg border-black"
            />
          </div>
          <button
              onClick={() => setClick(true)}
              className="cursor-pointer ml-3 w-24 rounded-md h-10 py-1 text-white bg-blue-600 border-2"
            >
              Search
            </button>
        </div>
      </div>
      <div class="overflow-y-auto  overflow-x-auto border-gray-700 rounded-lg">
        <div style={{ width: "100%" }} class=" align-middle  inline-block">
          <div
            style={{ height: "50%", maxHeight: "50vh" }}
            class="shadow sm:rounded-lg  h-96"
          >
            <table class="min-w-full text-sm ">
              <thead class=" text-md uppercase border-b-2 font-medium">
                <tr>
                  <th className="px-6 py-3">s.no</th>
                  <th
                    onClick={() => sortData("apex_no")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Apex No</div>
                      {sortedColumn === "apex_no" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.apex_no === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => sortData("faculty_id")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Faculty Id</div>
                      {sortedColumn === "faculty_id" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.faculty_id === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => sortData("faculty_name")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Faculty Name</div>
                      {sortedColumn === "faculty_name" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.faculty_name === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => sortData("faculty_contact")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Faculty Contact</div>
                      {sortedColumn === "faculty_contact" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.faculty_contact === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("dept_id")}>
                        Department Id
                      </div>
                      {sortedColumn === "dept_id" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.dept_id === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("dept_name")}>
                        Department Name
                      </div>
                      {sortedColumn === "dept_name" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.dept_name === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                 
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("material_nature")}>
                        Material Nature
                      </div>
                      {sortedColumn === "material_nature" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.material_nature === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("apex_by")}>
                        Apex By
                      </div>
                      {sortedColumn === "apex_by" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.apex_by === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("apex_type")}>
                        Apex Type 
                      </div>
                      {sortedColumn === "apex_type" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.apex_type === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("budget")}>
                        Budget
                      </div>
                      {sortedColumn === "budget" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.budget === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("advance")}>Advance</div>
                      {sortedColumn === "advance" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.advance === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("outcome")}>
                        Outcome
                      </div>
                      {sortedColumn === "outcome" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.outcome === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("material_request")}>
                        Material Request
                      </div>
                      {sortedColumn === "material_request" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.material_request === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("detailed_reason")}>
                        Detailed Reason
                      </div>
                      {sortedColumn === "detailed_reason" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.detailed_reason === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("material_purpose")}>
                        Material Purpose
                      </div>
                      {sortedColumn === "material_purpose" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.material_purpose === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("status")}>
                        Status
                      </div>
                      {sortedColumn === "status" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.status === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("created_at")}>
                        Created On
                      </div>
                      {sortedColumn === "created_at" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.created_at === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("updated_by")}>
                        Updated By
                      </div>
                      {sortedColumn === "updated_by" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.updated_by === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("updated_at")}>
                        Updated On
                      </div>
                      {sortedColumn === "updated_at" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.updated_at === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "white", fontWeight: "bold" }}>
                {filteredData.map((data, index) => {
                  return (
                    <tr className="border-b-2">
                      <td class="pl-4">{index + 1}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.apex_no}
                      </td>
                      <td class="flex px-6 py-4 whitespace-nowrap">
                        {data.faculty_id}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.faculty_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.faculty_contact}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.dept_id}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.dept_name}
                      </td>
                     
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.material_nature}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.apex_by}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.apex_type}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.budget}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.advance}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.outcome}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.material_request}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.detailed_reason}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.material_purpose}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.status}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.created_at.toString().split('T')[0]}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.updated_by === null ? "-" : data.updated_by}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.updated_at.toString().split('T')[0]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {openPopup && selectedData && (
        <div className="blur-background">
          {/* <MasterTablePopup data={selectedData} onClose={handleClosePopup} /> */}
        </div>
      )}
    </div>
    </div>
  );
}

export default Table;
