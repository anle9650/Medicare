const path = require("path");
const webpack = require("webpack");

const environment = process.env.ENVIRONMENT;

console.log("environment:::::", environment);

let ENVIRONMENT_VARIABLES = {
  "process.env.ENVIRONMENT": JSON.stringify("development"),
  "process.env.PORT": JSON.stringify("8000"),
  "process.env.ATLAS_URI": JSON.stringify(
    "mongodb+srv://andyle:IBzFfmnKDcF8bMiX@cluster0.4odamsg.mongodb.net/medicare?retryWrites=true&w=majority"
  ),
};

if (environment === "test") {
  ENVIRONMENT_VARIABLES = {
    "process.env.ENVIRONMENT": JSON.stringify("test"),
    "process.env.PORT": JSON.stringify("8000"),
    "process.env.ATLAS_URI": JSON.stringify(
      "mongodb+srv://andyle:IBzFfmnKDcF8bMiX@cluster0.4odamsg.mongodb.net/medicare?retryWrites=true&w=majority"
    ),
  };
} else if (environment === "production") {
  ENVIRONMENT_VARIABLES = {
    "process.env.ENVIRONMENT": JSON.stringify("production"),
    "process.env.PORT": JSON.stringify("80"),
    "process.env.ATLAS_URI": JSON.stringify(
      "mongodb+srv://andyle:IBzFfmnKDcF8bMiX@cluster0.4odamsg.mongodb.net/medicare?retryWrites=true&w=majority"
    ),
  };
}

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.bundle.js",
  },
  target: "node",
  plugins: [new webpack.DefinePlugin(ENVIRONMENT_VARIABLES)],
};
