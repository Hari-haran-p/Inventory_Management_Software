import React from "react";
import Cards from "../CommonPages/Cards";
import Table from "../CommonPages/Table";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import Cookies from "js-cookie";
import axios from "axios";

function Master() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const { user, getUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const [stockData, setStockData] = useState([]);
  const { getRequest} = useAuth();

  const fetchStockData = async () => {
    try {
      const response = await getRequest(
        "http://localhost:4000/api/getAdminStockData"
      );
      setStockData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    } else {
      getUser();
      fetchStockData();
    }
  }, [Cookies.get("token")]);

  useEffect(() => {
    if (stockData.length > 0) {
      setIsLoading(false);
    }
  }, [stockData]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full duration-800 ">
          <span class="loader animate-bounce duration-800"></span>
          Loading
        </div>
      ) : (
        <div
          style={{ backgroundColor: "#F4F4F4", height: "100vh", width: "100%" }}
        >
          <h1 className="text-2xl font-semibold animate1 pt-10 pl-20">
            Master Page
          </h1>
          <div className="flex flex-col justify-center items-center ">
            <div
              style={{ height: "30vh" }}
              className="d-card flex items-center justify-center"
            >
              {" "}
              <Cards />
            </div>
            <div className="flex items-center justify-center w-full">
              <Table stockData={stockData} fetchStockData={fetchStockData} setStockData={setStockData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Master;
