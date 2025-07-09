import React, { useEffect, useState } from "react";
import { getPlans, addPlan } from "../services/api";
import PlannerDay from "../components/PlannerDay";

const PlannerPage = () => {
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({
    Date: "",
    Text: "",
  });

  const fetchPlans = async () => {
    try {
      const res = await getPlans();
      setPlans(res.data);
    } catch (err) {
      console.error("Error fetching plans:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPlan(formData);
      setFormData({ Date: "", Text: "" });
      fetchPlans();
    } catch (err) {
      console.error("Error adding plan:", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a192f] p-6 space-y-8">
      <h1 className="text-3xl font-extrabold text-cyan-400 tracking-tight drop-shadow-lg mb-6">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Weekly Planner
        </span>
      </h1>

      {/* Form */}
      <div className="bg-gradient-to-tr from-[#1e293b] to-[#0f172a] rounded-2xl shadow-xl p-6 max-w-xl mx-auto mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
            className="input w-full bg-[#0f172a] border border-cyan-900/30 text-cyan-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <textarea
            name="Text"
            value={formData.Text}
            onChange={handleChange}
            className="input w-full bg-[#0f172a] border border-cyan-900/30 text-cyan-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="What are you planning to do?"
            required
          />
          <button
            type="submit"
            className="bg-cyan-900/60 hover:bg-cyan-700/80 text-cyan-200 px-4 py-2 rounded-lg shadow transition-all duration-200 text-sm font-semibold border border-cyan-800 w-full"
          >
            Add Plan
          </button>
        </form>
      </div>

      {/* List */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] p-6 rounded-2xl shadow-lg max-w-2xl mx-auto border border-cyan-900/30 space-y-4">
        {plans.map(plan => (
          <PlannerDay key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default PlannerPage;
