import React from 'react';

function StockPopup({ isVisible, onClose, data }) {

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="fixed inset-0 flex justify-center items-center">
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '15px',
          }}
          className="flex flex-col"
        >
          <div className="bg-white px-10 py-5 stock animate1 overflow-x-auto overflow-y-auto border-gray-700 rounded-lg">
            <div className="w-full text-end">
              <button
                className="text-black rounded-full border-2 border-black px-2 text-3xl"
                onClick={() => onClose()}
              >
                X
              </button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="py-1 flex pb-8">
                <span className="px-1 text-black font-medium text-2xl whitespace-nowrap">
                 Lab Stocks
                </span>
              </div>
              <div
                style={{ width: "90%", height: "30%", maxHeight: "300px" }}
                class="relative rounded-2xl animate overflow-x-auto overflow-y-auto"
              >
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                  <thead style={{ backgroundColor: "#0f6af2", color: "white", whiteSpace: "nowrap" }} class="text-sm uppercase">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left whitespace-nowrap tracking-wider"
                      >
                        S.No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left whitespace-nowrap tracking-wider"
                      >
                        LAB CODE
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left whitespace-nowrap tracking-wider cursor-pointer"
                      >
                        LAB NAME
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        No Of Stocks
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: "white", fontWeight: "bold", color: "black" }}>

                    {data.map((lab, index) => (
                      <tr className="bg-white">
                        <td scope="row" className="px-6 text-center py-4">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          {lab.labcode}
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          {lab.labname}
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                        {lab.stock} nos
                        </td>
                      </tr>
                    ))}



                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}

export default StockPopup;
