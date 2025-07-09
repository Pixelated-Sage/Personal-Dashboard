import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#f44336"];

const ChartSection = ({ skills }) => {
  const data = skills.reduce((acc, skill) => {
    const found = acc.find(d => d.name === skill.Status);
    if (found) found.value++;
    else acc.push({ name: skill.Status, value: 1 });
    return acc;
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] p-6 rounded-2xl shadow-lg border border-cyan-900/30 mt-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-cyan-300">Skill Status Overview</h3>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          cx={150}
          cy={120}
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ChartSection;
