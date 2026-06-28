import React from "react";
import CustomActiveShapePieChart from "./CustomActiveShapePieChart";
import { chartData } from "@/lib/api/admin";

const ChartsPage = async() => {
    const data = await chartData();
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Charts Dashboard
            </h1>

            <CustomActiveShapePieChart data={data}></CustomActiveShapePieChart>
           
        </div>
    );
};

export default ChartsPage;