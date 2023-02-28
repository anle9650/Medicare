const express = require('express');
const taskRoutes = require('./tasks');
const patientRoutes = require('./patients');

const apiRouter = express.Router();
apiRouter.use('/tasks', taskRoutes);
apiRouter.use('/patients', patientRoutes);

module.exports = apiRouter;
