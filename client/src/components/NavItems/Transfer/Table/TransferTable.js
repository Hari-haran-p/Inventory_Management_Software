import React from 'react';
import Table from "./Table";


const TransferTable = ({ OverallTranferedData, isVisible }) => {

    if (!isVisible) return null;

    return (
        <div>
            <br /><br />
            <div className="flex items-center flex-col">
                <Table stockData={OverallTranferedData} />
            </div>
        </div>


    )
}

export default TransferTable