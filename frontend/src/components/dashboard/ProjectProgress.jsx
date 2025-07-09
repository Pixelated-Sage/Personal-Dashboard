import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// 🟩 Project Form Component
const ProjectForm = ({ onSuccess, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    technologies: "",
    link: "",
    status: "ongoing",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/projects/", form);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-black mb-2">Add New Project</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Project Name"
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Project Description"
        className="w-full p-2 border rounded"
      />

      <input
        name="technologies"
        value={form.technologies}
        onChange={handleChange}
        placeholder="Technologies Used"
        className="w-full p-2 border rounded"
      />

      <input
        name="link"
        value={form.link}
        onChange={handleChange}
        placeholder="Project Link (Optional)"
        className="w-full p-2 border rounded"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
        <option value="paused">Paused</option>
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

// 🟦 ProjectProgress Main Component
const ProjectProgress = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8000/projects/");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-black">Project Progress</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gray-300 rounded-xl p-4 text-black shadow-md"
          >
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{project.technologies}</p>
            <p className="text-sm text-gray-700 mb-2">{project.description}</p>
            <p className="text-sm text-blue-600">
              {project.status.toUpperCase()}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-cyan-500 hover:underline mt-1 block"
              >
                Visit Project →
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {/* 🔶 Modal for Add Project */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
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
              <ProjectForm onSuccess={fetchProjects} onClose={() => setShowForm(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectProgress;
