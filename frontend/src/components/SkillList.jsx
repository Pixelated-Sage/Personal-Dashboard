import React, { useEffect, useState } from "react";
import { getSkills, deleteSkill } from "../services/api";

const SkillList = () => {
  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    try {
      const res = await getSkills();
      setSkills(res.data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSkill(id);
      fetchSkills(); // refresh after delete
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] p-6 rounded-2xl shadow-lg max-w-2xl mx-auto border border-cyan-900/30 mt-4">
      <h2 className="text-2xl font-bold text-cyan-300 tracking-wide mb-4">Skills</h2>
      <ul className="space-y-3">
        {skills.map(skill => (
          <li
            key={skill.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-800/80 p-4 rounded-xl shadow border border-cyan-900/20"
          >
            <div>
              <h3 className="text-lg text-cyan-100 font-medium">{skill.name}</h3>
              <p className="text-sm text-cyan-400">
                {skill.Category} <span className="mx-2">•</span>
                <span className="uppercase tracking-wider">{skill.Status}</span>
              </p>
            </div>
            <button
              onClick={() => handleDelete(skill.id)}
              className="text-red-400 hover:text-red-600 mt-2 md:mt-0 font-semibold transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillList;
