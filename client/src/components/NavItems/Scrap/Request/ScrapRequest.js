// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../../../AuthContext';

// const ScrapRequest = ({ onClose, isVisible, user, setMessage, setError, fetchScrapTrackData }) => {

//   const [isLoading, setIsLoading] = useState(false);

//   const [data, setData] = useState({
//     itemcode: "",
//     showStock: "",
//     stockReq: "",
//     fromLabId: "",
//   });

//   const [item, setItem] = useState([]);
//   const [stock, setStock] = useState([]);
//   const { getUser} = useAuth();

//   async function fetchItems() {
//     const response = await axios.get("http://localhost:4000/api/getItems");
//     setItem(response.data);
//   }

//   async function fetchStock() {
//     const response = await axios.get(`http://localhost:4000/api/getStock/${user.dept_code}`);
//     setStock(response.data);
//   }


//   useEffect(() => {
//     fetchItems();
//     fetchStock();
//   }, []);

//   const [itemResult, setItemResult] = useState(item);
//   const [stockResult, setStockResult] = useState(stock);
//   const [suggestion, setSuggestion] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleItemChange = (e) => {
//     // stock.map((f)=>console.log(f.item_name));
//     if (e.target.value.trim().length > 0) {
//       setSuggestion(true);
//       setIsTyping(true);
//     } else {
//       setIsTyping(false);
//       setSuggestion(false);
//     }
//     setStockResult(
//       stock.filter((f) => f.item_name.toLowerCase().includes(e.target.value.toLowerCase()))
//     );
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const [result, setResult] = useState([]);

//   function resultClick(code) {
//     // setData({ ...data, itemcode: code });
//     const result = stock.filter((items) => {
//       if (items.id == code) {
//         return items;
//       }
//     });
//     setResult(result);
//     setData({ ...data, itemcode: code, showStock: result[0].stock_qty });
//     setSuggestion(false);
//     setIsTyping(false);
//   }

//   const handleReqFromChange = (e) => {
//     e.preventDefault();
//     setData({ ...data, [e.target.name]: e.target.value });
//   };


//   const handleSubmit = async (e) => {
//     try {
//       setIsLoading(true);
//       e.preventDefault();
//       if (stockResult.length > 0) {
//         // const sendItem = item.find((f) => f.id == data.itemcode);
//         const response = await axios.post(
//           "http://localhost:4000/api/scrapRequest",
//           {
//             formData: { ...data },
//             resultData: { ...result },
//             user_id: user.user_id,
//             dept_id: user.dept_code
//           }
//         );
//         if (response.status == 200) {
//           setData({
//             itemcode: "",
//             showStock: "",
//             stockReq: "",
//             fromLabId: "",
//           })
//           fetchStock();
//           getUser().then((response) => fetchScrapTrackData(response.dept_code));
//           setMessage(response.data.Data);
//           onClose();
//           setIsLoading(false);
//         }
//       }else{
//         setError("Enter a valid Item");
//         return;
//       }
//     } catch (error) {

//       if (error) {
//         setData({
//           itemcode: "",
//           showStock: "",
//           stockReq: "",
//           fromLabId: "",
//         })
//         getUser().then((response) => fetchScrapTrackData(response.dept_code));
//         setError(error.response.data.Data);
//         onClose();
//         setIsLoading(false);
//       }
//     }
//   };


