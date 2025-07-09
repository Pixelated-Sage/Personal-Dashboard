// src/components/forms/TaskForm.jsx

import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ onSuccess }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    date: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/tasks/", task);
      onSuccess && onSuccess(); // Callback for refresh
      setTask({ title: "", description: "", date: "", status: "pending" });
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold">Add New Task</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="date"
        name="date"
        value={task.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

      <button
        type="submit"
        className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
      >
        Save Task
      </button>
    </form>
  );
};

export default TaskForm;
