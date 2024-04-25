import React from "react";

function StockPopup({ data, onClose }) {
  
  return (
    <div className=" popup-overlay">
      <div className=" popup-responsive animate1 popup-content">
        <div className="w-full text-end">
          <button
            className="rounded-full border-2 border-black px-2"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className=" text-lg gap-6">
          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
              Item Code
            </div>
            :<div className="pl-5 whitespace-nowrap"> {data.id}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
            Manufacturer Id
            </div>
            :<div className="pl-5 whitespace-nowrap"> {data.manufacturer_id}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
            Supplier Id
            </div>
            :<div className="pl-5 whitespace-nowrap"> {data.supplier_id}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
            Stock Qty
            </div>
            :<div className="pl-5 whitespace-nowrap"> {data.quantity}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
            Created At
            </div>
            :<div className="pl-5 whitespace-nowrap"> {data.created_at}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
            Dept Id
            </div>
            :<div className="pl-5 whitespace-nowrap"> {data.dept_id}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
            Inventory Value
            </div>
            :<div className="pl-5 whitespace-nowrap"> {data.cost}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
            User Id
            </div>
            :
            <div className="pl-5 whitespace-nowrap">
              {data.faculty_id}
            </div>
        </div>
      </div>
    </div>
    </div>
   
  );
}

export default StockPopup;
