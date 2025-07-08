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
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Skills</h2>
      <ul className="space-y-2">
        {skills.map(skill => (
          <li key={skill.id} className="bg-gray-800 p-3 rounded flex justify-between items-center">
            <div>
              <h3 className="text-lg">{skill.name}</h3>
              <p className="text-sm text-gray-400">{skill.Category} – {skill.Status}</p>
            </div>
            <button onClick={() => handleDelete(skill.id)} className="text-red-400 hover:text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillList;
