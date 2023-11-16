import React, { useState } from 'react';

const DateRangeFilter = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [dates, setDates] = useState([
    '12-01-2002',
    '22-01-2002',
    '23-01-2002',
    '31-01-2002',
    '04-02-2023',
    '05-06-2023',
  ]);

  const parseDate = (dateStr) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day);
    }
    return null;
  };

  const handleFilter = () => {
    const fromDateObj = parseDate(fromDate);
    const toDateObj = parseDate(toDate);

    if (!fromDateObj || !toDateObj) {
      alert('Invalid date format. Please use dd-mm-yyyy.');
      return;
    }

    const filteredDates = dates.filter((dateStr) => {
      const dateObj = parseDate(dateStr);
      return dateObj >= fromDateObj && dateObj <= toDateObj;
    });

    // Update state with filtered dates
    setDates(filteredDates);
  };

  return (
    <div>
      <label htmlFor="fromDate">From Date:</label>
      <input
        type="text"
        id="fromDate"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
      <br />
      <label htmlFor="toDate">To Date:</label>
      <input
        type="text"
        id="toDate"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />
      <br />
      <button onClick={handleFilter}>Filter Dates</button>
      <br />
      <ul>
        {dates.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul>
    </div>
  );
};

export default DateRangeFilter;