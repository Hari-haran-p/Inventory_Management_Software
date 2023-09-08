import React, { useState, useEffect } from "react";

function Table({ stockData}) {
  
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
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState("");

  const sortData = (column) => {
    let newSortOrder = "asc";
    if (column === sortedColumn) {
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    }
    setSortOrder(newSortOrder);
    setSortedColumn(column);

    filteredData.sort((a, b) => { 

      const valueA =
        typeof a[column] === "string" ? a[column].toLowerCase() : a[column];
      const valueB =
        typeof b[column] === "string" ? b[column].toLowerCase() : b[column];

      if (valueA < valueB) {
        return newSortOrder === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return newSortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
  };


  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      setClick(true);
    }
  };

  return (
    <div className=" w-9/12">
      <div className="flex  w-full mb-5 h-auto  justify-between font-semibold">
        <div className="sub-titles2 text-center text-2xl font-semibold">
          Master Table
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
            style={{ width: "90%", height: "50%", maxHeight: "360px" }}
            class="shadow sm:rounded-lg h-96"
          >
            <table class="min-w-full text-sm text-gray-400 ">
              <thead class="bg-gray-800 text-xs uppercase font-medium">
                <tr>
                  <th className="px-6 py-3">s.no</th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("item_code")}>Item Code</div>
                      <span
                        className={`bi bi-arrow-${
                          sortOrder === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("item_type")}>Item Type</div>
                      <span
                        className={`bi bi-arrow-${
                          sortOrder === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("item_name")}>Item Name</div>
                      <span
                        className={`bi bi-arrow-${
                          sortOrder === "asc" ? "up" : "down"
                        } ml-2`}
                      />
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
                      <span
                        className={`bi bi-arrow-${
                          sortOrder === "asc" ? "up" : "down"
                        } ml-2`}
                      />
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
                      <span
                        className={`bi bi-arrow-${
                          sortOrder === "asc" ? "up" : "down"
                        } ml-2`}
                      />
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
                      <span
                        className={`bi bi-arrow-${
                          sortOrder === "asc" ? "up" : "down"
                        } ml-2`}
                      />
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
                      <span
                        className={`bi bi-arrow-${
                          sortOrder === "asc" ? "up" : "down"
                        } ml-2`}
                      />
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
                      <span
                        className={`bi bi-arrow-${
                          sortOrder === "asc" ? "up" : "down"
                        } ml-2`}
                      />
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
                      <span
                        className={`bi bi-arrow-${
                          sortOrder === "asc" ? "up" : "down"
                        } ml-2`}
                      />
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
                      <span
                        className={`bi bi-arrow-${
                          sortOrder === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("stock_qty")}>Stock Qty</div>
                      <span
                        className={`bi bi-arrow-${
                          sortOrder === "asc" ? "up" : "down"
                        } ml-2`}
                      />
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
                      <span
                        className={`bi bi-arrow-${
                          sortOrder === "asc" ? "up" : "down"
                        } ml-2`}
                      />
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
                      <span
                        className={`bi bi-arrow-${
                          sortOrder === "asc" ? "up" : "down"
                        } ml-2`}
                      />
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
                      <span
                        className={`bi bi-arrow-${
                          sortOrder === "asc" ? "up" : "down"
                        } ml-2`}
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-gray-800">
                {filteredData.map((data, index) => {
                  return (
                    <tr class="bg-black bg-opacity-20">
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
