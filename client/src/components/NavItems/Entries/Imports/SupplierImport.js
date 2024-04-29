import {React, useState} from 'react';
import axios from 'axios';
import { read, utils, writeFile } from 'xlsx';



const SupplierImport = (props) => {

   const {setError, setMessage } = props

    const [filename, setFilename] = useState("");
    const [file, setFile] = useState("");
    const [rows, setRows] = useState([]);

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const allowedExtensions = ["xlsx", "xls"];
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
            console.log(fileExtension);
            if (allowedExtensions.includes(fileExtension)) {
                setFilename(selectedFile.name);
                setFile(selectedFile);
            } else {
                alert("Please select a valid Excel file (xlsx or xls).");
                e.target.value = "";
            }
        }
    }
    
    const handleImport = async ($event) => {
        $event.preventDefault();
        if (file === "") {
            setError("Kindly upload the file");
        } else {
            const files = file;
            if (files) {
                const file = files;
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
                        setRows(rows);
                        const response = await axios.post("http://localhost:4000/api/importSuppliers", { items: rows })
                        if (response) {
                            setMessage(response.data.Data)
                            setFile("");
                            setFilename("Kindly select file");
                        }
                    }
                } catch (error) {
                    if (error) {
                        setError(error.response.data.Data);
                        setFile("");
                        setFilename("Kindly select file");
                    }
                    console.error('Error reading file:', error);
                }
            }
        }

    };



  return (
    <>
        <div className="w-full pt-7">
            <div className="flex  flex-col">
                <div className="bg-white w-full px-4 md:px-14 animate1 py-5 overflow-x-auto overflow-y-auto flex flex-col items-center justify-center border-gray-700 rounded-lg" >
                    <div className=" w-full">
                        <div className="py-1 pb-6">
                            <span className="px-1 text-black font-medium text-2xl ">
                                Upload Suppliers
                            </span>
                        </div>
                        <div className='w-full'>
                            <form onSubmit={handleImport}>
                                <div class="flex items-center justify-center w-full">
                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-white hover:bg-white-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-100">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">xlsx, xls (MAX. 4000kb)</p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            class="hidden"
                                            required
                                            accept=".xlsx, .xls"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                            {file ? (
                                <div className='mt-10'>
                                    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 pb-2 left-0 flex items-center pl-3 pointer-events-none">
                                            <i class="bi bi-box-arrow-in-down"></i>
                                        </div>
                                        <input disabled value={filename} type="search" id="search" class="block w-full p-4 pl-10 text-sm text-black border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:border-blue-500 hover:bg-gray-100" placeholder="Search" required />
                                        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                    </div>
                                </div>
                            ) : (null)}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SupplierImport