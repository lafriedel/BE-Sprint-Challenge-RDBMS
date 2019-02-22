const express = require("express");
const router = express.Router();

const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

// POST to /api/actions
router.post("/", (req, res) => {
  const { action_name, project_id } = req.body;

  if (!action_name || !project_id) {
    return res
      .status(400)
      .send("You must submit an action name and project ID.");
  }

  db("actions")
    .insert(req.body)
    .then(actionid => {
      const [id] = actionid;
      res.status(201).json({ id: id });
    })
    .catch(err => {
      res.status(500).send("There was an error adding the action.");
    });
});

// GET /api/actions
router.get("/", (req, res) => {
  db("actions")
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).send("There was an error retrieving the data.");
    });
});

// GET /api/actions/:id

router.get("/:id", (req, res) => {
  db("actions")
    .where("id", req.params.id)
    .first()
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res
          .status(404)
          .json({
            error: `An action with ID ${req.params.id} does not exist.`
          });
      }
    })
    .catch(err => {
      res.status(500).send("There was an error retrieving the data.");
    });
});

// PUT /api/actions/:id

// DELETE /api/actions/:id

module.exports = router;
