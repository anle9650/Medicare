const express = require("express");
const patientRoutes = express.Router();
const { Patient } = require("../models/patient");

patientRoutes.route("/").get(async (req, res) => {
  const allPatients = await Patient.find();
  return res.status(200).json(allPatients);
});

patientRoutes.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);
  return res.status(200).json(patient);
});

patientRoutes.route("/").post(async (req, res) => {
  const newPatient = new Patient({ ...req.body });
  const insertedPatient = await newPatient.save();
  return res.status(201).json(insertedPatient);
});

patientRoutes.route("/:id").put(async (req, res) => {
  const { id } = req.params;
  const updatedPatient = await Patient.findByIdAndUpdate(id, req.body);
  return res.status(200).json(updatedPatient);
});

patientRoutes.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  const deletedPatient = await Patient.findByIdAndDelete(id);
  return res.status(200).json(deletedPatient);
});

module.exports = patientRoutes;