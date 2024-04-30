import React, { useState, useEffect } from "react";
// import MasterTablePopup from "./MasterTablePopup";

function Table({ scrapData,isVisible }) {
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
    if(searchQuery == ""){
      setFilteredData(scrapData)
      return
    }
    if (click) {
      const filteredResults = scrapData.filter((item) => {
        const propertiesToSearch = [
          "id",
          "apex_no",
          "stock_id",
          "item_type",
          "item_name",
          "item_subname",
          "inventory_value",
          "manufacturer_name",
          "supplier_name",
          "scrap_qty",
          "inventory_value",
          "req_labcode",
          "req_labname",
          'reject_description',
          "status",
          "date"
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
  }, [click, scrapData, searchQuery]);

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
    apex_no:"asc",
    stock_id: "asc",
    item_type: "asc",
    item_name: "asc",
    item_subname: "asc",
    inventory_value: "asc",
    manufacturer_name: "asc",
    supplier_name: "asc",
    scrap_qty: "asc",
    inventory_value: "asc",
    req_labcode: "asc",
    req_labname: "asc",
    reject_description:"asc",
    status:"asc",
    date:"asc"
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

  if (!isVisible) return null;

  return (
    <div className="w-full flex justify-center p-10 items-center">
    <div className=" w-10/12 border-2 bg-white rounded-3xl h-auto">
      <div className="flex flex-wrap h-auto w-full my-4 items-center justify-center md:justify-between  font-semibold">
        <div className="pl-4 text-2xl flex items-center whitespace-nowrap  text-blue-600 font-semibold">
          Scrap Table
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
              style={{minWidth: "70%" }}
              className="text-black indent-2 font-medium w-56 sm:w-80 h-9 rounded-md border-2 border-black"
            />
          </div>
          <button
              onClick={() => setClick(true)}
              className="cursor-pointer text-center ml-3 w-24 rounded-md h-10 py-1 text-white bg-blue-600 border-2 mr-4"
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
                          className={`bi bi-arrow-${sortOrder.id === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => sortData("id")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Scrap Id</div>
                      {sortedColumn === "id" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.id === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => sortData("stock_id")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Item Code</div>
                      {sortedColumn === "stock_id" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.stock_id === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => sortData("item_type")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Item Type</div>
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
                      <div onClick={() => sortData("inventory_value")}>
                        Cost per Item
                      </div>
                      {sortedColumn === "inventory_value" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.inventory_value === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("manufacturer_name")}>
                        Manufacturer Name
                      </div>
                      {sortedColumn === "manufacturer_name" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.manufacturer_name === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("supplier_name")}>
                        Supplier Name
                      </div>
                      {sortedColumn === "supplier_name" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.supplier_name === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("scrap_qty")}>
                        Scrap Qty 
                      </div>
                      {sortedColumn === "scrap_qty" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.scrap_qty === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("inventory_value")}>
                        Scrap Value
                      </div>
                      {sortedColumn === "inventory_value" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.inventory_value === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("req_labcode")}>Labcode</div>
                      {sortedColumn === "req_labcode" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.req_labcode === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("req_labname")}>
                        Labname
                      </div>
                      {sortedColumn === "req_labname" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.req_labname === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("reject_description")}>
                        Description
                      </div>
                      {sortedColumn === "reject_description" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.reject_description === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("date")}>
                        Date
                      </div>
                      {sortedColumn === "date" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.date === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "white", fontWeight: "bold" }}>
                {filteredData.slice(startIndex,endIndex).map((data, index) => {
                  return (
                    <tr className="border-b-2">
                      <td class="pl-4">{index + 1}</td>
                      <td class="px-6 py-4 whitespace-nowrap ">
                        {data.apex_no}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.id}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.stock_id}
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
                        {data.inventory_value}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.manufacturer_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.supplier_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.scrap_qty}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.inventory_value}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.req_labcode}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.req_labname}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {!data.reject_description ? "-" : data.reject_description}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.status}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.date.toString().split('T')[0]}
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
            value={scrapData.length < 10 ? scrapData.length : 10}
            className=""
          >
            10
          </option>
          <option value={scrapData.length < 50 ? scrapData.length : 50}>
            50
          </option>
          <option value={scrapData.length}>Full</option>
        </select>
        <button onClick={nextPage} className="border-2 rounded-md mr-7 h-10 w-20">
          Next
        </button>
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
