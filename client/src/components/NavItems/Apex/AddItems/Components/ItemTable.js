import React, { useState, useEffect } from "react";
// import MasterTablePopup from "./MasterTablePopup";

function ItemTable({ data, user }) {

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
      setFilteredData(data)
      return
    }
    if (click) {
      const filteredResults = data.filter((item) => {
        const propertiesToSearch = [
          "id",
          "apex_no",
          "consumable",
          "item_type",
          "item_name",
          "item_subname",
          "item_description",
          "item_quantity",
          "item_cost",
          'quantity_units',
          "faculty_id",
          "dept_id",
          "apex_reason",
          "manufacturer_id",
          "supplier_id",
          "item_status",
          "item_date",
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
  }, [click, data, searchQuery]);

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
    consumable: "asc",
    item_type: "asc",
    item_name: "asc",
    item_subname: "asc",
    item_description: "asc",
    item_quantity: "asc",
    item_cost: "asc",
    quantity_units: "asc",
    faculty_id: "asc",
    dept_id: "asc",
    apex_reason: "asc",
    manufacturer_id: "asc",
    supplier_id: "asc",
    item_status: "asc",
    item_date: "asc"
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
          Items List
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
                    onClick={() => sortData("consumable")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Consumable</div>
                      {sortedColumn === "consumable" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.consumable === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("item_type")}>
                        Item Type
                      </div>
                      {sortedColumn === "item_type" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.item_type === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("item_name")}>
                        Item Name
                      </div>
                      {sortedColumn === "item_name" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.item_name === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("item_subname")}>
                        Item Subname
                      </div>
                      {sortedColumn === "item_subname" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.item_subname === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("item_description")}>
                        Item decsription
                      </div>
                      {sortedColumn === "item_description" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.item_description === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("item_quantity")}>
                        Quantity
                      </div>
                      {sortedColumn === "item_quantity" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.item_quantity === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("item_cost")}>Cost</div>
                      {sortedColumn === "item_cost" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.item_cost === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("quantity_units")}>
                        Quantity units
                      </div>
                      {sortedColumn === "quantity_units" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.quantity_units === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("faculty_id")}>
                        Faculty Id
                      </div>
                      {sortedColumn === "faculty_id" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.faculty_id === "asc" ? "up" : "down"
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
                    className="px-12 py-3 text-center whitespace-nowrap tracking-wider cursor-pointer w-auto"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("apex_reason")}>
                        Apex Reason
                      </div>
                      {sortedColumn === "apex_reason" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.apex_reason === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("manufacturer_id")}>
                        Manufacturer Id
                      </div>
                      {sortedColumn === "manufacturer_id" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.manufacturer_id === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("supplier_id")}>
                        Supplier Id
                      </div>
                      {sortedColumn === "supplier_id" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.supplier_id === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("item_status")}>
                        Status
                      </div>
                      {sortedColumn === "item_status" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.item_status === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("item_date")}>
                        Date
                      </div>
                      {sortedColumn === "item_date" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.item_date === "asc" ? "up" : "down"
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
                        {data.consumable}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.item_type}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.item_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.item_subname}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.item_description}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.item_quantity}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.item_cost}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.quantity_units}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.faculty_id}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.dept_id}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.apex_reason}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.manufacturer_id}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.supplier_id}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.item_status}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.item_date.split("T")[0]}
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
            value={data.length < 10 ? data.length : 10}
            className=""
          >
            10
          </option>
          <option value={data.length < 50 ? data.length : 50}>
            50
          </option>
          <option value={data.length}>Full</option>
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

export default ItemTable;
