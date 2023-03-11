const express = require('express');
const taskRoutes = require('./tasks');
const patientRoutes = require('./patients');
const appointmentRoutes = require('./appointments');
const messageRoutes = require('./messages');

const apiRouter = express.Router();
apiRouter.use('/tasks', taskRoutes);
apiRouter.use('/patients', patientRoutes);
apiRouter.use('/appointments', appointmentRoutes);
apiRouter.use('/messages', messageRoutes);

module.exports = apiRouter;
