exports.seed = (knex, Promise) => {
  return knex('recipes')
    .del()
    .then(() => knex('ingredients').del())
    .then(() =>
      Promise.all([
        knex('ingredients')
          .insert(
            [
              {
                category: 'food',
                duration: '0:30',
                effect: null,
                hearts: '0.5',
                name: 'Apple',
                resale: '3',
                type: 'Fruit',
                image: 'www.applepics.com'
              },
              {
                category: 'food',
                duration: '1:00',
                effect: null,
                hearts: '1',
                name: 'Tabantha Wheat',
                resale: '3',
                type: 'Seasoning',
                image: 'www.wheat.com'
              },
              {
                category: 'food',
                duration: '1:20',
                effect: null,
                hearts: '0',
                name: 'Cane Sugar',
                resale: '3',
                type: 'Seasoning',
                image: 'www.sugar.com'
              },
              {
                category: 'food',
                duration: '1:20',
                effect: null,
                hearts: '0',
                name: 'Goat Butter',
                resale: '3',
                type: 'Seasoning',
                image: null
              }
            ],
            'id'
          )
          .then(ingredient =>
            knex('recipes').insert([
              {
                category: 'recipe',
                hearts: '3',
                ingredient1: 'Apple',
                ingredient2: 'Tabantha Wheat',
                ingredient3: 'Cane Sugar',
                ingredient4: 'Goat Butter',
                ingredient5: null,
                image: 'www.image.com',
                type_image: 'https://type_image',
                ingredient1_image: 'https://image-link1',
                ingredient2_image: 'https://image-link2',
                ingredient3_image: 'https://image-link3',
                ingredient4_image: 'https://image-link4',
                ingredient5_image: null,
                ingredient1_id: ingredient[0],
                ingredient2_id: ingredient[1],
                ingredient3_id: ingredient[2],
                ingredient4_id: ingredient[3],
                ingredient5_id: null,
                name: 'Apple Pie',
                notes:
                  'Tabantha Wheat, Cane Sugar & Goat Butter obtainable in Rito Village.',
                resale: '30',
                type: 'Restore Hearts'
              },
              {
                category: 'recipe',
                hearts: '¾',
                ingredient1: ingredient[0],
                ingredient2: null,
                ingredient3: null,
                ingredient4: null,
                ingredient5: null,
                image: 'www.image.com',
                type_image: 'https://type_image',
                ingredient1_image: 'https://image-link1',
                ingredient2_image: null,
                ingredient3_image: null,
                ingredient4_image: null,
                ingredient5_image: null,
                name: 'Baked Apple',
                notes: 'Open flame.',
                resale: '0',
                type: 'Restore Hearts'
              },
              {
                category: 'recipe',
                duration: '2:00',
                hearts: '4',
                ingredient1: null,
                ingredient2: null,
                ingredient3: null,
                ingredient4: null,
                ingredient5: null,
                image: 'www.image.com',
                type_image: 'https://type_image',
                name: 'Hasty Fish and Mushroom Skewer',
                notes: 'Restore four hearts',
                resale: '0',
                strength: 'Low',
                type: 'Movement Speed'
              }
            ])
          )
          .then(user =>
            knex('users').insert([
              {
                userName: 'ganondorf',
                password: 'getTheTriforce'
              }
            ])
          )
      ])
    );
};
