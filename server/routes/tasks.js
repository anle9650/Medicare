const express = require("express");
const taskRoutes = express.Router();
const { Task } = require("../models/task");

taskRoutes.route("/").get(async (req, res) => {
  const allTasks = await Task.find();
  return res.status(200).json(allTasks);
});

taskRoutes.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  return res.status(200).json(task);
});

taskRoutes.route("/").post(async (req, res) => {
  const newTask = new Task({ ...req.body });
  const insertedTask = await newTask.save();
  return res.status(201).json(insertedTask);
});

taskRoutes.route("/:id").put(async (req, res) => {
  const { id } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(id, req.body);
  return res.status(200).json(updatedTask);
});

taskRoutes.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  const deletedTask = await Task.findByIdAndDelete(id);
  return res.status(200).json(deletedTask);
});

module.exports = taskRoutes;