//   if (!isVisible) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
//         <div className="flex flex-col">
//           <div
//             style={{ height: "600px" }}
//             className="popup-responsive animate1 popup-responsive-small bg-white w-full px-14 py-5 overflow-x-auto overflow-y-auto flex flex-col items-center border-gray-700 rounded-lg"
//           >
//             <div className="w-full text-end pr-10">
//               <button
//                 className="text-black fixed z-50 rounded-full border-2 border-black px-2 text-3xl"
//                 onClick={() => onClose()}
//               >
//                 X
//               </button>
//             </div>
//             <div className="flex flex-col justify-center items-center bg-white p-8 rounded-2xl">
//               <div className="py-1 flex  pb-8">
//                 <span className="px-1 text-2xl font-medium text-black">
//                   Scrap Stock
//                 </span>
//               </div>
//             </div>
//             <form onSubmit={handleSubmit}>
//               <div className="flex flex-wrap">
//                 <label className="text-md pr-5 mb-3 whitespace-nowrap">Item Name</label>
//                 <input
//                   type="text"
//                   name="itemcode"
//                   list="itemcode"
//                   value={data.itemcode}
//                   onChange={handleItemChange}
//                   className="text-md block px-3 py-2 rounded-lg w-full border-b-0
//                 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
//                   required
//                   autoComplete="off"
//                 />
//               </div>
//               <div>
//                 {isTyping && suggestion && (
//                   <div
//                     className="text-md block px-3 py-2 rounded-b-lg w-full border-t-0
//                 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
//                   >
//                     {stockResult && stockResult.length > 0 ? (
//                       stockResult.slice(0, 6).map((result) => {
//                         return (
//                           <div
//                             key={result.id}
//                             value={result.id}
//                             className="text-md px-3 py-2 w-full border-none
//                               bg-white border-2 focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none hover:bg-sky-100 rounded-lg"
//                             onClick={() => resultClick(result.id)}
//                           >
//                             {result.id}-{result.item_name}
//                           </div>
//                         );
//                       }))
//                       : (
//                         <div>No Match</div>
//                       )
//                     }
//                   </div>
//                 )}
//               </div>
//               <div class="py-1 flex flex-wrap gap-3 pb-8">
//                 <label class="text-md pr-5 whitespace-nowrap">Check stock From</label>
//                 <input
//                   type="text"
//                   name="fromLabId"
//                   value={user.dept_code}
//                   onChange={handleReqFromChange}
//                   className="text-md block px-3 py-2 rounded-lg w-full
//                 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
//                   required
//                   disabled
//                 />
//               </div>
//               <div class="flex flex-wrap ">
//                 <label class="text-md mb-3 whitespace-nowrap">Stock Available</label>
//                 <input
//                   type="text"
//                   name="cost"
//                   value={data.showStock}
//                   className="text-md block px-3 py-2 rounded-lg w-full
//                 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
//                   required
//                   disabled
//                 />
//               </div>
//               <div className="whitespace-nowrap">
//                 Kindly enter the stock stock_qty to be scraped{" "}
//                 <label style={{ color: "red", fontSize: "25px" }}>*</label>
//               </div>
//               <div class="py-1 flex flex-wrap  pb-8">
//                 <label class="text-md mb-3 whitespace-nowrap">Scrap stock_qty</label>
//                 <input
//                   type="number"
//                   name="stockReq"
//                   value={data.stockReq}
//                   onChange={(e) =>
//                     setData({ ...data, [e.target.name]: e.target.value })
//                   }
//                   className="text-md block px-3 py-2 rounded-lg w-full
//                 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
//                   required
//                 />
//               </div>
//               <center>
//                 <button
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mb-10"
//                   type="submit"
//                 >
//                   Submit
//                 </button>
//               </center>
//             </form>
//           </div>

//         </div>

//       </div>
//     </>
//   )
// }

// export default ScrapRequest

import React from "react";
import { useEffect, useState } from "react";
import ScrapEdit from "./ScrapEdit";

function ScrapRequestTable({isVisible, user, getStock ,getLabDetails,setGetLabDetails, fetchGetStock, setMessage, setError, setIsLoading, isLoading}) {

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
          "inventory_value",
          "item_name",
          "item_subname",
          "item_type",
          "id",
          "apex_no",
          "item_description",
          "stock_qty",
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

  console.log(getStock);

  // <-------------------------------search bar enter function---------------------------->

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      setClick(true);
    }
  };
  if (!isVisible) return null;

  return (
    <div className="w-full flex justify-center pt-20 items-center">

    <div className=" w-10/12 relative border-2 bg-white rounded-3xl h-auto">
    <div className="flex flex-wrap h-auto w-full my-4 items-center justify-center md:justify-between  font-semibold">

        <div className="pl-4 text-2xl flex items-center whitespace-nowrap  text-blue-600 font-semibold">Scrap Request</div>
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

      <div class="overflow-y-auto  overflow-x-auto border-gray-700 rounded-lg">
        <div style={{ width: "100%" }} class=" align-middle  inline-block">
          <div
            style={{ height: "50%", maxHeight: "50vh" }}
            class="shadow sm:rounded-lg  h-96"
          >
          <table class="min-w-full text-sm">
            <thead class=" text-md uppercase border-b-2 font-medium">
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
          <ScrapEdit
            data={editData}
            getLabDetails = {getLabDetails}
            setGetLabDetails = {setGetLabDetails}
            onClose={handleCloseEdit}
            onSubmit={onSubmit}
            setMessage={setMessage}
            setError={setError}
            setIsLoading ={setIsLoading}
            isLoading = {isLoading}
            user = {user}
          />
        </div>
      )}
    </div>
    </div>
  );
}

export default ScrapRequestTable;

