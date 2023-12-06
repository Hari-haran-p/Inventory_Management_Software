import React, { useState, useEffect } from "react";
import MasterTablePopup from "./MasterTablePopup";

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
          "apex_no",
          "item_code",
          "item_type",
          "item_name",
          "item_subname",
          "item_description",
          "cost_per_item",
          "quantity_units",
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
  }, [click, stockData, searchQuery]);

  //sort by functionality
  const [sortOrder, setSortOrder] = useState({
    apex_no: "asc",
    item_code: "asc",
    item_type: "asc",
    item_name: "asc",
    item_subname: "asc",
    item_description: "asc",
    cost_per_item: "asc",
    quantity_units: "asc",
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
    <div className="w-10/12 border-2 bg-white rounded-t-3xl h-auto">
      <div className="flex h-auto  my-4 items-center font-semibold ">
        <div className="ml-6 text-2xl text-blue-600 w-1/4 font-semibold">Master Table</div>
        
        <div className="flex items-center mr-4 w-3/4 justify-end">
        <div className="w-10 h-10 mr-6 flex justify-center items-center">
          <img className="w-9 h-9 border-2 border-blue-600 rounded-md p-1" src="./images/filter icon.png" alt=""/>
        </div>
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
            className="text-black indent-2 h-9 font-medium w-80 border-2 rounded-lg border-black"
          />

          <button
            onClick={() => setClick(true)}
            className="cursor-pointer ml-1 w-24 rounded-md h-10 py-1 text-white bg-blue-600 border-2"
          >Search
            {/* <img className="w-8 h-8" src="./images/search icon.png" alt="" /> */}
          </button>
        </div>
      </div>
      <div class="overflow-y-auto overflow-x-auto w-full border-gray-700 rounded-lg">
        <div class=" align-middle inline-block">
          <div
            style={{ width: "90px", height: "50%", maxHeight: "50vh" }}
            class="shadow sm:rounded-lg  h-96"
          >
            <table class="w-10/12 text-sm ">
              <thead
                class=" text-md uppercase border-b-2 font-medium"
              >
                <tr className=" border-r-white">
                  <th className="px-6 py-4 ">s.no</th>
                  <th
                    onClick={() => sortData("apex_no")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Apex No.</div>
                      {sortedColumn === "apex_no" && (
                        <i
                          className={`bi bi-arrow-${
                            sortOrder.apex_no === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("item_description")}>
                        Item Description
                      </div>
                      {sortedColumn === "item_description" && (
                        <i
                          className={`bi bi-arrow-${
                            sortOrder.item_description === "asc" ? "up" : "down"
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
                          className={`bi bi-arrow-${
                            sortOrder.cost_per_item === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("quantity_units")}>
                        Quantity Units
                      </div>
                      {sortedColumn === "quantity_units" && (
                        <i
                          className={`bi bi-arrow-${
                            sortOrder.quantity_units === "asc" ? "up" : "down"
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
                          className={`bi bi-arrow-${
                            sortOrder.manufacturer_name === "asc"
                              ? "up"
                              : "down"
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
                        supplier_name
                      </div>
                      {sortedColumn === "supplier_name" && (
                        <i
                          className={`bi bi-arrow-${
                            sortOrder.supplier_name === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("contact")}>
                        Supplier Contact
                      </div>
                      {sortedColumn === "contact" && (
                        <i
                          className={`bi bi-arrow-${
                            sortOrder.contact === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("stock_qty")}>Stock Qty</div>
                      {sortedColumn === "stock_qty" && (
                        <i
                          className={`bi bi-arrow-${
                            sortOrder.stock_qty === "asc" ? "up" : "down"
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
                        Inventory Value
                      </div>
                      {sortedColumn === "inventory_value" && (
                        <i
                          className={`bi bi-arrow-${
                            sortOrder.inventory_value === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("user_id")}>
                        Purchased By
                      </div>
                      {sortedColumn === "user_id" && (
                        <i
                          className={`bi bi-arrow-${
                            sortOrder.user_id === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("dept_id")}>
                        Department Id
                      </div>
                      {sortedColumn === "dept_id" && (
                        <i
                          className={`bi bi-arrow-${
                            sortOrder.dept_id === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("stock_date")}>Date</div>
                      {sortedColumn === "stock_date" && (
                        <i
                          className={`bi bi-arrow-${
                            sortOrder.stock_date === "asc" ? "up" : "down"
                          } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  ></th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "white", fontWeight: "bold" }}>
                {filteredData.map((data, index) => {
                  return (
                    <tr className="border-b-2">
                      <td class="pl-4">{index + 1}</td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.apex_no}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
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
                        {data.item_description}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.cost_per_item}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.quantity_units}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.manufacturer_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.supplier_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.contact}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.stock_qty}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.inventory_value}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.user_id}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.dept_id}
                      </td>
                      <td class=" px-6 py-4 whitespace-nowrap">
                        {data.stock_date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <i
                          onClick={() => handleOpenPopup(data)}
                          className="bi bi-eye cursor-pointer"
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
      {openPopup && selectedData && (
        <div className="blur-background">
          <MasterTablePopup data={selectedData} onClose={handleClosePopup} />
        </div>
      )}
    </div>
  );
}

export default Table;
