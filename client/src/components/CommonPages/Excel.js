import axios from "axios";
import React, { useEffect, useState } from "react";  
import { read, utils, writeFile } from 'xlsx';
import { useAuth } from "../../AuthContext";


const Excel = () => {

    const [movies, setMovies] = useState([]);

const {user, getUser} = useAuth();

useEffect(()=>{
  getUser();
})

    // const handleImport = async($event) => {
    //     $event.preventDefault();
    //     const files = $event.target.files;
    //     if (files.length) {
    //         const file = files[0];
    //         const reader = new FileReader();
    //         reader.onload = (event) => {
    //             const wb = read(event.target.result);
    //             const sheets = wb.SheetNames;

    //             if (sheets.length) {
    //                 const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
    //                 setMovies(rows)
    //             }
    //         }
    //         reader.readAsArrayBuffer(file);
    //     }
        
    // }

    const handleImport = async ($event) => {
        $event.preventDefault();
        const files = $event.target.files;
        if (files.length) {
          const file = files[0];
          const reader = new FileReader();
      
          // Create a Promise to handle the file reading
          const readFile = () => {
            return new Promise((resolve, reject) => {
              reader.onload = (event) => {
                resolve(event.target.result);
              };
              reader.onerror = (event) => {
                reject(event.target.error);
              };
              reader.readAsArrayBuffer(file);
            });
          };
          
          try {
            const fileData = await readFile(); // Wait for the file to be read
      
            const wb = read(fileData);
            const sheets = wb.SheetNames;
      
            if (sheets.length) {
              const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
              setMovies(rows);
              const response = await axios.post("http://localhost:4000/api/importStocks", {items:rows, user_id:user.user_id})
              console.log(response);
              console.log(rows);
            }

          } catch (error) {
            console.error('Error reading file:', error);
          }
        }
      };
      

    // console.log(movies);


    return (
        <div>
            <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        </div>
    )
}

export default Excel