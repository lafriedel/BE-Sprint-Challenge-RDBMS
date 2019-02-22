
exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", function(table) {
      table.increments();
      table.string("name", 128).notNullable().unique();
      table.text("description");
      table.integer("completed");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects");
};
