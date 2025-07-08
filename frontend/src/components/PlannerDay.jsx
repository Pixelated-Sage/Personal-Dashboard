import React from "react";

const PlannerDay = ({ plan }) => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow mb-3">
      <h3 className="text-lg font-semibold text-white">{plan.Date}</h3>
      <p className="text-gray-300 mt-2">{plan.Text}</p>
    </div>
  );
};

export default PlannerDay;
