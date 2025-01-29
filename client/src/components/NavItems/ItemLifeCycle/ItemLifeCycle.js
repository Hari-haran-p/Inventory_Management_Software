import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  Package,
  Truck,
  AlertTriangle,
  Search,
  Clock,
  MapPin,
  DollarSign,
  ShoppingCart,
  Eye,
} from "lucide-react";
import Popup from "./Popup";

const ItemLifecycle = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(false);
  const [item, setitem] = useState(null);

  const getItemData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/getItemData");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(data);
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const searchCondition = searchTerm
      ? Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;
    return searchCondition;
  });

  useEffect(() => {
    getItemData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Package className="inline-block mr-2 h-7 w-7" />
            Product Lifecycle Management
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 w-64 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {item.item_name}
                      <span className="ml-1 text-sm text-gray-500">
                        ({item.item_subname})
                      </span>
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.item_description}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setitem(item);
                      setVisible(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 focus:outline-none flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">View Details</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="space-y-3">
                    <h4 className="text-base font-semibold flex items-center gap-1 text-gray-700">
                      <Clock className="h-4 w-4 text-blue-500" />
                      Timeline
                    </h4>
                    <div className="space-y-2">
                        {item.stock_date &&(
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-xs font-medium">Stock Date</p>
                          <p className="text-gray-600 text-sm">
                            {item.stock_date}
                          </p>
                        </div>
                      </div>
                        )}
                      {item.transfer_date && (
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-blue-500" />
                          <div>
                            <p className="text-xs font-medium">Transfer Date</p>
                            <p className="text-gray-600 text-sm">
                              {item.transfer_date}
                            </p>
                          </div>
                        </div>
                      )}
                        {item.scrap_date && (
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                            <div>
                              <p className="text-xs font-medium">Scrap Date</p>
                              <p className="text-gray-600 text-sm">
                                 {new Date(item.scrap_date).toLocaleDateString()}
                              </p>
                            </div>
                        </div>
                      )}

                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-base font-semibold flex items-center gap-1 text-gray-700">
                    <ShoppingCart className="h-4 w-4 text-blue-500" />
                    Supplier
                    </h4>
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-xs font-medium">Supplier Name</p>
                        <p className="text-gray-600 text-sm">
                          {item.supplier_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-xs font-medium">Supplier Contact</p>
                        <p className="text-gray-600 text-sm">
                          {item.supplier_contact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 text-gray-600 text-sm p-3 text-center">
                <MapPin className="inline-block h-4 w-4 text-blue-500" />
                <span className="ml-1">Location: <span>{item.transfer_to_lab ? item.transfer_to_lab : item.scrap_status ? "Scrapped" : "In Stock" }</span></span>
                </div>
            </div>
          ))}
        </div>
        {visible && (
          <Popup
            data={item}
            setVisible={setVisible}
          />
        )}
      </div>
    </div>
  );
};

export default ItemLifecycle;