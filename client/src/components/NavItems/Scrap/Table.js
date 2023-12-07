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
    if (click || searchQuery == "") {
      const filteredResults = scrapData.filter((item) => {
        const propertiesToSearch = [
          "id",
          "apex_no",
          "item_code",
          "item_type",
          "item_name",
          "item_subname",
          "cost_per_item",
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

  //sort by functionality
  const [sortOrder, setSortOrder] = useState({
    id: "asc",
    apex_no:"asc",
    item_code: "asc",
    item_type: "asc",
    item_name: "asc",
    item_subname: "asc",
    cost_per_item: "asc",
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
    <div className=" w-full p-32 h-full">
      <div className="flex  w-full mb-5 h-auto justify-between font-semibold">
        <div className="sub-titles2 text-center text-2xl font-semibold">
          Scrap Table
        </div>
        <div className="input-field2 flex">
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
      <div class="sm:-mx-6 lg:-mx-8 overflow-y-auto overflow-x-auto border-gray-700 rounded-lg">
        <div class=" align-middle inline-block min-w-full ">
          <div
            style={{ width: "90%", height: "60%", maxHeight: "360px" }}
            class="shadow sm:rounded-lg  h-96"
          >
            <table class="min-w-full text-sm">
              <thead style={{ backgroundColor: "#0f6af2", color: "white" }} class=" text-xs uppercase font-medium">
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
                      <div>Item Code</div>
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
                  <th
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
                {filteredData.map((data, index) => {
                  return (
                    <tr className="shadow-md rounded-xl">
                      <td class="pl-4">{index + 1}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.apex_no}
                      </td>
                      <td class="flex px-6 py-4 whitespace-nowrap">
                        {data.id}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
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
                        {data.cost_per_item}
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
  );
}

export default Table;
