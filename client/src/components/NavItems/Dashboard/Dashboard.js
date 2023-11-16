import { React, useEffect, useState } from "react";
import Areachart from "./Graphs/Areachart";
import Barchart from "./Graphs/Barchart";
import Piechart from "./Graphs/Piechart";
import axios from 'axios'
import Cards from "../../CommonPages/Cards";

function Dashboard({ open, setOpen }) {

  const setNavState = () => {
    setOpen(open);
  };


  const [isLoading, setIsLoading] = useState(true);
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [labname, setLabname] = useState([]);
  const [labitem, setLabitem] = useState([]);
  const [labsStock, setLabsStock] = useState([]);


  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/getInventory'); // Replace '/api/data' with your API endpoint    
      setInventory(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/getCategories'); // Replace '/api/data' with your API endpoint
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLabitem = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/getLabItem'); // Replace '/api/data' with your API endpoint
      setLabitem(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchLabname = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/getLabDetails'); // Replace '/api/data' with your API endpoint
      setLabname(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchLabsStock = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/getLabsStock'); // Replace '/api/data' with your API endpoint
      setLabsStock(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchInventory();
    fetchCategories();
    fetchLabitem();
    fetchLabname();
    fetchLabsStock();
  }, []);

  console.log(categories);
  useEffect(() => {
    if (categories.length > 0 && inventory.length > 0 && labitem.length > 0 && labname.length > 0) {
      setTimeout(() => setIsLoading(), 1000)

    }
  }, [categories, inventory, labitem])


  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full duration-800 ">
          <span class="loader animate-bounce duration-800"></span>
          Loading
        </div >
      ) : (
        <>
          <div style={{ backgroundColor: "#F4F4F4" }}>
            <h1 style={{ fontWeight: "bolder", fontSize: "30px", paddingLeft: "7%" }} class={`text-start pt-4`}>Dashboard</h1>
            <div style={{ paddingBottom: "2%" }}>
              <Cards />
            </div>

            <div className="w-11/12 pl-24 area animate1">
              <Areachart inventory={inventory} />
            </div>
            <br /><br />
            <div className="twochart" style={{ display: "flex", width: "100%", gap: "2%", justifyContent: "center" }}>
              <Barchart categories={categories} open={open} setOpen={setOpen} labname={labname} labsStock={labsStock}/>
              <Piechart labitem={labitem} />
            </div>
          </div>

        </>
      )
      }
    </>
  )
}


export default Dashboard



