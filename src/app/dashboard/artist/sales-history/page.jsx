import React from "react";
import SalesHistoryTable from "./SalesHistoryTable";
import { getSalesHistory } from "@/lib/api/artist";



const SalesHistoryPage = async() => {
    const salesData = await getSalesHistory();
    console.log(salesData)
    return (
       <div>
            <SalesHistoryTable salesData={salesData} ></SalesHistoryTable>
       </div>
    );
};

export default SalesHistoryPage;