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
      <input name="name" placeholder="Skill Name" value={formData.name} onChange={handleChange} className="input" />
      <input name="Category" placeholder="Category" value={formData.Category} onChange={handleChange} className="input" />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="input" />
      <select name="Status" value={formData.Status} onChange={handleChange} className="input">
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="On Hold">On Hold</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Skill</button>
    </form>
  );
};

export default SkillForm;
