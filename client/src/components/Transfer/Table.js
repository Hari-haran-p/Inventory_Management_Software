import React, { useState, useEffect } from "react";
// import MasterTablePopup from "./MasterTablePopup";

function Table({ stockData }) {
//For open popup

  // console.log(itemData);
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
    if (click || searchQuery == "") {
      const filteredResults = stockData.filter((item) => {
        const propertiesToSearch = [
          "item_code", 
          "item_type", 
          "item_name", 
          "item_subname" ,
          "from_labname" ,
          "request_labname",       
          "transfer_qty", 
          "reject_description",
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
  }, [click, stockData, searchQuery]);

  //sort by functionality
  const [sortOrder, setSortOrder] = useState({
          item_code : "asc",
          item_type : "asc",
          item_name : "asc",
          item_subname : "asc",
          from_labname : "asc",
          request_labname:"asc",
          transfer_qty : "asc",
          reject_description:"asc",
          status : "asc",
          date:"asc",
          
  });
  const [sortedColumn, setSortedColumn] = useState("");

  const sortData = (column) => {
    setSortOrder((prevSortOrders) => ({
      ...prevSortOrders,
      [column]: prevSortOrders[column] === "asc" ? "desc" : "asc",
    }));

    setSortedColumn(column);

    filteredData.sort((a, b) => {
      const valueA =
        typeof a[column] === "string" ? a[column].toLowerCase() : a[column];
      const valueB =
        typeof b[column] === "string" ? b[column].toLowerCase() : b[column];

      if (valueA < valueB) {
        return sortOrder[column] === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder[column] === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(filteredData);
  };

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      setClick(true);
    }
  };

  

  return (
    <div className=" w-9/12 h-full">
      <div className="flex  w-full mb-5 h-auto  justify-between font-semibold">
        <div className="sub-titles2 animate1 text-center text-2xl font-semibold">
          Transfer Table
        </div>
        <div className="input-field2 animate1 flex">
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
              className="text-black indent-2 font-medium w-80 h-8 rounded-xl border-2 border-black"
            />
          </div>
          <div
            onClick={() => setClick(true)}
            className="focus:ring-4 shadow-lg transform active:scale-75 transition-transform cursor-pointer border-2 border-black rounded-full w-full ml-5 mr-16 px-2"
          >
            <i className="bi bi-search"></i>
          </div>
        </div>
      </div>
      <div class="sm:-mx-6 lg:-mx-8 overflow-y-auto overflow-x-auto animate2 border-gray-700 rounded-lg">
        <div class=" align-middle inline-block min-w-full ">
          <div
            style={{ width: "90%", height: "50%", maxHeight: "360px" }}
            class="shadow sm:rounded-lg  h-96"
          >
            <table class="min-w-full text-sm">
              <thead  style={{backgroundColor:"#0f6af2" , color:"white"}} class=" text-xs uppercase font-medium">
                <tr>
                  <th className="px-6 py-3">s.no</th>
                  <th
                   onClick={() => sortData("item_code")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Item Code</div>
                      {sortedColumn === "item_code" && (
                      <i
                        className={`bi bi-arrow-${
                          sortOrder.item_code === "asc" ? "up" : "down"
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
                        className={`bi bi-arrow-${
                          sortOrder.item_type === "asc" ? "up" : "down"
                        } ml-2`}
                      ></i>
                    )}
                    </div>
                  </th>
                  <th
                   onClick={() => sortData("item_name")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Item Name</div>
                      {sortedColumn === "item_name" && (
                      <i
                        className={`bi bi-arrow-${
                          sortOrder.item_name === "asc" ? "up" : "down"
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
                        className={`bi bi-arrow-${
                          sortOrder.item_subname === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("from_labname")}>
                        From Lab Name
                      </div>
                      {sortedColumn === "from_labname" && (
                      <i
                        className={`bi bi-arrow-${
                          sortOrder.from_labname === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("request_labname")}>
                      To Lab Name
                      </div>
                      {sortedColumn === "request_labname" && (
                      <i
                        className={`bi bi-arrow-${
                          sortOrder.request_labname === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("transfer_qty")}>
                        Transfer Quantity
                      </div>
                      {sortedColumn === "transfer_qty" && (
                      <i
                        className={`bi bi-arrow-${
                          sortOrder.transfer_qty === "asc" ? "up" : "down"
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
                        className={`bi bi-arrow-${
                          sortOrder.reject_description === "asc" ? "up" : "down"
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
                        className={`bi bi-arrow-${
                          sortOrder.status === "asc" ? "up" : "down"
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
                        className={`bi bi-arrow-${
                          sortOrder.date === "asc" ? "up" : "down"
                        } ml-2`}
                      ></i>
                    )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody style={{backgroundColor:"white" , fontWeight:"bold"}}>
                {filteredData.map((data, index) => {
                  return (
                    <tr className="shadow-md rounded-xl">
                      <td class="pl-4">{index + 1}</td>
                      <td class="flex px-6 py-4 whitespace-nowrap">
                        {data.item_code}
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
                        {data.from_labname}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.request_labname}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.transfer_qty}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.reject_description ? data.reject_description : "-"}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.status}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.date.split("T")[0]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
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
