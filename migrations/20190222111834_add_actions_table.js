exports.up = function(knex, Promise) {
  return knex.schema.createTable("actions", function(table) {
    table.increments();
    table.string("action_name", 255).notNullable();
    table.text("notes");
    table.integer("completed");
    table
      .integer("project_id")
      .unsigned()
      .references("id")
      .inTable("projects")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("actions");
};
