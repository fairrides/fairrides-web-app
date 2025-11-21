"use client";

interface SparklineChartProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
    showArea?: boolean;
}

export default function SparklineChart({
    data,
    width = 300,
    height = 60,
    color = "#10b981",
    showArea = true,
}: SparklineChartProps) {
    if (data.length < 2) {
        return (
            <div
                className="flex items-center justify-center bg-gray-100 rounded"
                style={{ width, height }}
            >
                <span className="text-xs text-gray-400">Not enough data</span>
            </div>
        );
    }

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    // Create SVG path
    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
    });

    const linePath = `M${points.join(" L")}`;

    // Area path (fill under the line)
    const areaPath = `${linePath} L${width},${height} L0,${height} Z`;

    return (
        <svg
            width={width}
            height={height}
            className="overflow-visible"
            style={{ display: "block" }}
        >
            {/* Area fill */}
            {showArea && (
                <path
                    d={areaPath}
                    fill={color}
                    fillOpacity="0.1"
                />
            )}

            {/* Line */}
            <path
                d={linePath}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Dots at each data point */}
            {data.map((value, index) => {
                const x = (index / (data.length - 1)) * width;
                const y = height - ((value - min) / range) * height;
                return (
                    <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="3"
                        fill={color}
                        className="opacity-0 hover:opacity-100 transition-opacity"
                    />
                );
            })}
        </svg>
    );
}
