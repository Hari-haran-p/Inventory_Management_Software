import { React, Suspense, useEffect, useState } from "react";
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
      const response = await axios.get('/api/getInventory'); 
      setInventory(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/getCategories');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLabitem = async () => {
    try {
      const response = await axios.get('/api/getLabItem'); 
      setLabitem(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchLabname = async () => {
    try {
      const response = await axios.get('/api/getLabDetails'); 
      setLabname(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchLabsStock = async () => {
    try {
      const response = await axios.get('/api/getLabsStock'); 
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

  useEffect(() => {
    if (categories.length > 0 && inventory.length > 0 && labitem.length > 0 && labname.length > 0) {
      setTimeout(() => setIsLoading(), 1000)

    }
  }, [categories, inventory, labitem, labname])

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full duration-800 ">
          <span class="loader animate-bounce duration-800"></span>
          Loading
        </div >
      ) : (
        <>
          <div className="" style={{ backgroundColor: "#F4F4F4" }}>
            <h1 style={{ fontWeight: "bolder", fontSize: "30px", paddingLeft: "7%" }} class={`text-start pt-4`}>Dashboard</h1>
            <div style={{ height:"30vh" }} className="d-card flex items-center justify-center">
              <Cards />
            </div>
        
            <div className="areah lg:pl-28 w-11/12 animate1">
              <Areachart inventory={inventory} />
            </div>
            <br /><br />
            <div className="twochart" style={{ display: "flex", width: "%100", gap: "2%", justifyContent: "center" }}>
              <Barchart categories={categories} open={open} setOpen={setOpen} labname={labname} labsStock={labsStock} />
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



