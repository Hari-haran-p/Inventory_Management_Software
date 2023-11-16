import React, { useState } from "react";
import * as XLSX from "xlsx";
import ReportView from "./ReportView";
import jsPDF from "jspdf";
import "jspdf-autotable";
// Render the report with a PDFViewer
const ReportGeneration = ({
  handleOkClick,
  setRequiredData,
  requiredData,
  selectedTable,
  selectedColumns,
  setError,
  viewColumn,
}) => {
  const exportToExcel = () => {
    const dataForExcel = [];
    const copy = requiredData;
    const keysAndValuesArray = [];
    if (copy.length > 0) {
      const firstObject = copy[0];
      const keys = Object.keys(firstObject);
      keysAndValuesArray.push([...keys]);
      keysAndValuesArray.push([...keys.map((key) => firstObject[key])]);
      dataForExcel.push(...keysAndValuesArray);
    }

    dataForExcel.push(
      ...requiredData.map((item) => {
        const rowData = [];
        for (const key in item) {
          rowData.push(item[key]);
        }
        return rowData;
      })
    );

    const ws = XLSX.utils.aoa_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Change the sheet name as needed

    // Save the Excel file
    XLSX.writeFile(wb, "my_report.xlsx");
  };

  
  function downloadPDF(requiredData) {
    const columnNames = Object.keys(requiredData[0]);
    const maxColumnsPerPage = 5; // Set the maximum number of columns per page
    const totalColumns = columnNames.length;
    const totalPages = Math.ceil(totalColumns / maxColumnsPerPage);

    const doc = new jsPDF();

    // Iterate through each page
    for (let page = 0; page < totalPages; page++) {
      // Calculate the start and end indices for the current page's columns
      const startIndex = page * maxColumnsPerPage;
      const endIndex = Math.min(startIndex + maxColumnsPerPage, totalColumns);
      const pageColumnNames = columnNames.slice(startIndex, endIndex);
      const pageTableData = requiredData.map((row) =>
        pageColumnNames.map((col) => row[col])
      );

      // Add a new page for each page, except the first one
      if (page > 0) {
        doc.addPage();
      }

      // Generate the table for the current page
      doc.autoTable({
        head: [pageColumnNames],
        body: pageTableData,
        startY: 10, // Adjust the startY position as needed
      });
    }

    doc.save("Master Table.pdf"); // Download the PDF with a specified filename
  }

  return (
    <div>
      <div className="">
        {requiredData.length > 0 && (
          <ReportView
            handleOkClick={handleOkClick}
            setError={setError}
            setRequiredData={setRequiredData}
            selectedColumns={selectedColumns}
            selectedTable={selectedTable}
            requiredData={requiredData}
            viewColumn={viewColumn}
            exportToExcel={exportToExcel}
            downloadPDF={downloadPDF}
          />
        )}
      </div>
    </div>
  );
};

export default ReportGeneration;
