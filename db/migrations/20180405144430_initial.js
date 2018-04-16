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
      table.string('image');
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
      table.string('ingredient1');
      table.string('ingredient2');
      table.string('ingredient3');
      table.string('ingredient4');
      table.string('ingredient5');
      table.string('image');
      table.string('type_image');
      table.string('ingredient1_image');
      table.string('ingredient2_image');
      table.string('ingredient3_image');
      table.string('ingredient4_image');
      table.string('ingredient5_image');
      table.integer('ingredient1_id');
      table.foreign('ingredient1_id').references('ingredients.id');
      table.integer('ingredient2_id');
      table.foreign('ingredient2_id').references('ingredients.id');
      table.integer('ingredient3_id');
      table.foreign('ingredient3_id').references('ingredients.id');
      table.integer('ingredient4_id');
      table.foreign('ingredient4_id').references('ingredients.id');
      table.integer('ingredient5_id');
      table.foreign('ingredient5_id').references('ingredients.id');
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
