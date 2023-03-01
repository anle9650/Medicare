const express = require('express');
const taskRoutes = require('./tasks');
const patientRoutes = require('./patients');
const appointmentRoutes = require('./appointments');

const apiRouter = express.Router();
apiRouter.use('/tasks', taskRoutes);
apiRouter.use('/patients', patientRoutes);
apiRouter.use('/appointments', appointmentRoutes);

module.exports = apiRouter;
