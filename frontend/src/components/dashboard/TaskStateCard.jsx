import React, { useEffect, useState } from "react";
import axios from "axios";

const StatBox = ({ label, value }) => (
  <div className="flex flex-col items-center justify-center w-full py-4 px-2 rounded-xl bg-white/20 border border-white/30 text-gray-800 shadow-md">
    <span className="text-sm font-medium tracking-wide text-gray-600">{label}</span>
    <span className="text-3xl md:text-4xl font-bold text-cyan-600 mt-1">{value}</span>
  </div>
);

const TaskStatsCard = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectRes, taskRes] = await Promise.all([
          axios.get("http://localhost:8000/projects/"),
          axios.get("http://localhost:8000/tasks/")
        ]);

        setProjectCount(projectRes.data.length || 0);
        setTaskCount(taskRes.data.length || 0);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="h-full bg-white/80 border border-gray-300 rounded-2xl shadow-lg p-4 flex flex-col justify-around gap-6">
      <StatBox label="Total Projects" value={projectCount} />
      <StatBox label="Total Tasks" value={taskCount} />
    </div>
  );
};

export default TaskStatsCard;
