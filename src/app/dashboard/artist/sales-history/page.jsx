import React from "react";
import SalesHistoryTable from "./SalesHistoryTable";
import { showPaymentData } from "@/lib/actions/payment";


const SalesHistoryPage = async() => {
    const salesData = await showPaymentData();
    return (
       <div>
            <SalesHistoryTable salesData={salesData} ></SalesHistoryTable>
       </div>
    );
};

export default SalesHistoryPage;