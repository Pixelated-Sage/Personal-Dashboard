import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const SkillModal = ({ skill, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white/90 backdrop-blur-xl border border-white/30 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-xl relative text-gray-800"
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-gray-600 hover:text-red-500 text-xl font-bold"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold">{skill.name}</h2>
          <p className="text-sm text-gray-600 mb-2">{skill.category}</p>
          <p className="text-gray-700 mb-4">{skill.description || "No description."}</p>

          <div className="text-sm text-gray-600">
            <strong>Status:</strong> {skill.status.replace("_", " ").toUpperCase()} <br />
            <strong>Added On:</strong> {skill.added_on}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SkillModal;
