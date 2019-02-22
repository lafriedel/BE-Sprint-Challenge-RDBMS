exports.seed = function(knex, Promise) {
  return knex("projects")
    .truncate()
    .then(function() {
      return knex("projects").insert([
        {
          id: 1,
          name: "Build portfolio website",
          description: "Refresh website for job search",
          completed: 0
        },
        {
          id: 2,
          name: "Create resume",
          description: "Build entirely new one for career change",
          completed: 0
        },
        { id: 3, name: "Make coding projects", description: "", completed: 0 }
      ]);
    });
};
