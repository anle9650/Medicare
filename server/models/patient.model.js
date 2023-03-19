const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
  },
  status: {
    type: String,
  },
  photo: {
    type: String,
  },
  appointments: {
    type: Array,
    default: [],
  },
});

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = { Patient };
