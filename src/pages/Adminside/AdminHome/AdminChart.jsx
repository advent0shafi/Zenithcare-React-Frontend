import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const AdminChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        // If a chart instance already exists, destroy it before creating a new one
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: "bar", // Set the chart type to bar
        data: {
          labels: ["Completed", "Pending", "Canceled"],
          datasets: [
            {
              label: "Counts",
              data: [
                data.completed_count,
                data.pending_count,
                data.canceled_count,
              ],
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ],
            },
          ],
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default AdminChart;
