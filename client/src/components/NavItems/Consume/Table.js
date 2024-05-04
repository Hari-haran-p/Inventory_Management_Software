import React, { useState, useEffect } from "react";
// import MasterTablePopup from "./MasterTablePopup";

function Table({ consumeData,isVisible }) {
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
  console.log(consumeData);
  useEffect(() => {
    if (click || searchQuery == "") {
      const filteredResults = consumeData.filter((item) => {
        const propertiesToSearch = [
          "id",
          "apex_no",
          "stock_id",
          "item_type",
          "item_name",
          "item_subname",
          "manufacturer_name",
          "supplier_name",
          "consume_qty",
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
  }, [click, consumeData, searchQuery]);

  //sort by functionality
  const [sortOrder, setSortOrder] = useState({
    id: "asc",
    apex_no:"asc",
    stock_id: "asc",
    item_type: "asc",
    item_name: "asc",
    item_subname: "asc",
    manufacturer_name: "asc",
    supplier_name: "asc",
    consume_qty: "asc",
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

  if (!isVisible) return null;

  return (
    <div className="w-full flex justify-center p-10 items-center">
    <div className=" w-10/12 border-2 bg-white rounded-t-3xl h-auto">
      <div className="flex flex-wrap h-auto w-full my-4 items-center justify-center md:justify-between  font-semibold">
        <div className="pl-4 text-2xl w-1/5 flex items-center whitespace-nowrap  text-blue-600 font-semibold">
          Consume Table
        </div>
        <div className="flex gap-4 items-center w-4/5 justify-end pr-6">
          <div className="flex flex-wrap justify-center items-center">
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
              className="text-black indent-2 h-9 font-medium border-2 rounded-lg border-black"
            />
          </div>
          <button
              onClick={() => setClick(true)}
              className="cursor-pointer ml-3 w-24 rounded-md h-10 py-1 text-white bg-blue-600 border-2"
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
                    onClick={() => sortData("item_code")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Stock Id</div>
                      {sortedColumn === "item_code" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.item_code === "asc" ? "up" : "down"
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
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("cost_per_item")}>
                        Cost Per Item
                      </div>
                      {sortedColumn === "cost_per_item" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.cost_per_item === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th> */}
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
                        Consume Qty 
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
                        Consumed Value
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
                {filteredData.map((data, index) => {
                  return (
                    <tr className="border-b-2">
                      <td class="pl-4">{index + 1}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.apex_no}
                      </td>
                      <td class="flex px-6 py-4 whitespace-nowrap">
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
                      {/* <td class="px-6 py-4 whitespace-nowrap">
                        {data.cost_per_item}
                      </td> */}
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.manufacturer_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.supplier_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.consume_qty}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {Math.round(data.inventory_value * 100)/100}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.req_labcode}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.req_labname}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.reject_description}
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
