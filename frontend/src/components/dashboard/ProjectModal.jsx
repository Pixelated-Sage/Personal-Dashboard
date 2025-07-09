import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white/80 text-gray-800 max-w-xl w-full mx-4 p-6 rounded-2xl shadow-xl relative"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-lg font-bold"
          >
            ✕
          </button>
          <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="flex justify-between items-center mt-6">
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {project.status}
            </p>
            <p>
              <span className="font-semibold">Progress:</span>{" "}
              {project.percent}%
            </p>
          </div>
          <div className="h-3 w-full mt-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500"
              style={{ width: `${project.percent}%` }}
            ></div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
