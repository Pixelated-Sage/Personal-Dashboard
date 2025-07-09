import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const TaskModal = ({ task, onClose }) => {
  const isAll = task === "all";

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white/90 border border-gray-200 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-2xl relative"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-gray-500 hover:text-red-500 text-2xl font-bold focus:outline-none"
          >
            &times;
          </button>

          {isAll ? (
            <div className="text-gray-800 space-y-2">
              <h2 className="text-xl font-semibold">All Tasks View</h2>
              <p className="text-sm text-gray-600">Feature coming soon.</p>
            </div>
          ) : (
            <div className="space-y-4 text-gray-800">
              <h2 className="text-2xl font-bold">{task.title}</h2>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Date:</strong> {task.date}
                </p>
                <p>
                  <strong>Status:</strong> {task.status.replace("_", " ")}
                </p>
              </div>
              <div className="text-gray-700">
                {task.description || "No description available."}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskModal;
