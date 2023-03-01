const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patient: {
    type: ObjectId,
    ref: 'Patient',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  scheduledStart: {
    type: String,
    required: true,
  },
  scheduledEnd: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = { Appointment };
