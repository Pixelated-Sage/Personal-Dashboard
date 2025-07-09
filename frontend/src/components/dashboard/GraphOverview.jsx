import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const SkillChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://localhost:8000/skills/");
        const counts = {
          "Not Started": 0,
          "In Progress": 0,
          Completed: 0,
          "On Hold": 0,
          Cancelled: 0,
        };

        res.data.forEach((skill) => {
          const label = skill.status.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase());
          counts[label] += 1;
        });

        const formattedData = Object.entries(counts).map(([status, count]) => ({
          status,
          count,
        }));

        setData(formattedData);
      } catch (err) {
        console.error("Error loading skill chart:", err);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-md text-black">
      <h2 className="text-xl font-semibold mb-4">📊 Skill Status Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="status" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="count" fill="#06b6d4" barSize={40} radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillChart;
