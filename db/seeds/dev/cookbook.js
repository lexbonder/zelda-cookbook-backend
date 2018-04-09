const ingredients = require('../../../data/ingredients-data.json')
const recipes = require('../../../data/recipe-data.json')

exports.seed = (knex, Promise) => {
  return knex('recipes')
    .del()
    .then(() => knex('ingredients').del())
    .then(() => {
      return Promise.all([
        knex('ingredients').insert(
          ingredients, 'id'
        )
        .then(ingredient => {
          return knex('recipes')
          .insert(
            recipes.map(recipe => {
              let multipliers = ['x2', 'x3', 'x4', 'x5']
              let ingredients = {}
              let ingName;

              for (let i = 1; i <= 5; i++) {
                if (recipe[`ingredient${i}`]) {
                  multipliers.forEach( item => {
                    if (recipe[`ingredient${i}`].includes(item)) {
                      ingName = recipe[`ingredient${i}`].slice(0, -3)
                    } 
                    ingredients[`ingredient${i}`] = knex('ingredients')
                      .where('name', ingName || recipe[`ingredient${i}`])
                      .select('id')
                  })
                  
                } 
              }
              return {...recipe, ...ingredients}
            })
          )
        }) 
      ])
    })
};
