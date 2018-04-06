exports.seed = (knex, Promise) => {
  return knex('recipes')
  .del()
  .then(() => knex('ingredients').del())
  .then(() => {
    return Promise.all([
      knex('ingredients')
      .insert([
        {
          "category": "food",
          "duration": "0:30",
          "effect": null,
          "hearts": "0.5",
          "name": "Apple",
          "resale": "3",
          "type": "Fruit"
        },
        {
          "category": "food",
          "duration": "1:00",
          "effect": null,
          "hearts": "1",
          "name": "Tabantha Wheat",
          "resale": "3",
          "type": "Seasoning"
        },
        {
          "category": "food",
          "duration": "1:20",
          "effect": null,
          "hearts": "0",
          "name": "Cane Sugar",
          "resale": "3",
          "type": "Seasoning"
        },
        {
          "category": "food",
          "duration": "1:20",
          "effect": null,
          "hearts": "0",
          "name": "Goat Butter",
          "resale": "3",
          "type": "Seasoning"
        }], 'id')
      .then(ingredient => {
        return knex('recipes')
        .insert([
          {
            "category": "recipe",
            "hearts": "3",
            "ingredient1": ingredient[0],
            "ingredient2": ingredient[1],
            "ingredient3": ingredient[2],
            "ingredient4": ingredient[3],
            "ingredient5": null,
            "name": "Apple Pie",
            "notes": "Tabantha Wheat, Cane Sugar & Goat Butter obtainable in Rito Village.",
            "resale": "30",
            "type": "Restore Hearts"
          },
          {
            "category": "recipe",
            "hearts": "¾",
            "ingredient1": ingredient[0],
            "ingredient2": null,
            "ingredient3": null,
            "ingredient4": null,
            "ingredient5": null,
            "name": "Baked Apple",
            "notes": "Open flame.",
            "resale": "0",
            "type": "Restore Hearts"
          }
        ])
      }) 
    ])
  })
};
