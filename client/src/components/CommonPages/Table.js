import React, { useState, useEffect } from "react";
import MasterTablePopup from "./MasterTablePopup";
import { exportToExcel, downloadPDF } from "../Reports/Reports";
import { FaFilter, FaDownload, FaFileExcel, FaFilePdf, FaSearch } from 'react-icons/fa';

function Table({ stockData, setStockData }) {
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [filterButton, setFilterButton] = useState(false);
    const [downloadButton, setDownloadButton] = useState(false);


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

    useEffect(() => {
        let results = [...stockData];
      
        if(searchQuery === ""){
          setFilteredData(results);
          return
        }
        
        if (click) {
            results = results.filter((item) => {
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
          
            setFilteredData(results);
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
        
        const sortedData = [...filteredData].sort((a, b) => {
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

       setFilteredData(sortedData);
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
      setViewColumn(false);
      setSelectAll(false)
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
        let filteredDataCopy = [...requiredData];
        if(previewSelectedColumn && inputValue) {
            filteredDataCopy = filteredDataCopy.filter((item) => {
                if (filterOptionSelected === "lessThan") {
                    return item[previewSelectedColumn] < inputValue
                } else if(filterOptionSelected === "greaterThan") {
                    return item[previewSelectedColumn] > inputValue;
                }
               return true;
              });
        }
        if (filteredDataCopy.length > 0) {
            setFilteredData(filteredDataCopy);
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
            let filteredDates = [...filteredData]
             filteredDates = filteredDates.filter((dateStr) => {
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
           <div className="flex flex-wrap h-auto w-full py-4 px-2 items-center justify-between font-semibold">
                <h2 className="text-2xl font-bold text-gray-800">Master Table</h2>
                 <div className="flex items-center space-x-3">
                <div className="relative">
                   <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onKeyDown={handleKeyEnter}
                       onClick={() => setClick(false)}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                   <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                   </div>
                    <button
                      onClick={() => setClick(true)}
                      className="hidden"
                    >search</button>
                  </div>
                  <div className="relative">
                  <button
                    onClick={() => setFilterButton(!filterButton)}
                    className="p-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                  >
                  <FaFilter className="text-gray-600 text-lg" />
                  </button>
                {filterButton &&(
                    <div className="absolute right-0 mt-2 w-72 bg-white border rounded shadow-lg z-10" style={{ maxHeight: '50vh', height:"50vh", overflowY: 'auto' }}>
                         <div
                                className="cursor-pointer border-b rounded-t w-full py-2 text-center text-lg font-medium text-gray-800 hover:bg-gray-100"
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
                                      <label className="w-full flex py-2 rounded-md  font-medium items-center hover:bg-gray-100">
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
                                          className="w-full flex py-2 rounded-md  font-medium items-center hover:bg-gray-100"
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
                                            }}
                                            className="w-60 text-black font-bold text-lg border-2 mt-3 mb-1  py-2  rounded-lg hover:bg-gray-100"
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
                                          <option value="greaterThan">Greater Than</option>
                                    </select>
                                )}
                                {filterOptionSelected === "lessThan" || filterOptionSelected === "greaterThan" && (
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
                                            className="w-12 h-12  font-bold border-2 rounded-lg hover:bg-gray-100"
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
                                            className="border-2 py-1 px-2 h-12 rounded-md font-bold hover:bg-gray-100"
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
                                        className="border-2 py-1 px-2 h-12 rounded-md font-bold hover:bg-gray-100"
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
                    <div className="relative">
                      <button
                        onClick={() => setDownloadButton(!downloadButton)}
                        className="p-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                       >
                           <FaDownload className="text-gray-600 text-lg"/>
                        </button>
                        {downloadButton && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                            <button
                                onClick={() => exportToExcel(filteredData)}
                                 className="flex items-center w-full py-2 px-4 text-gray-800 hover:bg-gray-100 focus:outline-none"
                            >
                              <FaFileExcel className="mr-2"/>
                                Export as Excel
                            </button>
                            <button
                                onClick={() => downloadPDF(filteredData)}
                                className="flex items-center w-full py-2 px-4 text-gray-800 hover:bg-gray-100 focus:outline-none"
                            >
                              <FaFilePdf className="mr-2"/>
                                Export as PDF
                             </button>
                           </div>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="overflow-y-auto  overflow-x-auto border-gray-700 rounded-lg">
                <div style={{ width: "100%" }} className=" align-middle  inline-block">
                    <div
                        style={{ height: "50%", maxHeight: "40vh" }}
                        className="shadow sm:rounded-lg  h-96"
                    >
                        <table className="min-w-full text-sm ">
                            <thead className=" text-md uppercase border-b-2 font-medium">
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
                                                    <div>{columnName.replace("_", " ")}</div>
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