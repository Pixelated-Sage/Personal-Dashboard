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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Weekly Planner</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="date"
          name="Date"
          value={formData.Date}
          onChange={handleChange}
          className="input w-full"
          required
        />
        <textarea
          name="Text"
          value={formData.Text}
          onChange={handleChange}
          className="input w-full"
          placeholder="What are you planning to do?"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Plan
        </button>
      </form>

      {/* List */}
      <div className="space-y-4">
        {plans.map(plan => (
          <PlannerDay key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default PlannerPage;
