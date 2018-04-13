const express = require('express');

const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const bodyParser = require('body-parser');
const database = require('knex')(configuration);
const jwt = require('jsonwebtoken');

process.env.KEY = 'ocarinaOfTime';

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Zelda Cookbook Backend';

const checkAuth = (request, response, next) => {
  const { token } = request.body;

  if (!token) {
    return response
      .status(403)
      .send({ error: 'You must be authorized to access this endpoint.' });
  }
  try {
    jwt.verify(token, process.env.KEY);

    next();
  } catch (error) {
    return response.status(403).json({ error: 'invalid token' });
  }
};

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
  const type = request.query.type;

  if (type) {
    database('recipes')
      .where('type', type)
      .select()
      .then(recipes => {
        response.status(200).json(recipes);
      })
      .catch(err => {
        response.status(500).json({ err });
      });
  } else {
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
  }
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

app.get('/api/v1/users/:id', checkAuth, (request, response) => {
  database('users')
    .where('id', request.params.id)
    .select()
    .then(user => {
      if (user.length) {
        response.status(200).json(user);
      } else {
        response.status(404).json({
          error: `Could not find user with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/users', checkAuth, (request, response) => {
  const { userName, password } = request.body;
  const user = { userName, password };

  for (const requiredParameter of ['userName', 'password']) {
    if (!user[requiredParameter]) {
      return response.status(422).send({
        error: `Error you are missing ${requiredParameter} property`
      });
    }
  }
  database('users')
    .insert(user, 'id')
    .then(user => {
      response.status(201).json({ id: user[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/authenticate', (request, response) => {
  const body = request.body;
  const { userName, password } = request.body;

  for (const requiredParameter of ['userName', 'password']) {
    if (!body[requiredParameter]) {
      return response
        .status(422)
        .send({ error: 'Invalid password or user name' });
    }
  }

  // how do we check users in database?
  if (password && userName) {
    const token = jwt.sign(body, process.env.KEY);

    return response.status(201).json({ token });
  }
  response.status(401).json({ error: 'not authorized' });
});

app.listen(app.get('port'), () => {
  // eslint-disable-next-line
  console.log(`${app.locals.title} server is running on ${app.get('port')}.`);
});

module.exports = app;
