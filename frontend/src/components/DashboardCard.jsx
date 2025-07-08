import React from "react";

const DashboardCard = ({ title, count }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow text-center">
      <h3 className="text-lg text-gray-400">{title}</h3>
      <p className="text-3xl font-bold text-white">{count}</p>
    </div>
  );
};

export default DashboardCard;
