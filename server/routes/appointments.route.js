const express = require("express");
const appointmentRoutes = express.Router();
const { Appointment } = require("../models/appointment.model");

appointmentRoutes.route("/").get(async (req, res) => {
  const allAppointments = await Appointment.find().populate("patient");
  return res.status(200).json(allAppointments);
});

appointmentRoutes.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  return res.status(200).json(appointment);
});

appointmentRoutes.route("/").post(async (req, res) => {
  const newAppointment = new Appointment({ ...req.body });
  const insertedAppointment = await newAppointment.save();
  return res.status(201).json(insertedAppointment);
});

appointmentRoutes.route("/:id").put(async (req, res) => {
  const { id } = req.params;
  const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, {new: true});
  return res.status(200).json(updatedAppointment);
});

appointmentRoutes.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  const deletedAppointment = await Appointment.findByIdAndDelete(id);
  return res.status(200).json(deletedAppointment);
});

module.exports = appointmentRoutes;
