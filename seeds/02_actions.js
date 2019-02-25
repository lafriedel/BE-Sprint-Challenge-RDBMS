exports.seed = function(knex, Promise) {
  return knex("actions")
    .truncate()
    .then(function() {
      return knex("actions").insert([
        {
          id: 1,
          action_name: "Make lo-fi wireframes",
          notes: "Pencil sketches, then move to Sketch",
          completed: 0,
          project_id: 1
        },
        {
          id: 2,
          action_name: "Do Gatsby.js tutorial",
          notes:
            "Planning to move from Squarespace to Gatsby, need to understand how it works",
          completed: 0,
          project_id: 1
        },
        {
          id: 3,
          action_name: "Write site content",
          notes: "Need bio, project descriptions, and contact information",
          completed: 0,
          project_id: 1
        },
        {
          id: 4,
          action_name: "Pick Creddle template",
          notes: "",
          completed: 0,
          project_id: 2
        },
        {
          id: 5,
          action_name: "Write up new content",
          notes: "Use Grammarly to check writing",
          completed: 0,
          project_id: 2
        },
        {
          id: 6,
          action_name: "Make React Native app",
          notes: "Try using Flutter",
          completed: 0,
          project_id: 3
        }
      ]);
    });
};
