import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const getProgress = (status) => {
  switch (status) {
    case "completed": return 100;
    case "in_progress": return 50;
    case "on_hold": return 25;
    case "cancelled": return 10;
    default: return 0;
  }
};

// 🟩 Skill Form Modal
const SkillForm = ({ onSuccess, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    status: "not_started",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/skills/", form);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error adding skill:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-black mb-2">Add New Skill</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Skill Name"
        required
        className="w-full p-2 border rounded"
      />

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description (optional)"
        className="w-full p-2 border rounded"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="not_started">Not Started</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="on_hold">On Hold</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-black rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

// ✅ Main SkillProgress Component
const SkillProgress = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showSkillForm, setShowSkillForm] = useState(false);

  const fetchSkills = async () => {
    try {
      const res = await axios.get("http://localhost:8000/skills/");
      setSkills(res.data);
    } catch (err) {
      console.error("Failed to fetch skills:", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-black">Skill Progress</h2>
        <button
          onClick={() => setShowSkillForm(true)}
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gray-300 rounded-xl p-4 text-black shadow-md relative"
          >
            <h3 className="text-lg font-semibold">{skill.name}</h3>
            <p className="text-sm text-gray-600">{skill.category}</p>

            <div className="mt-4">
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className="h-3 bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${getProgress(skill.status)}%` }}
                />
              </div>
              <p className="text-sm mt-1 text-blue-600">
                {skill.status.replace("_", " ").toUpperCase()}
              </p>
            </div>

            <button
              onClick={() => setSelectedSkill(skill)}
              className="absolute top-4 right-4 text-sm text-blue-600 hover:underline"
            >
              View
            </button>
          </motion.div>
        ))}
      </div>

      {/* 🔹 Modal for Add Skill */}
      <AnimatePresence>
        {showSkillForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white max-w-lg w-full rounded-xl shadow-lg p-6 relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <SkillForm onSuccess={fetchSkills} onClose={() => setShowSkillForm(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillProgress;
