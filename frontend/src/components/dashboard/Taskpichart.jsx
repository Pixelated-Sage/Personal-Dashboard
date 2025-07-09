import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import axios from "axios";

const COLORS = ["#22c55e", "#3b82f6", "#facc15"]; // green, blue, yellow

const TaskPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/tasks/");
        const counts = {
          completed: 0,
          in_progress: 0,
          pending: 0,
        };

        res.data.forEach((task) => {
          if (counts[task.status] !== undefined) {
            counts[task.status]++;
          }
        });

        const formatted = [
          { name: "Completed", value: counts.completed },
          { name: "In Progress", value: counts.in_progress },
          { name: "Pending", value: counts.pending },
        ];

        setData(formatted);
      } catch (err) {
        console.error("Error loading task chart:", err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-md text-black">
      <h2 className="text-xl font-semibold mb-4">🧩 Task Completion Status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ color: "#ccc", fontSize: "14px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskPieChart;
