const express = require("express");
const helmet = require("helmet");
const server = express();

const projectRouter = require("./routes/projectRoutes");
const actionRouter = require("./routes/actionRoutes");

server.use(helmet());
server.use(express.json());

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.status(200).send("Welcome to the Getting Things Done API.");
});

server.listen(8000, (req, res) => {
  console.log("Server listening on port 8000");
});
