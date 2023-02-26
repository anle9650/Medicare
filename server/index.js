const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const taskRoutes = require('./routes/tasks')
app.use('/api', taskRoutes)

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
 
app.listen(port, async () => {
  await mongoose.connect(process.env.ATLAS_URI);
  console.log(`Server is running on port: ${port}`);
});