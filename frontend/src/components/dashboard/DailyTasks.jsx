import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import TaskModal from "./TaskModal";
import TaskForm from "../forms/Taskform";

const statusColor = {
  pending: "bg-yellow-500",
  in_progress: "bg-blue-500",
  completed: "bg-green-500",
};

const DailyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("all");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/tasks/");
      const sortedTasks = res.data.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        const p1 = priorityOrder[a.priority] ?? 3;
        const p2 = priorityOrder[b.priority] ?? 3;
        if (p1 === p2) {
          return new Date(a.date) - new Date(b.date);
        }
        return p1 - p2;
      });
      setTasks(sortedTasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getStatusColor = (status) => {
    return statusColor[status] || "bg-gray-400";
  };

  const getPriorityColor = (priority) => {
    if (priority === "high") return "border-red-500";
    if (priority === "medium") return "border-yellow-500";
    return "border-green-500";
  };

  const filteredTasks =
    priorityFilter === "all"
      ? tasks
      : tasks.filter((task) => task.priority === priorityFilter);

  return (
    <motion.div className="lg:col-span-1">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">✅</span>
        Daily Tasks
      </h2>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Task List Container */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-2xl p-4">
        <div className="max-h-[450px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 text-sm">No tasks found.</p>
          ) : (
            filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                className={`p-4 rounded-xl bg-white border-l-4 ${getPriorityColor(
                  task.priority
                )} hover:bg-gray-100 transition-all duration-200 cursor-pointer group`}
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedTask(task)}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`w-3 h-3 mt-1 rounded-full ${getStatusColor(
                        task.status
                      )}`}
                    ></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {task.description || "No description"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(task.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        task.priority === "high"
                          ? "bg-red-500/10 text-red-600"
                          : task.priority === "medium"
                          ? "bg-yellow-500/10 text-yellow-600"
                          : "bg-green-500/10 text-green-600"
                      }`}
                    >
                      {task.priority || "low"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Add Task Button */}
        <motion.button
          className="w-full mt-4 p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowTaskForm(true)}
        >
          + Add New Task
        </motion.button>
      </div>

      {/* Task Form Modal */}
      <AnimatePresence>
        {showTaskForm && (
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
              <button
                onClick={() => setShowTaskForm(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold focus:outline-none"
              >
                &times;
              </button>
              <TaskForm
                onSuccess={fetchTasks}
                onClose={() => setShowTaskForm(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Details Modal */}
      <AnimatePresence>
        {selectedTask && (
          <TaskModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DailyTasks;
