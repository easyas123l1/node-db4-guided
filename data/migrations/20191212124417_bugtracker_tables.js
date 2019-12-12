exports.up = function(knex) {
  return knex.schema
    .createTable("roles", tbl => {
      tbl.increments();

      tbl
        .string("name", 255)
        .notNullable()
        .unique();
    })
    .createTable("employees", tbl => {
      tbl.increments();

      tbl
        .string("name", 255)
        .notNullable()
        .unique();

      // foreign key  always use unsigned for foreign keys
      tbl
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("roles")
        .onDelete("CASCADE") // CASCADE, RESTRICT, DO NOTHING, SET NULL
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {};
