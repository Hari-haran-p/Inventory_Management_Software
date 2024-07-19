import React, { useEffect, useState } from "react";
import Cards from "../CommonPages/Cards";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import Cookies from "js-cookie";

function Vendors({ open }) {
  //<--------Creating required state variables---------->

  const [manufacturer, setManufacturer] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getRequest } = useAuth();

  //<-----End of creation of required state variables------>

  //<------Fetching data from api to render the page------->

  async function fetchManufacturer() {
    const response = await getRequest(
      "/api/getManufacturer"
    ).catch((error) => console.log(error));
    setManufacturer(response.data);
  }
  async function fetchSupplier() {
    const response = await getRequest(
      "/api/getSupplier"
    ).catch((error) => console.log(error));
    setSupplier(response.data);
  }

  useEffect(() => {
    fetchManufacturer();
    fetchSupplier();
  }, []);

  useEffect(() => {
    if (supplier.length > 0 && manufacturer.length > 0) {
      setIsLoading(false);
    }
  }, [supplier, manufacturer]);

  //<------------------- Search functionality for manufacturer table--------------------------->

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (searchQuery == "") {
      setFilteredData(manufacturer)
      return
    }
    if (click) {
      const filteredResults = manufacturer.filter((item) => {
        const propertiesToSearch = ["name", "id"];
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
  }, [click, manufacturer, searchQuery]);

  //<--------------------sort by functionality for manufacturer table-------------------->
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

  //-----------------------------table row filter for manufacturer table------------------------------

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

  //<------------------- Search functionality for supplier table--------------------------->

  const [supplierSearchQuery, setSupplierSearchQuery] = useState("");
  const [supplierFilteredData, setSupplierFilteredData] = useState([]);
  const [buttonClick, setButtonClick] = useState(false);

  useEffect(() => {
    if (supplierSearchQuery == "") {
      setSupplierFilteredData(supplier)
      return;
    }
    if (buttonClick) {
      const SupplierFilteredResults = supplier.filter((item) => {
        const supplierPropertiesToSearch = ["id", "name", "address", "contact"];
        return supplierPropertiesToSearch.some((property) =>
          typeof item[property] === "string"
            ? item[property]
              .toLowerCase()
              .includes(supplierSearchQuery.toLowerCase())
            : typeof item[property] === "number"
              ? item[property].toString().includes(supplierSearchQuery)
              : false
        );
      });

      setSupplierFilteredData(SupplierFilteredResults);
    }
  }, [buttonClick, supplier, supplierSearchQuery]);

  //-----------------------------table row filter for supplier table------------------------------

  const [rowSizeSupplier, setRowSizeSupplier] = useState(10);
  const [supplierCurrentPage, setSupplierCurrentPage] = useState(1);
  const [supplierTotalPages, setSupplierTotalPages] = useState(1);

  useEffect(() => {
    setSupplierTotalPages(Math.ceil(supplierFilteredData.length / rowSizeSupplier));
  }, [supplierFilteredData, rowSizeSupplier]);

  const supplierNextPage = () => {
    if (supplierCurrentPage < supplierTotalPages) {
      setSupplierCurrentPage(supplierCurrentPage + 1);
    }
  };

  const supplierPrevPage = () => {
    if (supplierCurrentPage > 1) {
      setSupplierCurrentPage(supplierCurrentPage - 1);
    }
  };

  const handleSupplierRowSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setRowSizeSupplier(newSize);
    setSupplierCurrentPage(1);
  };

  const supplierStartIndex = (supplierCurrentPage - 1) * rowSizeSupplier;
  const supplierEndIndex = Math.min(supplierStartIndex + rowSizeSupplier, supplierFilteredData.length);

  //<--------------------sort by functionality for supplier table-------------------->

  //sort by functionality
  const [supplierSortOrder, setSupplierSortOrder] = useState({
    name: "asc",
    contact: "asc",
    address: "asc",
  });

  const [supplierSortedColumn, setSupplierSortedColumn] = useState("");

  const handleSort = (column) => {
    setSupplierSortOrder((prevSortOrders) => ({
      ...prevSortOrders,
      [column]: prevSortOrders[column] === "asc" ? "desc" : "asc",
    }));

    setSupplierSortedColumn(column);

    supplierFilteredData.sort((a, b) => {
      const valueA =
        typeof a[column] === "string" ? a[column].toLowerCase() : a[column];
      const valueB =
        typeof b[column] === "string" ? b[column].toLowerCase() : b[column];

      if (valueA < valueB) {
        return supplierSortOrder[column] === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return supplierSortOrder[column] === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSupplierFilteredData(supplierFilteredData);
  };

  //<------End of fetching data from api for the page ------->

  //<---------Authentication of user for the page----------->

  const { user, getUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    } else {
      getUser();
    }
  }, [Cookies.get("token")]);

  //<--------End of authentication of user for the page--------->

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      setClick(true);
      setButtonClick(true);
    }
  };

  console.log(supplier);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full duration-800 ">
          <span class="loader animate-bounce duration-800"></span>
          Loading
        </div>
      ) : (
        <div className="overflow-x-hidden h-auto w-auto flex flex-col items-center justify-center">
          <div className={` flex-1 duration-300  h-auto w-full`}>
            <h1 className="text-2xl font-semibold pt-12 pl-20 animate-fadeIn">
              Vendors
            </h1>
            <div
              style={{ height: "30vh", width: "100%" }}
              className="d-card flex items-center justify-center"
            >
              {" "}
              <Cards />
            </div>
          </div>
          <div
            className={`flex ${open ? "gap-24" : "gap-6"
              } gap-change  flex-col lg:flex-row items-center justify-center h-auto lg:flex-nowrap duration-500 lg:w-10/12 w-full mt-10 `}
          >
            <div className="border-2 duration-500 rounded-lg  lg:w-5/12 w-full">
              <h1 className="text-center text-2xl font-bold  whitespace-nowrap text-blue-600 py-3">
                Manufacturer
              </h1>
              <div className="input-field">
                <div className="flex flex-wrap justify-center my-5">
                  <div className="h-auto ">
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
                      className="text-black indent-2 font-medium w-80 h-9 rounded-md border-2 border-black "
                    />
                  </div>
                  <div
                    onClick={() => setClick(true)}
                    className="text-center font-bold cursor-pointer ml-3 w-24 rounded-md h-10 py-1 text-white bg-blue-600 border-2"
                  >
                    Search
                  </div>
                </div>
              </div>

              <div
                class="   overflow-y-auto rounded-2xl overflow-x-auto border-gray-700  duration-500"
                style={{ maxWidth: "100%", maxHeight: "40vh" }}
              >
                <div class=" align-middle inline-block min-w-full">
                  <div class="shadow overflow-hidden sm:rounded-lg">
                    <table class="min-w-full text-sm">
                      <thead class=" text-md uppercase border-b-2 font-medium">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            s.no
                          </th>
                          <th
                            onClick={() => sortData("id")}
                            scope="col"
                            class="px-6 py-3 cursor-pointer whitespace-nowrap"
                          >
                            <div className="flex">
                              <div>Manufacturer ID</div>
                              <span
                                className={`bi bi-arrow-${sortOrder === "asc" ? "up" : "down"
                                  } ml-2`}
                              />
                            </div>
                          </th>
                          <th
                            onClick={() => sortData("name")}
                            scope="col"
                            class="px-6 py-3 cursor-pointer"
                          >
                            <div className="flex">
                              <div>Manufacturer Name</div>
                              <span
                                className={`bi bi-arrow-${sortOrder === "asc" ? "up" : "down"
                                  } ml-2`}
                              />
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        style={{ backgroundColor: "white", fontWeight: "bold" }}
                      >
                        {filteredData.slice(startIndex, endIndex).map((data, index) => {
                          return (
                            <tr class="bg-white">
                              <td scope="row" class="border-b-2 px-6 py-4 ">
                                {startIndex + index + 1}
                              </td>
                              <td class="px-6 py-4 border-b-2  text-gray-900 whitespace-nowrap">
                                {data.id}
                              </td>
                              <td class="px-6 py-4 border-b-2 text-gray-900 whitespace-nowrap">
                                {data.name}
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
                <button
                  onClick={prevPage}
                  className="border-2 rounded-md ml-7 h-10 w-20"
                >
                  Prev
                </button>

                <select
                  onChange={handleRowSizeChange}
                  value={rowSize}
                  className="border-2 w-56 h-10 rounded-md mx-3"
                >
                  <option
                    value={manufacturer.length < 10 ? manufacturer.length : 10}
                    className=""
                  >
                    10
                  </option>
                  <option
                    value={manufacturer.length < 50 ? manufacturer.length : 50}
                  >
                    50
                  </option>
                  <option value={manufacturer.length}>Full</option>
                </select>
                <button
                  onClick={nextPage}
                  className="border-2 rounded-md mr-7 h-10 w-20"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="border-2  rounded-md duration-500 lg:w-7/12 w-full">
              <h1 className="text-center text-2xl font-bold  whitespace-nowrap  text-blue-600  py-3">
                Supplier
              </h1>
              <div className="input-field">
                <div className="flex justify-center my-5">
                  <div className="h-auto ">
                    <input
                      name="inputQuery"
                      type="text"
                      onKeyDown={handleKeyEnter}
                      value={supplierSearchQuery}
                      onChange={(e) => {
                        setButtonClick(false);
                        setSupplierSearchQuery(e.target.value);
                      }}
                      placeholder="Search..."
                      className="text-black indent-2 font-medium w-80 h-9 rounded-md border-2 border-black"
                    />
                  </div>
                  <div
                    onClick={() => setButtonClick(true)}
                    className="text-center font-bold cursor-pointer ml-3 w-24 rounded-md h-10 py-1 text-white bg-blue-600 border-2"
                  >
                    Search
                  </div>
                </div>
                <th scope="col" class=""></th>
                <th scope="col" class=""></th>
              </div>
              <th scope="col" class=""></th>
              <th scope="col" class=""></th>

              <div
                class=" overflow-hidden overflow-y-auto overflow-x-auto border-gray-700 rounded-2xl duration-500"
                style={{
                  maxWidth: "100%",
                  maxHeight: "40vh",
                }}
              >
                <div class=" align-middle inline-block min-w-full ">
                  <div class="shadow overflow-hidden sm:rounded-lg">
                    <table class="min-w-full text-sm ">
                      <thead class="text-md uppercase border-b-2 font-medium">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            s.no
                          </th>
                          <th
                            onClick={() => handleSort("id")}
                            scope="col"
                            class="px-6 py-3 cursor-pointer"
                          >
                            <div className="flex">
                              <div>Supplier ID</div>
                              {supplierSortedColumn === "id" && (
                                <i
                                  className={`bi bi-arrow-${supplierSortOrder.id === "asc"
                                    ? "up"
                                    : "down"
                                    } ml-2`}
                                ></i>
                              )}
                            </div>
                          </th>
                          <th
                            onClick={() => handleSort("name")}
                            scope="col"
                            class="px-6 py-3 cursor-pointer"
                          >
                            <div className="flex">
                              <div>Name</div>
                              {supplierSortedColumn === "name" && (
                                <i
                                  className={`bi bi-arrow-${supplierSortOrder.name === "asc"
                                    ? "up"
                                    : "down"
                                    } ml-2`}
                                ></i>
                              )}
                            </div>
                          </th>
                          <th
                            onClick={() => handleSort("address")}
                            scope="col"
                            class="px-6 py-3 cursor-pointer"
                          >
                            <div className="flex">
                              <div>Address</div>
                              {supplierSortedColumn === "address" && (
                                <i
                                  className={`bi bi-arrow-${supplierSortOrder.address === "asc"
                                    ? "up"
                                    : "down"
                                    } ml-2`}
                                ></i>
                              )}
                            </div>
                          </th>
                          <th
                            onClick={() => handleSort("contact")}
                            scope="col"
                            class="px-6 py-3 cursor-pointer"
                          >
                            <div className="flex">
                              <div>Contact</div>
                              {supplierSortedColumn === "contact" && (
                                <i
                                  className={`bi bi-arrow-${supplierSortOrder.contact === "asc"
                                    ? "up"
                                    : "down"
                                    } ml-2`}
                                ></i>
                              )}
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        style={{ backgroundColor: "white", fontWeight: "bold" }}
                      >
                        {supplierFilteredData.slice(supplierStartIndex, supplierEndIndex).map((data, index) => {
                          return (
                            <tr class="bg-white">
                              <td class="px-6 py-4 border-b-2">{supplierStartIndex + index + 1}</td>
                              <td class="px-6 py-4 border-b-2">{data.id}</td>
                              <td
                                scope="row"
                                class="px-6 py-4 border-b-2 text-gray-900 whitespace-nowrap"
                              >
                                {data.name}
                              </td>
                              <td class="px-6 py-4 border-b-2">
                                {data.address}
                              </td>
                              <td class="px-6 py-4 border-b-2">
                                {data.contact}
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
                <button
                  onClick={supplierPrevPage}
                  className="border-2 rounded-md ml-7 h-10 w-20"
                >
                  Prev
                </button>

                <select
                  onChange={handleSupplierRowSizeChange}
                  value={rowSizeSupplier}
                  className="border-2 w-56 h-10 rounded-md mx-3"
                >
                  <option
                    value={supplier.length < 10 ? supplier.length : 10}
                    className=""
                  >
                    10
                  </option>
                  <option
                    value={supplier.length < 50 ? supplier.length : 50}
                  >
                    50
                  </option>
                  <option value={supplier.length}>Full</option>
                </select>
                <button
                  onClick={supplierNextPage}
                  className="border-2 rounded-md mr-7 h-10 w-20"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Vendors;
