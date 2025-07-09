import React, { useState } from "react";
import { addSkill } from "../services/api";

const SkillForm = ({ onSkillAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    Category: "",
    description: "",
    Status: "Not Started",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSkill(formData);
      setFormData({ name: "", Category: "", description: "", Status: "Not Started" });
      onSkillAdded(); // refresh list
    } catch (err) {
      console.error("Error adding skill:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Skill Name"
        value={formData.name}
        onChange={handleChange}
        className="input w-full bg-[#0f172a] border border-cyan-900/30 text-cyan-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <input
        name="Category"
        placeholder="Category"
        value={formData.Category}
        onChange={handleChange}
        className="input w-full bg-[#0f172a] border border-cyan-900/30 text-cyan-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="input w-full bg-[#0f172a] border border-cyan-900/30 text-cyan-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        rows={3}
      />
      <select
        name="Status"
        value={formData.Status}
        onChange={handleChange}
        className="input w-full bg-[#0f172a] border border-cyan-900/30 text-cyan-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      >
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="On Hold">On Hold</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <button
        type="submit"
        className="bg-cyan-900/60 hover:bg-cyan-700/80 text-cyan-200 px-4 py-2 rounded-lg shadow transition-all duration-200 text-sm font-semibold border border-cyan-800 w-full"
      >
        Add Skill
      </button>
    </form>
  );
};

export default SkillForm;
