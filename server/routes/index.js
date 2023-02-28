const express = require('express');
const taskRoutes = require('./tasks');

const apiRouter = express.Router();
apiRouter.use('/tasks', taskRoutes);

module.exports = apiRouter;
