const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  patientId: {
    type: ObjectId,
    ref: 'Patient',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = { Message };