import React from "react";

const PlannerDay = ({ plan }) => {
  return (
    <div className="bg-gray-800/80 p-4 rounded-xl shadow border border-cyan-900/20">
      <h3 className="text-lg font-semibold text-cyan-100">{plan.Date}</h3>
      <p className="text-cyan-300 mt-2">{plan.Text}</p>
    </div>
  );
};

export default PlannerDay;
