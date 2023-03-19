const express = require('express');
const taskRoutes = require('./tasks.route');
const patientRoutes = require('./patients.route');
const appointmentRoutes = require('./appointments.route');
const messageRoutes = require('./messages.route');

const apiRouter = express.Router();
apiRouter.use('/tasks', taskRoutes);
apiRouter.use('/patients', patientRoutes);
apiRouter.use('/appointments', appointmentRoutes);
apiRouter.use('/messages', messageRoutes);

module.exports = apiRouter;
