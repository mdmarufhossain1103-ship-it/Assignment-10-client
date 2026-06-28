"use client";

import React, { useState, useMemo } from "react";
import { PieChart, Pie, Sector, Tooltip, Cell } from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];

const renderActiveShape = (props) => {
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        value,
        percent,
    } = props;

    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);

    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            {/* Center Text displaying category name */}
            <text x={cx} y={cy} textAnchor="middle" fill="#374151" className="font-semibold text-sm">
                {payload.name}
            </text>

            {/* Main Sector Slice */}
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />

            {/* Outer Ring Border highlight */}
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />

            {/* Connecting Pointer Path */}
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={3} fill={fill} />

            {/* Data Label Values */}
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#1f2937"
                className="text-xs font-bold"
            >
                {`Artworks: ${value}`}
            </text>

            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#6b7280"
                className="text-xs"
            >
                {`(${(percent * 100).toFixed(1)}%)`}
            </text>
        </g>
    );
};

export default function CustomActiveShapePieChart({ data = [] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Group the raw data by 'category' into format: [{ name: "Painting", value: 5 }]
    const processedChartData = useMemo(() => {
        if (!data || data.length === 0) return [];

        // If the array elements already possess explicit 'name' and 'value', bypass transformations
        if (data[0] && "name" in data[0] && "value" in data[0]) {
            return data;
        }

        const counts = data.reduce((acc, item) => {
            const catName = item.category || "Uncategorized";
            acc[catName] = (acc[catName] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(counts).map((categoryName) => ({
            name: categoryName,
            value: counts[categoryName],
        }));
    }, [data]);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    if (processedChartData.length === 0) {
        return (
            <div className="flex justify-center items-center h-[400px] text-gray-400 font-medium">
                No category metrics available.
            </div>
        );
    }

    return (
        <div className="flex justify-center">
            <PieChart width={520} height={400}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={processedChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                >
                    {processedChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
}