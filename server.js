const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const bodyParser = require('body-parser');
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Zelda Cookbook Backend';

app.get('/api/v1/ingredients', (request, response) => {
  database('ingredients')
    .select()
    .then(ingredients => {
      if (ingredients.length) {
        response.status(200).json(ingredients);
      } else {
        response.status(404).json({
          error: 'ingredients not found'
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/ingredients/:id', (request, response) => {
  database('ingredients')
    .where('id', request.params.id)
    .select()
    .then(ingredient => {
      if (ingredient.length) {
        response.status(200).json(ingredient);
      } else {
        response.status(404).json({
          error: `Could not find ingredient with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/recipes', (request, response) => {
  database('recipes')
    .select()
    .then(recipes => {
      if (recipes.length) {
        response.status(200).json(recipes);
      } else {
        response.status(404).json({
          error: 'recipes not found'
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/recipes/:id', (request, response) => {
  database('recipes')
    .where('id', request.params.id)
    .select()
    .then(recipe => {
      if (recipe.length) {
        response.status(200).json(recipe);
      } else {
        response.status(404).json({
          error: `Could not find recipe with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});


app.listen(app.get('port'), () => {
  // eslint-disable-next-line
  console.log(`${app.locals.title} server is running on ${app.get('port')}.`);
});

module.exports = app;
