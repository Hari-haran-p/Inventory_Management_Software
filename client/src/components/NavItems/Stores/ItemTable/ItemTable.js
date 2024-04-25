import React from "react";
import ItemPopup from "./ItemPopup";
import { useState, useEffect } from "react";
import ItemEdit from "./ItemEdit";

function ItemTable({itemData , fetchItemData, setMessage, setError}) {
  //<---------------------For view open popup window------------------------->

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
   //<---------------------For edit popup window------------------------->

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setEditData(data);
  };

  const handleCloseEdit = (data) => {
    setOpenEdit(false);
    // setEditData(null);
    fetchItemData();
  };

  const onSubmit = () => {
    fetchItemData();
    handleCloseEdit();
  };

  //<---------------------search functionality------------------------->

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [click, setClick] = useState(false);
 

  useEffect(() => {
    if (click || searchQuery == "") {
      const filteredResults = itemData.filter((item) => {
        const propertiesToSearch = [
          "item_name",
          "item_type",
          "item_code",
          "item_subname",
          "item_description",
          "manufacturer_id",
          "quantity_units",
          "supplier_id",
          "cost_per_item",
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
  }, [click, itemData, searchQuery]);

    //<---------------------For sort functionality------------------------->
    const [sortOrders, setSortOrders] = useState({
      item_code: "asc",
      item_type: "asc",
      item_name: "asc",
      item_subname: "asc",
      item_description: "asc",
      manufacturer_id: "asc",
      quantity_units: "asc",
      supplier_id: "asc",
      cost_per_item: "asc",
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

  return (
    <>
    <div className="p-10 text-2xl w-1/5 flex items-center whitespace-nowrap text-black font-semibold">Item & Stock Management</div>
    <div className="w-full flex flex-col justify-center items-center">
    <div className=" w-10/12 relative border-2 bg-white rounded-t-3xl h-auto">
    <div className="flex flex-wrap h-auto w-full my-4 items-center justify-center md:justify-between  font-semibold">
        <div className="pl-4 text-2xl w-1/5 flex items-center whitespace-nowrap  text-blue-600 font-semibold">Item Edit</div>
        <div className="flex gap-4 items-center w-4/5 justify-end pr-6">
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
              className="text-black indent-2 h-9 font-medium border-2 rounded-lg border-black"
            />
          </div>
          <div
            onClick={() => setClick(true)}
            className="cursor-pointer ml-3 w-24 text-center rounded-md h-10 py-1 text-white bg-blue-600 border-2  "
          >
            Search
          </div>
        </div>
      </div>
      <div class="overflow-y-auto  overflow-x-auto border-gray-700 rounded-lg">
        <div style={{ width: "100%" }} class=" align-middle  inline-block">
          <div
            style={{ height: "50%", maxHeight: "30vh" }}
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
                  onClick={() => handleSort("item_code")}
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div>Item Code</div>
                    {sortedColumn === "item_code" && (
                      <i
                        className={`bi bi-arrow-${
                          sortOrders.item_code === "asc" ? "up" : "down"
                        } ml-2`}
                      ></i>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("item_type")}
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div>Item Type</div>
                    {sortedColumn === "item_type" && (
                      <i
                        className={`bi bi-arrow-${
                          sortOrders.item_type === "asc" ? "up" : "down"
                        } ml-2`}
                      ></i>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("item_name")}
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div>Item Name</div>
                    {sortedColumn === "item_name" && (
                      <i
                        className={`bi bi-arrow-${
                          sortOrders.item_name === "asc" ? "up" : "down"
                        } ml-2`}
                      ></i>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("item_subname")}
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div>Item Subname</div>
                    {sortedColumn === "item_subname" && (
                      <i
                        className={`bi bi-arrow-${
                          sortOrders.item_subname === "asc" ? "up" : "down"
                        } ml-2`}
                      ></i>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("item_description")}
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div>Item Description</div>

                    <div>
                      {sortedColumn === "item_description" && (
                        <i
                          className={`bi bi-arrow-${
                            sortOrders.item_description === "asc"
                              ? "up"
                              : "down"
                          } ml-2`}
                        ></i>
                      )}
                    </div>
                  </div>
                </th>
                <th
                  onClick={() => handleSort("manufacturer_id")}
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div>Manufacturer Id</div>
                    {sortedColumn === "manufacturer_id" && (
                      <i
                        className={`bi bi-arrow-${
                          sortOrders.manufacturer_id === "asc" ? "up" : "down"
                        } ml-2`}
                      ></i>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("quantity_units")}
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div>Quantity Units</div>
                    {sortedColumn === "quantity_units" && (
                      <i
                        className={`bi bi-arrow-${
                          sortOrders.quantity_units === "asc" ? "up" : "down"
                        } ml-2`}
                      ></i>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => {
                    handleSort("supplier_id");
                  }}
                  scope="col"
                  className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                >
                  <div className="flex">
                    <div>Supplier Id</div>
                    {sortedColumn === "supplier_id" && (
                      <i
                        className={`bi bi-arrow-${
                          sortOrders.supplier_id === "asc" ? "up" : "down"
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
                    <div
                      onClick={() => {
                        handleSort("cost_per_item");
                      }}
                    >
                      Cost Per Item
                    </div>
                    {sortedColumn === "cost_per_item" && (
                      <i
                        className={`bi bi-arrow-${
                          sortOrders.cost_per_item === "asc" ? "up" : "down"
                        } ml-2`}
                      ></i>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left tracking-wider"
                ></th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left tracking-wider"
                ></th>
                {/* <th scope="col" className="px-6 py-3 text-left tracking-wider"></th> */}
              </tr>
            </thead>
            <tbody style={{backgroundColor:"white" , fontWeight:"bold"}}>
              {filteredData.map((data, index) => (
                <tr
                  key={data.id}
                  className="bg-white border-b-2"
                >
                  <td scope="row" className="px-6 py-4">
                    {index + 1}
                  </td>
                  <td className="flex px-6 py-4 whitespace-nowrap">
                    {data.item_code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.item_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.item_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.item_subname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.item_description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.manufacturer_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.quantity_units}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.supplier_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.cost_per_item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <i
                      onClick={() => handleOpenPopup(data)}
                      className="bi bi-eye cursor-pointer"
                    ></i>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <i
                      onClick={() => handleOpenEdit(data)}
                      className="bi bi-pen cursor-pointer"
                    ></i>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                        <i className="bi bi-trash cursor-pointer"></i>
                      </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
      {openPopup && selectedData && (
        <div className="blur-background">
          <ItemPopup data={selectedData} onClose={handleClosePopup} />
        </div>
      )}

      {openEdit && editData && (
        <div className="blur-background">
          <ItemEdit
            data={editData}
            onClose={handleCloseEdit}
            onSubmit={onSubmit}
            setMessage={setMessage}
            setError={setError}
          />
        </div>
      )}
    </div>
    </div>
    </>
  );
}

export default ItemTable;
