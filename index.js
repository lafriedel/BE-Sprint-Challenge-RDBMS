const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile");

const server = express();
const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("Welcome to the Getting Things Done API.");
});

// POST to /api/projects
server.post("/api/projects", (req, res) => {
  db("projects")
    .insert(req.body)
    .then(projid => {
      const [id] = projid;
      res.status(201).json({ id: id });
    })
    .catch(err => {
      res.status(500).send("There was an error adding the project.");
    });
});

// POST to /api/actions
server.post("/api/actions", (req, res) => {
  db("actions")
    .insert(req.body)
    .then(actionid => {
      const [id] = actionid;
      res.status(201).json({ id: id });
    })
    .catch(err => {
      res.status(500).send("There was an error adding the project.");
    });
});

// GET to /api/project/id
server.get("/api/projects/:id", (req, res) => {
  db("projects")
    .where("id", req.params.id)
    .first()
    .then(projectRes => {
        const {id, name, description, completed } = projectRes;
        
      db("actions")
        .select("id", "action_name as description", "notes", "completed")
        .where("project_id", projectRes.id)
        .then(actionsRes => {
          res.status(200).json({ id, name, description, completed, actions: actionsRes });
        })
    })
    .catch(err => {
      res.status(500).send("There was an error retrieving the data.");
    });
});

server.listen(8000, (req, res) => {
  console.log("Server listening on port 8000");
});
