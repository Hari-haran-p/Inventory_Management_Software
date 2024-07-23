import React, { useState, useEffect } from "react";
// import MasterTablePopup from "./MasterTablePopup";

function Table({ stockData, user }) {

  const [openPopup, setOpenPopup] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleOpenPopup = (data) => {
    setSelectedData(data);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setSelectedData(null);
  };

  // Search functionality

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (searchQuery == "") {
      setFilteredData(stockData)
      return
    }
    if (click) {
      const filteredResults = stockData.filter((item) => {
        const propertiesToSearch = [
          "id",
          "apex_no",
          "faculty_name",
          "dept_name",
          "material_nature",
          "apex_by",
          "apex_type",
          "budget",
          "advance",
          'outcome',
          "status",
          "create_at",
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
  }, [click, stockData, searchQuery]);

  //table row filter
  const [rowSize, setRowSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / rowSize));
  }, [filteredData, rowSize]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setRowSize(newSize);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * rowSize;
  const endIndex = Math.min(startIndex + rowSize, filteredData.length);

  //sort by functionality
  const [sortOrder, setSortOrder] = useState({
    id: "asc",
    apex_no: "asc",
    faculty_name: "asc",
    dept_name: "asc",
    material_nature: "asc",
    apex_by: "asc",
    apex_type: "asc",
    budget: "asc",
    advance: "asc",
    outcome: "asc",
    status: "asc",
    create_at: "asc",
  });

  const [sortedColumn, setSortedColumn] = useState("");

  const sortData = (column) => {
    setSortOrder((prevSortOrders) => ({
      ...prevSortOrders,
      [column]: prevSortOrders[column] === "asc" ? "desc" : "asc",
    }));

    setSortedColumn(column);

    filteredData.sort((a, b) => {
      const valueA = getValueForComparison(typeof a[column] === "string" ? a[column].toLowerCase() : a[column]);
      const valueB = getValueForComparison(typeof b[column] === "string" ? b[column].toLowerCase() : b[column]);

      if (valueA < valueB) {
        return sortOrder[column] === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder[column] === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(filteredData); // Trigger re-render
  };

  const getValueForComparison = (value) => {
    // Check if the value is a date in the format "DD-MM-YYYY"
    const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
    if (dateRegex.test(value)) {
      // If it's a valid date, convert it to a comparable format (YYYYMMDD)
      const [, day, month, year] = value.match(dateRegex);
      return `${year}${month}${day}`;
    }
    return value;
  };

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      setClick(true);
    }
  };


  return (
    <div className=" w-10/12 border-2 bg-white rounded-3xl h-auto">
      <div className="flex flex-wrap h-auto w-full my-4 items-center justify-center md:justify-between  font-semibold">
        <div className="pl-4 text-2xl flex items-center whitespace-nowrap  text-blue-600 font-semibold">
          Initiated Apex
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <div className="h-auto">
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
              className="text-black indent-2 font-medium w-56 sm:w-80 h-9 rounded-md border-2 border-black"
            />
          </div>
          <div
            onClick={() => setClick(true)}
            className="cursor-pointer text-center ml-3 w-24 rounded-md h-10 py-1 text-white bg-blue-600 border-2 mr-4"
          >
            Search
          </div>
        </div>
      </div>
      <div class="soverflow-y-auto rounded-3xl overflow-x-auto border-gray-700">
        <div style={{ width: "100%" }} class=" align-middle  inline-block">
          <div
            style={{ height: "50%", maxHeight: "50vh" }}
            class="shadow rounded-3xl sm:rounded-lg  h-96"
          >
            <table class="min-w-full text-sm rounded-3xl">
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
                        Date
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
                    className="px-12 py-3 text-center whitespace-nowrap tracking-wider cursor-pointer w-auto"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("id")}>
                        Actions
                      </div>
                      {sortedColumn === "id" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.id === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "white", fontWeight: "bold" }}>
                {filteredData.slice(startIndex, endIndex).map((data, index) => {
                  return (
                    <tr className="border-b-2">
                      <td class="pl-4">{index + 1}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.apex_no}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.faculty_name}
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
                        {data.status}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.created_at.toString().split('T')[0]}
                      </td>
                      <td className="flex gap-1 items-center justify-center w-auto">
                        {
                          data.status == "INITIATED" && (
                            <a
                              href={`/apex/items/${data.id}`}
                              class="border border-sky-400 h-8 bg-sky-400 text-white flex items-center justify-center rounded-md px-2 py-2  transition duration-500 ease select-none hover:bg-sky-600 focus:outline-none focus:shadow-outline"
                            >
                              Add
                            </a>
                          )
                        }
                        {
                          data.status != "INITIATED" && (
                            <a
                              href={`/apex/items/${data.id}`}
                              class="border border-sky-400 h-8 bg-sky-400 text-white flex items-center justify-center rounded-md px-2 py-2  transition duration-500 ease select-none hover:bg-sky-600 focus:outline-none focus:shadow-outline"
                            >
                              View
                            </a>
                          )
                        }
                        {
                          user.role == 'slsincharge' && (
                            <>
                              <button
                                class="border border-green-400 h-8 bg-green-400 text-white flex items-center justify-center rounded-md px-2 py-2  transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                              >
                                Accept
                              </button>
                              <button
                                class="border border-red-400 h-8 bg-red-400 text-white flex items-center justify-center rounded-md px-2 py-2  transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                              >
                                Reject
                              </button>
                            </>
                          )
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full h-16 flex justify-between border-t-2 items-center rounded-b-3xl">
        <button onClick={prevPage} className="border-2 rounded-md ml-7 h-10 w-20">
          Prev
        </button>

        <select
          onChange={handleRowSizeChange}
          value={rowSize}
          className="border-2 w-56 h-10 rounded-md mx-3"
        >
          <option
            value={stockData.length < 10 ? stockData.length : 10}
            className=""
          >
            10
          </option>
          <option value={stockData.length < 50 ? stockData.length : 50}>
            50
          </option>
          <option value={stockData.length}>Full</option>
        </select>
        <button onClick={nextPage} className="border-2 rounded-md mr-7 h-10 w-20">
          Next
        </button>
      </div>
      {/* {openPopup && selectedData && (
        <div className="blur-background">
          <MasterTablePopup data={selectedData} onClose={handleClosePopup} />
        </div>
      )} */}
    </div>
  );
}

export default Table;
