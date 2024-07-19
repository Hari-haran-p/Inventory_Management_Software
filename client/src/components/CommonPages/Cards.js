import React, { useEffect, useState } from 'react'
import axios from 'axios';
import InventoryPopup from './commonPopups/InventoryPopup';
import StockPopup from './commonPopups/StockPopup';
import ScarpPopup from './commonPopups/ScarpPopup';
import { useAuth } from '../../AuthContext';

function Cards() {


  const [TotalStockValueData, setTotalStockValueData] = useState();
  const [TotalScrapValueData, setTotalScrapValueData] = useState();
  const [TotalInventoryValueData, setTotalInventoryValueData] = useState();
  const [InventoryData, setInventoryData] = useState(false);
  const [StockData, setStockData] = useState(false);
  const [scrapData, setScrapData] = useState(false);
  const [getInventoryDatas, setGetInventoryDatas] = useState([]);
  const [getStockDatas, setGetStockDatas] = useState([]);
  const [getScrapDatas, setGetScrapDatas] = useState([]);

  const { getRequest } = useAuth();

  const fetchTotalStockValueData = async () => {
    try {
      const response = await getRequest('/api/getTotalStockValueData');
      setTotalStockValueData(response.data[0].stock);
    } catch (error) {
      console.log(error)
    }
  }


  const fetchscrapValueData = async () => {
    try {
      const response = await getRequest('/api/getTotalScrapValueData');
      setTotalScrapValueData(response.data[0].name);
    } catch (error) {
      console.log(error)
    }
  }

  const fetchTotalInventoryValueData = async () => {
    try {
      const response = await getRequest('/api/getTotalInventoryValueData');
      setTotalInventoryValueData(response.data[0].cost);
    } catch (error) {
      console.log(error)
    }
  }

  const fetchgetStockDatas = async () => {
    try {
      const response = await getRequest('/api/getOverallLabsStock');
      setGetStockDatas(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchgetInventoryDatas = async () => {
    try {
      const response = await getRequest('/api/getInventoryData');
      setGetInventoryDatas(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchgetScrapDatas = async () => {
    try {
      const response = await getRequest('/api/getScrapData');
      setGetScrapDatas(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTotalStockValueData();
    fetchscrapValueData();
    fetchTotalInventoryValueData();
    fetchgetInventoryDatas();
    fetchgetStockDatas();
    fetchgetScrapDatas();
  }, [])

  return (
    <>
      <div className='card-container w-full h-full flex flex-col lg:flex-row gap-3 lg:w-5/6 lg:gap-8 items-center justify-center '>
        <div
          className=" w-11/12 h-2/5 md:h-3/5 shadow-2xl rounded-3xl cursor-pointer flex   bg-white animate-fadeIn2"
          onClick={() => setStockData(true)}
        >
          <div className="flex w-1/2 items-center justify-around">
            <img
              src={`/images/stock.png`}
              alt=""
              className="h-3/4 w-3/4 pr-3 "
            ></img>
          </div>
          <div className="flex flex-col h-full rounded-l-3xl w-1/2  items-center pr-14 justify-center ">
            <div className="font-bold  text-lg whitespace-nowrap sm:text-2xl">
              No of stocks
            </div>
            <div style={{ color: "green" }} className=" whitespace-nowrap text-lg sm:text-2xl font-bold flex gap-2 items-center">
              <div>{TotalStockValueData}</div> <div className=''>nos</div>
            </div>
          </div>
        </div>
        <div
          className={` w-11/12 h-2/5 md:h-3/5  shadow-2xl bg-white rounded-3xl cursor-pointer flex animate-fadeIn2`}
          popovertarget="myheader"
          onClick={() => setScrapData(true)}
        >
          <div className="flex w-1/2 items-center justify-around">
            <img
              src={`/images/item.png`}
              alt=""
              className="h-3/4 w-3/4 pr-3"
            ></img>
          </div>
          <div className="flex flex-col h-full rounded-l-3xl w-1/2   items-center pr-14 justify-center ">
            <div className="font-bold  text-lg whitespace-nowrap sm:text-2xl">
              Scrap Value
            </div>
            <div style={{ color: "orange" }} className="card-amount-adjust whitespace-nowrap text-lg sm:text-2xl font-bold flex gap-2">
              Rs {TotalScrapValueData}
            </div>
          </div>
        </div>
        <div
          className={` w-11/12 h-2/5 md:h-3/5 shadow-2xl bg-white rounded-3xl  cursor-pointer flex  animate-fadeIn2`}
          onClick={() => setInventoryData(true)}
        >
          <div className="flex w-1/2 items-center justify-around">
            <img
              src={`/images/inventory.png`}
              alt=""
              className="h-3/4 w-3/4 pr-3"
            ></img>
          </div>
          <div className="flex flex-col h-full rounded-l-3xl w-1/2  items-center pr-14 justify-center ">
            <div className="font-bold sm:text-2xl text-lg whitespace-nowrap ">
              Stock Value
            </div>
            <div style={{ color: "red" }} className="card-amount-adjust whitespace-nowrap font-bold text-lg sm:text-2xl flex gap-2">
              <div>Rs</div> {Math.round((TotalInventoryValueData + Number.EPSILON) * 100) / 100}
            </div>
          </div>
        </div>
      </div>

      <StockPopup isVisible={StockData} onClose={() => setStockData(false)} data={getStockDatas} />
      <InventoryPopup isVisible={InventoryData} onClose={() => setInventoryData(false)} data={getInventoryDatas} />
      <ScarpPopup isVisible={scrapData} onClose={() => setScrapData(false)} data={getScrapDatas} />

    </>
  )
}

export default Cards