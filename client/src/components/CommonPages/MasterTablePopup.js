import React from "react";

function MasterTablePopup({ onClose, data }) {
  return (
    <div className=" popup-overlay">
      <div className=" popup-responsive bg-white px-20 py-10 rounded-2xl">
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
            <div className="w-36 flex overflow-hidden justify-start font-bold mr-5 whitespace-nowrap">
              Apex No:
            </div>
            :<div className="pl-5"> {data.apex_no}</div>
          </div>
          
          <div className="w-full flex">
            <div className="w-36 flex overflow-hidden justify-start font-bold mr-5 whitespace-nowrap ">
              Item Type
            </div>
            :<div className="pl-5 "> {data.item_type}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex overflow-hidden justify-start font-bold mr-5 whitespace-nowrap ">
              Item Name
            </div>
            :<div className="pl-5 "> {data.item_name}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex overflow-hidden justify-start font-bold mr-5 whitespace-nowrap ">
              Item Subname
            </div>
            :<div className="pl-5 "> {data.item_subname}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex overflow-hidden justify-start font-bold mr-5 whitespace-nowrap ">
              Item Description
            </div>
            :
            <div className="pl-5 ">
              {" "}
              {data.item_description}
            </div>
          </div>
          
          <div className="w-full flex">
            <div className="w-36 flex overflow-hidden justify-start font-bold mr-5 whitespace-nowrap ">
              Quantity Units
            </div>
            :
            <div className="pl-5 "> {data.quantity_units}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex justify-start overflow-hidden font-bold mr-5 whitespace-nowrap ">
              Manufacturer Name
            </div>
            :
            <div className="pl-5 ">
              {data.manufacturer_name}
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex overflow-hidden justify-start font-bold mr-5 whitespace-nowrap ">
              Supplier Name
            </div>
            :<div className="pl-5 "> {data.supplier_name}</div>
          </div>

          <div className="w-full flex">
            <div className="w-36 flex overflow-hidden justify-start font-bold mr-5 whitespace-nowrap ">
              Supplier Contact
            </div>
            :<div className="pl-5 "> {data.contact}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex overflow-hidden justify-start font-bold mr-5 whitespace-nowrap ">
              Stock Qty
            </div>
            :<div className="pl-5"> {data.stock_qty}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex overflow-hidden justify-start font-bold mr-5 whitespace-nowrap ">
              Inventory Value
            </div>
            :
            <div className="pl-5 ">
              {" "}
              {data.inventory_value}
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex overflow-hidden justify-start font-bold mr-5 whitespace-nowrap ">
              Purchased By
            </div>
            :<div className="pl-5 whitespace-nowrap"> {data.user_id}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex overflow-hidden justify-start font-bold mr-5 whitespace-nowrap ">
              Department Id
            </div>
            :<div className="pl-5 whitespace-nowrap"> {data.dept_id}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterTablePopup;
