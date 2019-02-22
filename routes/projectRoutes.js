const express = require("express");
const router = express.Router();

const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

// POST to /api/projects
router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send("You must submit a project name.");
  }

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

// GET to /api/projects
router.get("/", (req, res) => {
  db("projects")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).send("There was an error retrieving the data.");
    });
});

// GET to /api/projects/:id
router.get("/:id", (req, res) => {
  db("projects")
    .where("id", req.params.id)
    .first()
    .then(projectRes => {
      if (!projectRes) {
        res
          .status(404)
          .json({
            error: `A project with ID ${req.params.id} does not exist.`
          });
      } else {
        const { id, name, description, completed } = projectRes;

        db("actions")
          .select("id", "action_name as description", "notes", "completed")
          .where("project_id", projectRes.id)
          .then(actionsRes => {
            res
              .status(200)
              .json({ id, name, description, completed, actions: actionsRes });
          });
      }
    })
    .catch(err => {
      res.status(500).send("There was an error retrieving the data.");
    });
});

// PUT to /api/projects/:id

router.put("/:id", (req, res) => {
  db("projects")
    .where("id", req.params.id)
    .update(req.body)
    .then(count => {
      if (count === 0) {
        res.status(404).json({
          error: `A project with ID ${req.params.id} does not exist.`
        });
      } else {
        db("projects")
          .where("id", req.params.id)
          .first()
          .then(project => {
            res.status(200).json(project);
          });
      }
    })
    .catch(err => {
      res.status(500).send("There was an error updating the project.");
    });
});

// DELETE to /api/projects/:id

module.exports = router;
