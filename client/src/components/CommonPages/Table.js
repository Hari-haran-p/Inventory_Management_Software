import React, { useState, useEffect } from "react";
import MasterTablePopup from "./MasterTablePopup";
import { exportToExcel, downloadPDF } from "../Reports/Reports";

function Table({ stockData, setStockData }) {
  //For open popup
  // console.log(stockData);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [filterButton, setFilterButton] = useState(false);

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
  const [filteredData, setFilteredData] = useState(stockData);
  const [click, setClick] = useState(false);
  // const [searchData,setSearchData] = useState(stockData);
  // console.log(searchData);
  // console.log(filteredData);

  useEffect(() => {
    if(searchQuery == ""){
      setFilteredData(stockData)
      return
    }
    if (click) {
      const filteredResults = filteredData.filter((item) => {
        const propertiesToSearch = [
          "id",
          "apex_no",
          "item_code",
          "item_type",
          "item_name",
          "item_subname",
          "item_description",
          "cost_per_item",
          "quantity_units",
          "manufacturer_id",
          "supplier_id",
          "manufacturer_name",
          "supplier_name",
          "contact",
          "stock_qty",
          "inventory_value",
          "user_id",
          "dept_id",
          "stock_date",
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
  }, [click,stockData, filteredData, searchQuery]);

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
    item_code: "asc",
    item_type: "asc",
    item_name: "asc",
    item_subname: "asc",
    item_description: "asc",
    cost_per_item: "asc",
    quantity_units: "asc",
    manufacturer_id: "asc",
    supplier_id: "asc",
    manufacturer_name: "asc",
    supplier_name: "asc",
    contact: "asc",
    stock_qty: "asc",
    inventory_value: "asc",
    user_id: "asc",
    dept_id: "asc",
    stock_date: "asc",
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

  //filter functions
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [viewColumn, setViewColumn] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState({});
  let columnNames = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];
  if (columnNames.length > 0) delete columnNames[0];
  const [downloadButton, setDownloadButton] = useState(false);
  const [previewSelectedColumn, setPreviewSelectedColumn] = useState("");
  const [filterOptionSelected, setFilterOptionSelected] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, [5000]);
  }, [message, error]);

  // console.log(selectedTable);
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "selectAll") {
      setSelectAll(checked);
      const updatedSelectedColumns = {};
      for (const key in selectedColumns) {
        updatedSelectedColumns[key] = checked;
      }

      setSelectedColumns(updatedSelectedColumns);
    } else {
      setSelectedColumns({
        ...selectedColumns,
        [name]: checked,
      });
    }
  };

  const handleOkClick = () => {
    const selectedData = stockData.map((item) => {
      const selectedItem = {};
      for (const key in selectedColumns) {
        if (selectedColumns[key]) {
          selectedItem[key] = item[key];
        }
      }
      return selectedItem;
    });

    if (Object.keys(selectedData[0]).length > 0) {
      setFilteredData(selectedData);
    } else {
      setError("Please Select Column");
    }
  };

  const handleColumn = () => {
    const masterData = stockData.map((item) => {
      const updatedItem = {};
      for (const key of Object.keys(item)) {
        updatedItem[key] = false;
      }
      return updatedItem;
    });
    const masterColumn = masterData[0];
    setSelectedColumns(masterColumn);
    setViewColumn(!viewColumn);
  };

  const filterFunction = (requiredData) => {
    const filteredData1 = filteredData.filter(
      (item) => item[previewSelectedColumn] < inputValue
    );
    if (filteredData.length > 0) {
      setFilteredData(filteredData1);
    } else {
      setError("NO DATA");
    }
  };

  const parseDate = (dateStr) => {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day);
    }
    return null;
  };

  const formatDate = (dateString) => {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const [year, month, date] = parts;
      return `${date}-${month}-${year}`;
    }
    return dateString;
  };

  const handleFilter = () => {
    const fromDateObj = parseDate(fromDate);
    const toDateObj = parseDate(toDate);

    if (!fromDateObj || !toDateObj) {
      setError("Please Select Date");
      return;
    }

    if (fromDateObj <= toDateObj) {
      const filteredDates = filteredData.filter((dateStr) => {
        const dateObj = parseDate(dateStr[previewSelectedColumn]);
        return dateObj >= fromDateObj && dateObj <= toDateObj;
      });
      if (filteredDates.length > 0) {
        setFilteredData(filteredDates);
      } else {
        setError("No Data");
      }
    } else {
      setError("Please Select The Valid Date");
    }
  };

  const handleEnterClick = (e) => {
    if (e.key === "Enter") {
      filterFunction(filteredData);
    }
  };

  const clearFilter = (stockdata) => {
    setFilteredData(stockData);
  };

  return (
    <div className="w-10/12 relative border-2 bg-white rounded-3xl h-auto">
      <div className="flex flex-wrap h-auto w-full my-4 items-center justify-center lg:justify-between font-semibold ">
        <div
          style={{ width: "200px" }}
          className="pl-4 text-xl md:text-2xl flex h-auto items-center justify-center whitespace-nowrap text-blue-600 font-semibold"
        >
          Master Table
          <div className="flex pb-1 lg:hidden">
            <div
              onClick={() => {
                setFilterButton(!filterButton);
              }}
              className="flex justify-center items-center border-blue-600 rounded-md filter-button"
            >
              <div className="flex justify-center items-center rounded-md w-auto pl-4 filter-button">
                <i class="bi bi-funnel text-blue-500 text-xl"></i>
              </div>
            </div>
            <div
              className="px-4"
              onClick={() => {
                setDownloadButton(!downloadButton);
                setFilterButton(false);
              }}
            >
              <i class="bi bi-cloud-arrow-down text-blue-500 text-2xl"></i>
            </div>
          </div>
        </div>

        <div
          style={{ width: "650px" }}
          className="flex items-center h-auto justify-center lg:justify-end"
        >
          <div className="flex flex-wrap-reverse justify-center items-center">
            <div className="flex justify-center items-center px-2">
              <input
                name="inputQuery"
                type="text"
                onKeyDown={handleKeyEnter}
                value={searchQuery}
                onClick={()=>setClick(false)}
                onChange={(e) => {    
                  setSearchQuery(e.target.value);
                }}
                placeholder="Search..."
                style={{ maxWidth: "100%", width: "70%" }}
                className="text-black indent-2 h-7 sm:h-9 font-medium border-2 rounded-md md:rounded-lg border-black"
              />

              <button
                onClick={() => setClick(true)}
                className="cursor-pointer ml-3 w-18 h-8 text-sm font-medium md:font-medium md:text-lg sm:w-24 rounded-md sm:h-10 py-1 px-1 text-white bg-blue-600 border-2"
              >
                Search
              </button>
            </div>
            <div className="hidden lg:flex mb-1">
              <div className="w-auto  flex">
                <div
                  onClick={() => {
                    setFilterButton(!filterButton);
                  }}
                  className="flex justify-center items-center border-blue-600 rounded-md filter-button"
                >
                  <div className="flex justify-center items-center rounded-md w-auto filter-button">
                    <i class="bi bi-funnel text-blue-500 text-3xl"></i>
                    <i class="bi bi-chevron-down text-sm text-blue-500"></i>
                  </div>
                </div>
              </div>
              <div
                className="px-4"
                onClick={() => {
                  setDownloadButton(!downloadButton);
                  setFilterButton(false);
                }}
              >
                <i class="bi bi-download text-blue-500 text-3xl"></i>
              </div>
            </div>
          </div>

          {downloadButton === true && filterButton === false && (
            <>
              <div className="h-auto w-auto flex flex-col bg-white rounded-lg border-2 absolute right-3 top-12 download-popup md:top-16">
                <button
                  onClick={() => {
                    exportToExcel(filteredData);
                  }}
                  className="p-2 rounded-lg text-lg border-b-2 hover:bg-blue-500"
                >
                  Export as Excel
                </button>
                <button
                  onClick={() => {
                    downloadPDF(filteredData);
                  }}
                  className="p-2 rounded-lg text-lg border-b-2 hover:bg-blue-500"
                >
                  Export as PDF
                </button>
              </div>
            </>
          )}
          {filterButton === true && (
            <div className="h-96 w-96 absolute filter-popup overflow-y-scroll rounded-lg z-20 lg:right-4 lg:top-16 bg-white border-2">
              <div
                className="cursor-pointer border-2 rounded-lg w-11/12 py-2 text-center m-2 text-lg font-bold text-black"
                type="button"
                onClick={() => {
                  handleColumn();
                }}
              >
                Show Columns
              </div>
              {viewColumn === true && (
                <div className="absolute bg-white w-full">
                  <div className="flex flex-col mt-3 justify-center items-center">
                    <label className="w-full flex py-2 rounded-md hover:bg-blue-500 hover:text-white font-medium items-center">
                      <input
                        className="w-16 h-5"
                        type="checkbox"
                        name="selectAll"
                        checked={selectAll}
                        onChange={handleCheckboxChange}
                      />
                      Select All
                    </label>
                    {Object.keys(selectedColumns).map((key) => (
                      <label
                        key={key}
                        className="w-full flex py-2 rounded-md hover:bg-blue-500 hover:text-white font-medium items-center "
                      >
                        <input
                          className="w-16 h-5"
                          type="checkbox"
                          name={key}
                          checked={selectedColumns[key]}
                          onChange={handleCheckboxChange}
                        />
                        {key}
                      </label>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        handleOkClick();
                        setViewColumn(false);
                        setSelectAll(false);
                      }}
                      className="w-60 text-black font-bold text-lg border-2 mt-3 mb-1 hover:bg-blue-500 hover:text-white py-2  rounded-lg"
                    >
                      Preview Page
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-start items-center flex-wrap">
                {(selectedColumns.cost_per_item === true ||
                  selectedColumns.stock_qty === true ||
                  selectedColumns.inventory_value === true ||
                  selectedColumns.stock_date === true) && (
                  <select
                    className="border-2 h-12 py-1 px-2 m-2 rounded-md bg-white font-bold"
                    name="column"
                    value={previewSelectedColumn}
                    onChange={(e) => {
                      const selectedColumnName = e.target.value;
                      setPreviewSelectedColumn(selectedColumnName);
                      setFilterOptionSelected("none");
                    }}
                  >
                    <option value="selectColumn">Select Column</option>
                    {selectedColumns.cost_per_item === true && (
                      <option value="cost_per_item">Cost Per Item</option>
                    )}
                    {selectedColumns.inventory_value === true && (
                      <option value="inventory_value">Inventory Value</option>
                    )}
                    {selectedColumns.stock_qty === true && (
                      <option value="stock_qty">Stock Quantity</option>
                    )}
                    {selectedColumns.stock_date === true && (
                      <option value="stock_date">Stock Date</option>
                    )}
                  </select>
                )}
                {(previewSelectedColumn === "cost_per_item" ||
                  previewSelectedColumn === "inventory_value" ||
                  previewSelectedColumn === "stock_qty") && (
                  <select
                    style={{ width: "155px" }}
                    className="border-2 h-12 m-2 py-1 px-2 rounded-md bg-white font-bold"
                    value={filterOptionSelected}
                    onChange={(e) => {
                      setFilterOptionSelected(e.target.value);
                      if (e.target.value === "none") {
                        handleOkClick();
                      }
                    }}
                  >
                    <option value="none">none</option>
                    <option value="lessThan">Less Than</option>
                  </select>
                )}
                {filterOptionSelected === "lessThan" && (
                  <div className=" flex gap-1 m-2">
                    <input
                      type="number"
                      onKeyDown={handleEnterClick}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                      }}
                      className=" indent-2 w-32 h-12 border-2 rounded-md"
                    ></input>
                    <button
                      onClick={() => {
                        filterFunction(filteredData);
                      }}
                      className="w-12 h-12 hover:bg-blue-500 hover:text-white font-bold border-2 rounded-lg"
                    >
                      ok
                    </button>
                  </div>
                )}
                {previewSelectedColumn === "stock_date" && (
                  <div className="flex flex-col p-2 m-2 rounded-md flex-wrap border-2 gap-2">
                    <div>
                      <label htmlFor="fromDate">From:</label>
                      <input
                        className="border-2 h-12 w-72 rounded-lg"
                        type="date"
                        id="fromDate"
                        onChange={(e) => {
                          const formattedDate = formatDate(e.target.value);
                          setFromDate(formattedDate);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="toDate">
                        To:<span className="invisible">hg</span>
                      </label>
                      <input
                        className="border-2 h-12 w-72 rounded-lg"
                        type="date"
                        id="toDate"
                        onChange={(e) => {
                          const formattedDate = formatDate(e.target.value);
                          setToDate(formattedDate);
                        }}
                      />
                    </div>
                    <button
                      className="border-2 py-1 px-2 h-12 rounded-md hover:bg-blue-500 hover:text-white font-bold"
                      onClick={handleFilter}
                    >
                      Filter Dates
                    </button>
                  </div>
                )}
              </div>
              {selectedColumns && (
                <div className="flex justify-start items-center m-2">
                  <button
                    className="border-2 py-1 px-2 h-12 rounded-md hover:bg-blue-500 hover:text-white font-bold "
                    onClick={() => {
                      clearFilter(stockData);
                    }}
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div class="overflow-y-auto  overflow-x-auto border-gray-700 rounded-lg">
        <div style={{ width: "100%" }} class=" align-middle  inline-block">
          <div
            style={{ height: "50%", maxHeight: "40vh" }}
            class="shadow sm:rounded-lg  h-96"
          >
            <table class="min-w-full text-sm ">
              <thead class=" text-md uppercase border-b-2 font-medium">
                <tr className="border-r-white">
                <th className="px-6 py-4 text-start">s.no</th>
                  {columnNames.map((columnName, index) => {
                    return (
                      <th
                        key={index}
                        onClick={() => sortData(columnName)}
                        scope="col"
                        className="px-6 py-3 text-left whitespace-nowrap cursor-pointer"
                      >
                        {/* {console.log(columnName)} */}
                        <div className="flex">
                          <div>{columnName.replace("_"," ")}</div>
                          {sortedColumn === columnName && (
                            <i
                              className={`bi bi-arrow-${
                                sortOrder[columnName] === "asc" ? "up" : "down"
                              } ml-2`}
                            ></i>
                          )}
                        </div>
                      </th>
                    );
                  })}
                  {filterButton === false && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                    ></th>
                  )}
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "white", fontWeight: "bold" }}>
                {filteredData
                  .slice(startIndex, endIndex)
                  .map((row, rowIndex) => (
                    <tr key={startIndex + rowIndex} className="border-b-2">
                      <td class="pl-4">{startIndex + rowIndex + 1}</td>
                      {columnNames.map((columnName, columnIndex) => (
                        <td
                          key={columnIndex}
                          className=" px-6 py-4 whitespace-nowrap"
                        >
                          {row[columnName]}
                          {/* {console.log(row[columnName])} */}
                        </td>
                      ))}
                      {filterButton === false && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <i
                            onClick={() => handleOpenPopup(row)}
                            className="bi bi-eye cursor-pointer"
                          ></i>
                        </td>
                      )}
                    </tr>
                  ))}
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
      {openPopup && selectedData && (
        <div className="blur-background">
          <MasterTablePopup data={selectedData} onClose={handleClosePopup} />
        </div>
      )}
    </div>
  );
}

export default Table;
