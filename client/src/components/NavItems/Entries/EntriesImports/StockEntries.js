import React, { useEffect, useState } from 'react';
import StockImport from '../Imports/StockImport';
import StockPopUp from '../Popups/StockPopUp';

export default function StockEntries() {
    const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const clearMessage = () => {
    setMessage(null);
    setError(null);
  };

  useEffect(() => {
    setTimeout(clearMessage, 4000);
  }, [message, error]);
  return (
    <div className="w-full h-full">
      {message ? (
        <div
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded  fixed z-50 top-0 message"
          role="alert"
        >
          <span class="block sm:inline">{message}</span>
        </div>
      ) : null}
      {error ? (
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 z-50 message"
          role="alert"
        >
          <span class="block sm:inline">{error}</span>
        </div>
        
      ) : null}
      <StockImport setMessage={setMessage} setError={setError} />
      <StockPopUp setMessage={setMessage} setError={setError} />
      
    </div>
  )
}
