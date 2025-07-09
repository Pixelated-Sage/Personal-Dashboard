import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
// import "react-calendar-heatmap/dist/react-calendar-heatmap.css"; // Can cause error
import "../../styles/heatmap.css"; // Custom override
import axios from "axios";

const HeatmapCalendar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/tasks/");
        const taskCounts = {};

        res.data.forEach((task) => {
          taskCounts[task.date] = (taskCounts[task.date] || 0) + 1;
        });

        const formatted = Object.entries(taskCounts).map(([date, count]) => ({
          date,
          count,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error loading heatmap data:", err);
      }
    };

    fetchTasks();
  }, []);

  const getClassForValue = (value) => {
    if (!value) return "color-empty";
    if (value.count >= 5) return "color-github-4";
    if (value.count >= 3) return "color-github-3";
    if (value.count >= 2) return "color-github-2";
    return "color-github-1";
  };

  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - 3);

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-white mb-4">🔥 Activity Streak</h2>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={data}
        classForValue={getClassForValue}
        showWeekdayLabels
      />
    </div>
  );
};

export default HeatmapCalendar;
