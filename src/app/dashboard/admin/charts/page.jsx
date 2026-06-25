"use client";

import React from "react";
import CustomActiveShapePieChart from "./CustomActiveShapePieChart";

const ChartsPage = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Charts Dashboard
            </h1>

            <CustomActiveShapePieChart></CustomActiveShapePieChart>
           
        </div>
    );
};

export default ChartsPage;