import React from "react";

function ItemPopup({ data, onClose }) {
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

          <div className="box-shadow w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
              Item Code :
            </div>
            <div className="pl-5 whitespace-nowrap"> {data.item_code}</div>
          </div>

          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
              Item Type
            </div>
            :<div className="pl-5 whitespace-nowrap"> {data.item_type}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
              Item Name
            </div>
            :<div className="pl-5 whitespace-nowrap"> {data.item_name}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
              Item Subname
            </div>
            :<div className="pl-5 whitespace-nowrap"> {data.item_subname}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
            Item Description
            </div>
            :<div className="pl-5 whitespace-nowrap"> {data.item_description}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
              Manufacturer Id
            </div>
            :
            <div className="pl-5 whitespace-nowrap">
              {" "}
              {data.manufacturer_id}
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
              Quantity Units
            </div>
            :
            <div className="pl-5 whitespace-nowrap"> {data.quantity_units}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
              Supplier Id
            </div>
            :<div className="pl-5 whitespace-nowrap"> {data.supplier_id}</div>
          </div>
          <div className="w-full flex">
            <div className="w-36 flex justify-end font-bold mr-5 whitespace-nowrap ">
              Cost_Per_Item
            </div>
            :<div className="pl-5 whitespace-nowrap"> {data.cost_per_item}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPopup;
