import React from "react";
import {
  Package,
  Info,
  User,
  Calendar,
  ClipboardList,
  Building,
  Phone,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const Popup = ({ data, setVisible }) => {
  const renderField = (icon, label, value) => {
    if (!value) return null;
    return (
      <div className="flex items-center gap-2 py-2">
        {icon}
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-base text-gray-900">{value}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full scrollbar-none max-w-4xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Details</h2>
          <button className="text-2xl" onClick={() => setVisible(false)}>
            ×
          </button>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Basic Information
          </h3>
          {renderField(
            <Info className="text-blue-500" />,
            "Apex No",
            data.apex_no
          )}
          {renderField(
            <ClipboardList className="text-blue-500" />,
            "Reason",
            data.apex_reason
          )}
          {renderField(
            <Building className="text-blue-500" />,
            "Department ID",
            data.dept_id
          )}
          {renderField(
            <Package className="text-blue-500" />,
            "Item Name",
            data.item_name
          )}
          {renderField(
            <Info className="text-blue-500" />,
            "Item Subname",
            data.item_subname
          )}
          {renderField(
            <Info className="text-blue-500" />,
            "Item Type",
            data.item_type
          )}

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">
            Inventory Details
          </h3>
          {renderField(
            <Info className="text-green-500" />,
            "Inventory Value",
            data.inventory_value
          )}
          {/* {renderField(
            <Info className="text-green-500" />,
            "Quantity Units",
            data.quantity_units
          )} */}
          {renderField(
            <Calendar className="text-green-500" />,
            "Stock Date",
            data.stock_date
          )}
            {/* {renderField(
              <Info className="text-green-500" />,
              "Stock Quantity",
              data.stock_qty
            )} */}

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">
            Scrap Details
          </h3>
          {renderField(
            <CheckCircle className="text-red-500" />,
            "Scrap Status",
            data.scrap_status
          )}
           {/* {renderField(
            <Info className="text-red-500" />,
            "Scrap Quantity",
            data.scrap_qty
          )} */}
           {renderField(
            <Info className="text-red-500" />,
            "Scrap Date",
            data.scrap_date
          )}

           <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">
            Transfer Details
          </h3>
          {renderField(
            <Calendar className="text-blue-500" />,
            "Transfer Date",
            data.transfer_date
          )}
          {renderField(
              <User className="text-blue-500" />,
              "Transfer Faculty Name",
              data.transfer_faculty_name
            )}
             {renderField(
             <ArrowRight className="text-blue-500" />,
             "Transfer From Lab",
            data.transfer_from_lab
            )}
            {/* {renderField(
              <Info className="text-blue-500" />,
              "Transfer Quantity",
              data.transfer_qty
            )} */}
            {renderField(
              <Info className="text-blue-500" />,
              "Transfer Status",
              data.transfer_status
            )}
             {renderField(
             <ArrowRight className="text-blue-500" />,
            "Transfer To Lab",
            data.transfer_to_lab
             )}


          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">
            Supplier Details
          </h3>
          {renderField(
            <User className="text-purple-500" />,
            "Supplier Name",
            data.supplier_name
          )}
          {renderField(
            <Phone className="text-purple-500" />,
            "Supplier Contact",
            data.supplier_contact
          )}

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">
            User Details
          </h3>
          {renderField(
            <User className="text-orange-500" />,
            "User ID",
            data.user_id
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;