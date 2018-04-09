exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ingredients', (table) => {
      table.increments('id').primary;
      table.string('category');
      table.string('duration');
      table.string('effect');
      table.string('hearts');
      table.string('name');
      table.string('resale');
      table.string('type');

      table.timestamps(true, true);
    }),
    knex.schema.createTable('recipes', (table) => {
      table.increments('id').primary;
      table.string('category');
      table.string('hearts');
      table.string('name');
      table.text('notes');
      table.string('resale');
      table.string('type');
      table.string('duration');
      table.string('strength');
      table.integer('ingredient1');
      table.foreign('ingredient1').references('ingredients.id');
      table.integer('ingredient2');
      table.foreign('ingredient2').references('ingredients.id');
      table.integer('ingredient3');
      table.foreign('ingredient3').references('ingredients.id');
      table.integer('ingredient4');
      table.foreign('ingredient4').references('ingredients.id');
      table.integer('ingredient5');
      table.foreign('ingredient5').references('ingredients.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary;
      table.string('userName');
      table.string('password');
      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('recipes'),
    knex.schema.dropTable('ingredients'),
  ]);
};
