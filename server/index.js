const express = require("express");
const cors = require("cors");
const path = require("path");
const apiRoutes = require("./routes");
const mongoose = require("mongoose");

if (process.env.ENVIRONMENT !== "production") {
  require("dotenv").config({ path: "./config.env" });
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/dist")));
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

const port = process.env.PORT || 8000;

module.exports = app.listen(port, async () => {
  await mongoose.connect(process.env.ATLAS_URI);
  console.log(`Server is running on port: ${port}`);
});
