import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";
import moment from "moment";

const TaskLineChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/tasks/");
        const grouped = {};

        res.data.forEach((task) => {
          const date = moment(task.date).format("YYYY-MM-DD");
          if (!grouped[date]) {
            grouped[date] = { total: 0, completed: 0 };
          }
          grouped[date].total += 1;
          if (task.status === "Completed" || task.status === "completed" || task.completed) {
            grouped[date].completed += 1;
          }
        });

        const formatted = Object.entries(grouped).map(([date, counts]) => ({
          date,
          total: counts.total,
          completed: counts.completed,
        }));

        formatted.sort((a, b) => new Date(a.date) - new Date(b.date)); // chronological order

        setChartData(formatted);
      } catch (err) {
        console.error("Failed to fetch line chart data:", err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-md text-black">
      <h2 className="text-xl font-semibold mb-4">📈 Daily Task Completion Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" opacity={0.1} />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis allowDecimals={false} stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderRadius: "8px", color: "#fff" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="completed"
            name="Completed Tasks"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="total"
            name="Total Tasks"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskLineChart;
