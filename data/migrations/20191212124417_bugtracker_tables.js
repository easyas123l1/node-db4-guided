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
    })
    .createTable("tickets", tbl => {
      tbl.increments();

      tbl.string("description", 255).notNullable();
    })
    .createTable("employee_tickets", tbl => {
      tbl.primary(["ticket_id", "employee_id"]);

      tbl
        .integer("ticket_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tickets")
        .onDelete("CASCADE") // CASCADE, RESTRICT, DO NOTHING, SET NULL
        .onUpdate("CASCADE");

      tbl
        .integer("employee_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("employees")
        .onDelete("CASCADE") // CASCADE, RESTRICT, DO NOTHING, SET NULL
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {};
