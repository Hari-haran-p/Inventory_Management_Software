import React from "react";
import { useEffect, useState } from "react";
import ConsumeEdit from "./ConsumeEdit";

function ConsumeRequestTable({ isVisible, user, requestTabledata, fetchGetStock, setMessage, setError, setIsLoading, fetchTableData, fetchPendingData, noRequestData }) {

  //for edit popup
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setEditData(data);
  };

  const handleCloseEdit = (data) => {
    setOpenEdit(false);
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
  console.log(requestTabledata);

  useEffect(() => {
    if (click || searchQuery == "" && !noRequestData) {
      const filteredResults = requestTabledata.filter((item) => {
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
  }, [click, requestTabledata, searchQuery]);

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
    setFilteredData(filteredData);
  };

  // <-------------------------------search bar enter function---------------------------->

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      setClick(true);
    }
  };
  if (!isVisible) return null;

  return (
    <div className="w-full flex justify-center pt-20 items-center">

      <div className=" w-10/12 relative border-2 bg-white rounded-t-3xl h-auto">
        <div className="flex flex-wrap h-auto w-full my-4 items-center justify-center md:justify-between  font-semibold">

          <div className="pl-4 text-2xl w-1/5 flex items-center whitespace-nowrap  text-blue-600 font-semibold">Consume Request</div>
          <div className="flex gap-4 items-center w-4/5 justify-end pr-6">
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
                className="text-black indent-2 h-9 font-medium border-2 rounded-lg border-black"
              />
            </div>
            <div
              onClick={() => setClick(true)}
              className="cursor-pointer ml-3 w-24 text-center rounded-md h-10 py-1 text-white bg-blue-600 border-2"
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
                            className={`bi bi-arrow-${sortOrders.apex_no === "asc" ? "up" : "down"
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
                          Stock Id
                        </div>
                        {sortedColumn === "id" && (
                          <span
                            className={`bi bi-arrow-${sortOrders.id === "asc" ? "up" : "down"
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
                            className={`bi bi-arrow-${sortOrders.item_name === "asc" ? "up" : "down"
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
                            className={`bi bi-arrow-${sortOrders.item_subname === "asc" ? "up" : "down"
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
                            className={`bi bi-arrow-${sortOrders.item_type === "asc" ? "up" : "down"
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
                            className={`bi bi-arrow-${sortOrders.item_description === "asc" ? "up" : "down"
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
                            className={`bi bi-arrow-${sortOrders.stock_qty === "asc" ? "up" : "down"
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
                            className={`bi bi-arrow-${sortOrders.inventory_value === "asc" ? "up" : "down"
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
                            className={`bi bi-arrow-${sortOrders.dept_id === "asc" ? "up" : "down"
                              } ml-2`}
                          />
                        )}
                      </div>
                    </th>

                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "white", fontWeight: "bold", color: "black" }}>
                 
                  {filteredData && filteredData.map((data, index) => {
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
              {noRequestData && (
                    <div class="text-center w-full p-6" > No Stocks available</div>
                  )}
            </div>
          </div>
        </div>
        {openEdit && editData && (
          <div className="blur-background">
            <ConsumeEdit
              data={editData}
              onClose={handleCloseEdit}
              setMessage={setMessage}
              setError={setError}
              setIsLoading={setIsLoading}
              user={user}
              fetchTableData={fetchTableData}
              fetchPendingData={fetchPendingData}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsumeRequestTable;

