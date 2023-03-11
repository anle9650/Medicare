const express = require("express");
const messageRoutes = express.Router();
const { Message } = require("../models/message");
const { Patient } = require("../models/patient");

messageRoutes.route("/threads").get(async (req, res) => {
  const threads = [];
  const allMessages = await Message.find();

  for (message of allMessages) {
    const existingThread = threads.find(
      (thread) => thread.patient._id.equals(message.patientId)
    );

    if (existingThread) {
      existingThread.messages.push(message);
      continue;
    }

    const patient = await Patient.findById(message.patientId);

    const newThread = {
      patient,
      messages: [message],
    };

    threads.push(newThread);
  }

  return res.status(200).json(threads);
});

messageRoutes.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  return res.status(200).json(message);
});

messageRoutes.route("/").post(async (req, res) => {
  const newMessage = new Message({ ...req.body });
  const insertedMessage = await newMessage.save();
  return res.status(201).json(insertedMessage);
});

messageRoutes.route("/:id").put(async (req, res) => {
  const { id } = req.params;
  const updatedMessage = await Message.findByIdAndUpdate(id, req.body);
  return res.status(200).json(updatedMessage);
});

messageRoutes.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  const deletedMessage = await Message.findByIdAndDelete(id);
  return res.status(200).json(deletedMessage);
});

module.exports = messageRoutes;
