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
          "apex_no",
          "stock_id",
          "type",
          "name",
          "subname",
          "from_labname",
          "transfered_from",
          "transfer_to",
          "to_labname",
          "transfer_qty",
          "current_status",
          "stage1approvedby",
          "stage1status",
          "stage1date",
          "stage2approvedby",
          "stage2status",
          "stage2date",
          "stage3approvedby",
          "stage3status",
          "stage3date",
          "stage4approvedby",
          "stage4status",
          "stage4date",
          "stage4description",
          "faculty_id",
          "created_at"
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
    stock_id: "asc",
    type: "asc",
    name: "asc",
    subname: "asc",
    transfered_from: "asc",
    from_labname: "asc",
    transfer_to: "asc",
    to_labname: 'asc',
    transfer_qty: "asc",
    current_status: "asc",
    stage1approvedby: "asc",
    stage1status: "asc",
    stage1date: "asc",
    stage2approvedby: "asc",
    stage2status: "asc",
    stage2date: "asc",
    stage3approvedby: "asc",
    stage3status: "asc",
    stage3date: "asc",
    stage4approvedby: "asc",
    stage4status: "asc",
    stage4date: "asc",
    stage4description: "asc",
    faculty_id: "asc",
    created_at: "asc"
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
    <div className=" w-10/12 border-2 bg-white rounded-t-3xl h-auto">
      <div className="flex flex-wrap h-auto w-full my-4 items-center justify-center md:justify-between  font-semibold">
        <div className="pl-4 text-2xl flex items-center whitespace-nowrap  text-blue-600 font-semibold">
          Transfer Table
        </div>
        <div className="flex flex-wrap justify-center items-center">
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
      <div class="soverflow-y-auto  overflow-x-auto border-gray-700 rounded-lg">
        <div style={{ width: "100%" }} class=" align-middle  inline-block">
          <div
            style={{ height: "50%", maxHeight: "50vh" }}
            class="shadow sm:rounded-lg  h-96"
          >
            <table class="min-w-full text-sm">
              <thead class=" text-md uppercase border-b-2 font-medium">
                <tr>
                  <th className="px-6 py-3">s.no</th>
                  <th
                    onClick={() => sortData("apex_no")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Apex No.</div>
                      {sortedColumn === "apex_no" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.stock_id === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => sortData("stock_id")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Stock Id</div>
                      {sortedColumn === "stock_id" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.stock_id === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => sortData("type")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Item Type</div>
                      {sortedColumn === "type" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.type === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => sortData("name")}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div>Item Name</div>
                      {sortedColumn === "name" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.name === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("subname")}>
                        Item Subname
                      </div>
                      {sortedColumn === "subname" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.subname === "asc" ? "up" : "down"
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
                          className={`bi bi-arrow-${sortOrder.from_labname === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("to_labname")}>
                        To Lab Name
                      </div>
                      {sortedColumn === "to_labname" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.to_labname === "asc" ? "up" : "down"
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
                          className={`bi bi-arrow-${sortOrder.transfer_qty === "asc" ? "up" : "down"
                            } ml-2`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th>

                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                  >
                    <div className="flex">
                      <div onClick={() => sortData("current_status")}>
                        Status
                      </div>
                      {sortedColumn === "current_status" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.current_status === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("faculty_id")}>
                        Faculty
                      </div>
                      {sortedColumn === "faculty_id" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.faculty_id === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("stage1status")}>
                        Stage 1 status
                      </div>
                      {sortedColumn === "stage1status" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.stage1status === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("stage1approvedby")}>
                        Approved By
                      </div>
                      {sortedColumn === "stage1approvedby" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.stage1approvedby === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("stage2status")}>
                        Stage 2 Status
                      </div>
                      {sortedColumn === "stage2status" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.stage2status === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("stage2approvedby")}>
                        Approved By
                      </div>
                      {sortedColumn === "stage2approvedby" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.stage2approvedby === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("stage3status")}>
                        Stage 3 status
                      </div>
                      {sortedColumn === "stage3status" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.stage3status === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("stage3approvedby")}>
                        Approved By
                      </div>
                      {sortedColumn === "stage3approvedby" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.stage3approvedby === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("stage4status")}>
                        Stage 4 status
                      </div>
                      {sortedColumn === "stage4status" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.stage4status === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("stage4approvedby")}>
                        Rejected By
                      </div>
                      {sortedColumn === "stage4approvedby" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.stage4approvedby === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("stage4description")}>
                        Description
                      </div>
                      {sortedColumn === "stage4description" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.stage4description === "asc" ? "up" : "down"
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
                      <div onClick={() => sortData("created_at")}>
                        Date
                      </div>
                      {sortedColumn === "created_at" && (
                        <i
                          className={`bi bi-arrow-${sortOrder.created_at === "asc" ? "up" : "down"
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
                      <td class="flex px-6 py-4 whitespace-nowrap">
                        {data.apex_no}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.stock_id}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.type}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.subname}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.from_labname}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.to_labname}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.transfer_qty}
                      </td>
                      <td className="h-10 w-30 whitespace-nowrap flex items-center justify-center gap-1">
                        <div className="relative w-6 h-6" title="Initiated">
                          <img src={`/images/checkmark.png`} alt="" />
                        </div>
                        <div className="relative w-6 h-6" title="Lab Approved">
                          {data.stage1status ? <img src={`/images/checkmark.png`} alt="" /> : data.stage4status ? <img src={`/images/decline.png`} alt="" /> : <img style={{scale:"0.61"}} src="/images/empty.png"/>
                          }
                        </div>
                        <div className="relative w-6 h-6" title="Stores Approved">
                          {data.stage2status ? <img src={`/images/checkmark.png`} alt="" /> : data.stage4status ? <img src={`/images/decline.png`} alt="" /> : <img style={{scale:"0.61"}} src="/images/empty.png"/>
                          }
                        </div>
                        <div className="relative w-6 h-6" title="Acknowledged">
                          {data.stage3status ? <img src={`/images/checkmark.png`} alt="" /> : data.stage4status ? <img src={`/images/decline.png`} alt="" /> : <img style={{scale:"0.61"}} src="/images/empty.png"/>
                          }
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.current_status ? data.current_status : '-'}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.faculty_id ? data.faculty_id : '-'}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.stage1status ? data.stage1status : '-'}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.stage1approvedby ? data.stage1approvedby : '-'}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.stage2status ? data.stage2status : '-'}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.stage2approvedby ? data.stage2approvedby : '-'}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.stage3status ? data.stage3status : '-'}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.stage3approvedby ? data.stage3approvedby : "-"}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.stage4status ? data.stage4status : '-'}
                      </td><td class="px-6 py-4 whitespace-nowrap">
                        {data.stage4approvedby ? data.stage4approvedby : '-'}
                      </td><td class="px-6 py-4 whitespace-nowrap">
                        {data.stage4description ? data.stage4description : "-"}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {data.created_at.split("T")[0]}
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
