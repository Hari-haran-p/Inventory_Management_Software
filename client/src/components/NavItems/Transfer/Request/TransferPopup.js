import React from "react";
import { useEffect, useState } from "react";
import TransferEdit from "./TransferEdit";

function TransferRequestTable({isVisible, user,setMessage, setError,isLoading, setIsLoading,  getStock ,fetchGetStock, fetchPendingData, fetchOverallTranferedData }) {


  //for edit popup
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setEditData(data);
  };

  const onSubmit = () => {
    setOpenEdit(false);
    fetchGetStock();
    fetchPendingData();
    fetchOverallTranferedData();
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
          "apex_no",
          "item_name",
          "item_subname",
          "item_type",
          "id",
          "item_description",
          "stock_qty",
          "inventory_value",
          "dept_id",
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
    item_type: "asc",
    item_name: "asc",
    item_subname: "asc",
    item_description: "asc",
    apex_no: "asc",
    stock_qty: "asc",
    dept_id: "asc",
    inventory_value: "asc",
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
  if (!isVisible) return null;

  return (
    <div className="flex justify-center items-center">
    <div className="w-10/12 border-2 bg-white rounded-3xl h-auto">
      <div
       className="flex flex-wrap h-auto w-full my-4 items-center justify-center md:justify-between font-semibold"
       >
        <div className="pl-4 text-2xl flex items-center whitespace-nowrap  text-blue-600 font-semibold">Transfer Request</div>
        <div className="flex flex-wrap justify-center items-center">
          <div className="h-auto ">
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
              className="text-black indent-2 font-medium w-80 h-9 rounded-md border-2 border-black"
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


      <div style={{ width: "100%" }} class=" align-middle  inline-block">
        <div
          style={{ width: "100%", height: "30%", maxHeight: "400px" }}
          class="animate overflow-x-auto overflow-y-auto scrollbar-none"
        >
          <table class="min-w-full text-sm ">
            <thead   class=" text-md uppercase border-b-2 font-medium">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider"
                >
                  S.No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("apex_no")}>Apex No</div>

                    {sortedColumn === "apex_no" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.apex_no === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("id")}>
                      Item Code
                    </div>
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
                  <div className="flex">
                    <div onClick={() => handleSort("item_name")}>
                      Item Name
                    </div>
                    {sortedColumn === "item_name" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.item_name === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("item_subname")}>Item Subname</div>
                    {sortedColumn === "item_subname" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.item_subname === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("item_type")}>Item Type</div>
                    {sortedColumn === "item_type" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.item_type === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("item_description")}>Item Description</div>
                    {sortedColumn === "item_description" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.item_description === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("stock_qty")}>
                      Stock Qty
                    </div>
                    {sortedColumn === "stock_qty" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.stock_qty === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("inventory_value")}>Inventory Value</div>
                    {sortedColumn === "inventory_value" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.inventory_value === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div onClick={() => handleSort("dept_id")}>Lab Code</div>
                    {sortedColumn === "dept_id" && (
                      <span
                        className={`bi bi-arrow-${
                          sortOrders.dept_id === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    )}
                  </div>
                </th>

              </tr>
            </thead>
            <tbody style={{backgroundColor:"white" , fontWeight:"bold" ,color:"black"}}>
              {filteredData.slice(startIndex,endIndex).map((data, index) => {
                return (
                  <tr
                    key={data.id}
                    class="bg-white border-b-2 hover:bg-sky-100 cursor-pointer"
                    onClick={() => handleOpenEdit(data)}
                  >
                    <td scope="row" class="px-6 text-left py-4 ">
                      {index + 1}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.apex_no}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.id}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.item_name}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.item_subname}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.item_type}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.item_description}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.stock_qty}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.inventory_value}
                    </td>
                    <td class="px-6 py-4 text-left whitespace-nowrap">
                      {data.dept_id}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
      {openEdit && editData && (
        <div className="blur-background">
          <TransferEdit
            data={editData}
            onClose={onSubmit}
            setMessage={setMessage}
            setError={setError}
            setIsLoading ={setIsLoading}
            user = {user}
          />
        </div>
      )}
    </div>
    </div>
  );
}

export default TransferRequestTable;

