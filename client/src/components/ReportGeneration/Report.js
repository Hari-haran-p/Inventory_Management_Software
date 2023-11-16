import React, { useState, useEffect } from "react";
import axios from "axios";
import ReportGeneration from "./MasterTableReport/ReportGeneration";

function Report() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [requiredData, setRequiredData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [viewColumn, setViewColumn] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, [4000]);
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

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/getAdminStockData")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://localhost:4000/api/getItems")
      .then((response) => {
        setItemData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  axios
  .get("http://localhost:4000/api/getAdminStockData")
  .then((response) => {
    setData(response.data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
  

  const handleOkClick = () => {
    if (selectedTable === "masterTable") {
      const selectedData = data.map((item) => {
        const selectedItem = {};
        for (const key in selectedColumns) {
          if (selectedColumns[key]) {
            selectedItem[key] = item[key];
          }
        }
        return selectedItem;
      });

      if (Object.keys(selectedData[0]).length > 0) {
        setRequiredData(selectedData);
      } else {
        setError("Please Select Column");
      }
    }
    if (selectedTable === "itemTable") {
      const selectedData = itemData.map((item) => {
        const selectedItem = {};
        for (const key in selectedColumns) {
          if (selectedColumns[key]) {
            selectedItem[key] = item[key];
          }
        }
        return selectedItem;
      });
      if (Object.keys(selectedData[0]).length > 0) {
        setRequiredData(selectedData);
      } else {
        setError("Please Select Column");
      }
    }
  };

  const handleColumn = () => {
    if (selectedTable === "masterTable") {
      const masterData = data.map((item) => {
        const updatedItem = {};
        for (const key of Object.keys(item)) {
          updatedItem[key] = false;
        }
        return updatedItem;
      });
      const masterColumn = masterData[0];
      setSelectedColumns(masterColumn);
      setViewColumn(!viewColumn);
    } else if (selectedTable === "itemTable") {
      // console.log("true");
      const masterData = itemData.map((item) => {
        const updatedItem = {};
        for (const key of Object.keys(item)) {
          updatedItem[key] = false;
        }
        return updatedItem;
      });
      const masterColumn = masterData[0];
      setSelectedColumns(masterColumn);
      setViewColumn(!viewColumn);
    } else {
      setError("select the table name");
    }
  };

  return (
    <div>
      <div
        style={{ backgroundColor: "#F4F4F4" }}
        className="flex h-full justify-center items-center"
      >
        {message ? (
          <div
            class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded  fixed z-50 top-0 message"
            role="alert"
          >
            <span class="block sm:inline">{message}</span>
          </div>
        ) : null}
        {error ? (
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 z-50 "
            role="alert"
          >
            <span class="block sm:inline">{error}</span>
          </div>
        ) : null}
      </div>

      <div className="bg-white h-screen animate overflow-x-auto overflow-y-auto rounded-lg w-full">
        <div className="flex flex-wrap relative gap-5 items-center justify-between	pt-4">
          <div className="text-2xl whitespace-nowrap animate1">
            Report Generation
          </div>
          <div className="flex flex-wrap gap-5">
            <div>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                name="dropdown"
                className="bg-blue-500 animate1 cursor-pointer whitespace-nowrap hover:bg-blue-700 text-white text-sm h-10 py-2 px-4 rounded w-42"
              >
                <option
                  value="selectTable"
                  type="button"
                  className="bg-white text-black"
                >
                  Select Table
                </option>
                <option
                  value="masterTable"
                  type="button"
                  className="bg-white text-black"
                >
                  Master Table
                </option>
                <option
                  value="itemTable"
                  type="button"
                  className="bg-white text-black"
                >
                  Item Table
                </option>
              </select>
            </div>
            <div className="relative">
              <button
                className="mr-4 shadow-lg cursor-pointer border-2 rounded-lg ml-5 w-80 py-2 bg-blue-500 text-white"
                type="button"
                onClick={() => {
                  handleColumn();
                }}
              >
                Show Options
              </button>
            </div>
            {(selectedTable === "masterTable" ||
              selectedTable === "itemTable") &&
              viewColumn === true && (
                <div className="bg-white absolute border w-80 shadow-lg right-4 top-16">
                  <div className="p-4 flex flex-col justify-center items-center">
                    <label className="w-full flex items-center">
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
                      <label key={key} className="w-full flex items-center">
                        <input
                          className="w-16 h-5 "
                          type="checkbox"
                          name={key}
                          checked={selectedColumns[key]}
                          onChange={handleCheckboxChange}
                        />
                        {/* {console.log(selectedColumns[key])} */}
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
                      className="w-60 bg-blue-500 text-white border-none mt-5 py-2 border-black border-2 rounded-xl"
                    >
                      Preview Page
                    </button>
                  </div>
                </div>
              )}
          </div>
          <div className="w-full mt-20">
            <ReportGeneration
              setRequiredData={setRequiredData}
              selectedColumns={selectedColumns}
              selectedTable={selectedTable}
              requiredData={requiredData}
              handleOkClick={handleOkClick}
              setError={setError}
              viewColumn={viewColumn}
            />
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="flex items-center flex-col"></div>
    </div>
  );
}

export default Report;
