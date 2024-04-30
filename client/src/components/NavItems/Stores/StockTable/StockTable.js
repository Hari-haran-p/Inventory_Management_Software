import React from "react";
import { useEffect, useState } from "react";
import StockPopup from "./StockPopup";
import StockEdit from "./StockEdit";

function StockTable({getStock , fetchGetStock, setMessage, setError, setIsLoading, isLoading}) {

  //For open popup
  const [stockOpenPopup, setStockOpenPopup] = useState(false);
  const [stockSelectedData, setStockSelectedData] = useState(null);

  const handleStockOpenPopup = (data) => {
    setStockSelectedData(data);
    setStockOpenPopup(true);
  };

  const handleStockClosePopup = (data) => {
    setStockSelectedData(data);
    setStockOpenPopup(null);
  };

  //for edit popup
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setEditData(data);
  };

  const handleCloseEdit = (data) => {
    setOpenEdit(false);
    // setEditData(null);
    fetchGetStock();
  };
  const onSubmit = () => {
    fetchGetStock();
    handleCloseEdit();
  };

  // Search functionality

  const [searchQuery, setSearchQuery] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if(searchQuery == ""){
      setFilteredData(getStock)
      return
    }
    if (click) {
      const filteredResults = getStock.filter((item) => {
        const propertiesToSearch = [
          "cost",
          "created_at",
          "id",
          "faculty_id",
          "dept_id",
          "manufacturer_id",
          "supplier_id",
          "quantity",
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
  }, [click, getStock, searchQuery]);

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
  const [sortOrders, setSortOrders] = useState({
    id: "asc",
    type: "asc",
    name: "asc",
    subname: "asc",
    description: "asc",
    manufacturer_id: "asc",
    quantity_units: "asc",
    supplier_id: "asc",
    cost: "asc",
  });
  
  const [sortedColumn, setSortedColumn] = useState("");

  const handleSort = (column) => {
    setSortOrders((prevSortOrders) => ({
      ...prevSortOrders,
      [column]: prevSortOrders[column] === "asc" ? "desc" : "asc",
    }));
  
    setSortedColumn(column);
    
    filteredData.sort((a, b) => {
      const valueA = getValueForComparison(typeof a[column] === "string" ? a[column].toLowerCase() : a[column]);
      const valueB = getValueForComparison(typeof b[column] === "string" ? b[column].toLowerCase() : b[column]);
  
      if (valueA < valueB) {
        return sortOrders[column] === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrders[column] === "asc" ? 1 : -1;
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

  // <-------------------------------search bar enter function---------------------------->

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      setClick(true);
    }
  };

  return (
    <div className="w-full h-full flex justify-center pt-10 items-center">
    <div className=" w-10/12 relative border-2 bg-white rounded-3xl h-auto">
    <div className="flex flex-wrap h-auto w-full my-4 items-center justify-center md:justify-between  font-semibold">
        <div className="pl-4 text-2xl flex items-center whitespace-nowrap  text-blue-600 font-semibold">Stock Edit</div>
        <div className="flex flex-wrap justify-center items-center">
          <div className="h-auto">
            <input
              name="inputQuery"
              type="text"
              value={searchQuery}
              onKeyDown={handleKeyEnter}
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

      <div class="overlow-y-auto  overflow-x-auto border-gray-700 rounded-lg">
        <div style={{ width: "100%" }} class=" align-middle  inline-block">
          <div
            style={{ height: "100%", maxHeight: "100vh" }}
            class="shadow sm:rounded-lg  h-96"
          >
          <table class="min-w-full text-sm">
          <thead class="text-md uppercase border-b-2 font-medium">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center whitespace-nowrap tracking-wider"
                >
                  S.No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex w-full justify-center"> 
                    <div onClick={() => handleSort("id")}>Item Code</div>

                    {sortedColumn === "id" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.id === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex w-full justify-center">
                    <div onClick={() => handleSort("manufacturer_id")}>
                      Manufacturer Id
                    </div>
                    {sortedColumn === "manufacturer_id" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.manufacturer_id === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex w-full justify-center">
                    <div onClick={() => handleSort("supplier_id")}>
                      Supplier Id
                    </div>
                    {sortedColumn === "supplier_id" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.supplier_id === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex w-full justify-center">
                    <div onClick={() => handleSort("quantity")}>Stock Qty</div>
                    {sortedColumn === "quantity" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.quantity === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex w-full justify-center">
                    <div onClick={() => handleSort("created_at")}>Created At</div>
                    {sortedColumn === "created_at" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.created_at === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex w-full justify-center">
                    <div onClick={() => handleSort("dept_id")}>Dept Id</div>
                    {sortedColumn === "dept_id" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.dept_id === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex w-full justify-center">
                    <div onClick={() => handleSort("cost")}>
                      Inventory Value
                    </div>
                    {sortedColumn === "cost" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.cost === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex w-full justify-center">
                    <div onClick={() => handleSort("faculty_id")}>User Id</div>
                    {sortedColumn === "faculty_id" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.faculty_id === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center tracking-wider"
                ></th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center tracking-wider"
                ></th>
              </tr>
            </thead>
            <tbody style={{backgroundColor:"white" , fontWeight:"bold" ,color:"black"}}>
              {filteredData.slice(startIndex,endIndex).map((data, index) => {
                return (
                  <tr
                    key={data.id}
                    class="bg-white border-b-2"
                  >
                    <td scope="row" class="px-6 text-center py-4">
                      {index + 1}
                    </td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">
                      {data.id}
                    </td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">
                      {data.manufacturer_id}
                    </td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">
                      {data.supplier_id}
                    </td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">
                      {data.quantity}
                    </td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">
                      {data.created_at.split("T")[0]}
                    </td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">
                      {data.dept_id}
                    </td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">
                      {data.cost}
                    </td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">
                      {data.faculty_id}
                    </td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">
                      <i
                        onClick={() => handleStockOpenPopup(data)}
                        className="bi bi-eye cursor-pointer"
                      ></i>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <i
                        onClick={() => handleOpenEdit(data)}
                        className="bi bi-pen cursor-pointer"
                      ></i>
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
            value={getStock.length < 10 ? getStock.length : 10}
            className=""
          >
            10
          </option>
          <option value={getStock.length < 50 ? getStock.length : 50}>
            50
          </option>
          <option value={getStock.length}>Full</option>
        </select>
        <button onClick={nextPage} className="border-2 rounded-md mr-7 h-10 w-20">
          Next
        </button>
      </div>
      {stockOpenPopup && stockSelectedData && (
        <div className="blur-background">
          <StockPopup
            data={stockSelectedData}
            onClose={handleStockClosePopup}
          />
        </div>
      )}
      {openEdit && editData && (
        <div className="blur-background">
          <StockEdit
            data={editData}
            onClose={handleCloseEdit}
            onSubmit={onSubmit}
            setMessage={setMessage}
            setError={setError}
            setIsLoading ={setIsLoading}
            isLoading = {isLoading}
          />
        </div>
      )}
    </div>
    </div>
  );
}

export default StockTable;
