import React, { useState } from "react";

function ReportView({
  requiredData,
  handleOkClick,
  setRequiredData,
  selectedColumns,
  selectedTable,
  setError,
  viewColumn,
  exportToExcel,
  downloadPDF,
}) {

  const columnNames = Object.keys(requiredData[0]);
  const [previewSelectedColumn, setPreviewSelectedColumn] = useState("");
  const [filterOptionSelected, setFilterOptionSelected] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filterFunction = (requiredData) => {
    const filteredData = requiredData.filter(
      (item) => item[previewSelectedColumn] < inputValue
    );
    if (filteredData.length > 0) {
      setRequiredData(filteredData);
    } else {
      setError("NO DATA");
    }
  };

  const parseDate = (dateStr) => {
    const parts = dateStr.split("-");
    // console.log(parts);
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
      const filteredDates = requiredData.filter((dateStr) => {
        const dateObj = parseDate(dateStr[previewSelectedColumn]);
        return dateObj >= fromDateObj && dateObj <= toDateObj;
      });
      if(filteredDates.length > 0){
        setRequiredData(filteredDates);
      }else{
        setError("No Data");
      }
    } else {
      setError("Please Select The Valid Date");
    }
  };

  //<---------------------For sort functionality------------------------->
  const [sortOrders, setSortOrders] = useState({
    item_code: "asc",
    item_type: "asc",
    item_name: "asc",
    item_subname: "asc",
    item_description: "asc",
    manufacturer_id: "asc",
    quantity_units: "asc",
    supplier_id: "asc",
    cost_per_item: "asc",
    id: "asc",
    apex_no: "asc",
    manufacturer_name: "asc",
    supplier_name: "asc",
    contact: "asc",
    stock_qty: "asc",
    inventory_value: "asc",
    user_id: "asc",
    dept_id: "asc",
    stock_date: "asc",
  });

  const [sortedColumn, setSortedColumn] = useState();
  const handleSort = (column) => {
    setSortOrders((prevSortOrders) => ({
      ...prevSortOrders,
      [column]: prevSortOrders[column] === "asc" ? "desc" : "asc",
    }));

    setSortedColumn(column);

    requiredData.sort((a, b) => {
      const valueA =
        typeof a[column] === "string" ? a[column].toLowerCase() : a[column];
      const valueB =
        typeof b[column] === "string" ? b[column].toLowerCase() : b[column];

      if (valueA < valueB) {
        return sortOrders[column] === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrders[column] === "asc" ? 1 : -1;
      }
      return 0;
    });

    setRequiredData(requiredData);
  };

  const handleEnterClick = (e) => {
    if (e.key === "Enter") {
      filterFunction(requiredData);
    }
  };





  return (
    <div>
      {columnNames.length > 0 && viewColumn === false && (
        <>
          <div className="flex  w-full h-auto gap-3  justify-center font-semibold">
            <div className="sub-titles2 animate1 text-center text-2xl font-semibold">
              Master Table
            </div>
            <div>
              {(selectedTable === "masterTable" ||
                selectedTable === "itemTable") &&
                (selectedColumns.cost_per_item === true ||
                  selectedColumns.stock_qty === true ||
                  selectedColumns.inventory_value === true ||
                  selectedColumns.stock_date === true) && (
                  <select
                    className="border-2 border-black rounded-lg"
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
            </div>
            {(previewSelectedColumn === "cost_per_item" ||
              previewSelectedColumn === "inventory_value" ||
              previewSelectedColumn === "stock_qty") && (
              <select
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
            {previewSelectedColumn === "stock_date" && (
              <div className="flex gap-2">
                <div>
                  <label htmlFor="fromDate">From:</label>
                  <input
                    className="border-2 border-black rounded-lg"
                    type="date"
                    id="fromDate"
                    onChange={(e) => {
                      const formattedDate = formatDate(e.target.value);
                      setFromDate(formattedDate);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="toDate">To:</label>
                  <input
                    className="border-2 border-black rounded-lg"
                    type="date"
                    id="toDate"
                    onChange={(e) => {
                      const formattedDate = formatDate(e.target.value);
                      setToDate(formattedDate);
                    }}
                  />
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
                  onClick={handleFilter}
                >
                  Filter Dates
                </button>
              </div>
            )}

            {filterOptionSelected === "lessThan" && (
              <div className="">
                <input
                  type="number"
                  onKeyDown={handleEnterClick}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                  className="w-20 h-auto border-2 rounded-lg border-black"
                ></input>
                <button
                  onClick={() => {
                    filterFunction(requiredData);
                  }}
                  className="w-10 h-auto border-2 border-black rounded-lg"
                >
                  ok
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div
              style={{
                width: "80%",
                height: "400px",
                maxHeight: "360px",
                maxWidth: "1500px",
              }}
              className="shadow overflow-x-auto overflow-y-auto sm:rounded-lg "
            >
              <table className="min-w-full text-sm">
                <thead
                  style={{ backgroundColor: "#0f6af2", color: "white" }}
                  className="text-xs uppercase font-medium"
                >
                  <tr>
                    {columnNames.map((columnName, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-center whitespace-nowrap tracking-wider cursor-pointer"
                      >
                        <div className="flex">
                          <div
                            onClick={() => {
                              handleSort(columnName);
                            }}
                          >
                            {columnName}
                          </div>
                          {sortedColumn === columnName && (
                            <i
                              className={`bi bi-arrow-${
                                sortOrders[columnName] === "asc" ? "up" : "down"
                              } ml-2`}
                            ></i>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "white", fontWeight: "bold" }}>
                  {requiredData.map((row, rowIndex) => (
                    <tr key={rowIndex} className=" shadow-md rounded-xl">
                      {columnNames.map((columnName, columnIndex) => (
                        <td
                          key={columnIndex}
                          className=" px-6 py-4 whitespace-nowrap"
                        >
                          {row[columnName]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-end">
              <div>
                {columnNames.length > 0 ? (
                  <button
                    onClick={() => downloadPDF(requiredData)}
                    className="btn bg-blue-500 text-white font-bold border-white border-2 px-3 py-2 rounded-lg"
                  >
                    Download PDF
                  </button>
                ) : (
                  "Please Select Column"
                )}
              </div>
              <div>
                <button
                  className="focus:ring-4 animate1 shadow-lg transform active:scale-75 transition-transform cursor-pointer border-2 rounded-lg ml-5 w-36 py-2 bg-blue-500 text-white"
                  onClick={exportToExcel}
                >
                  Export to Excel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ReportView;
