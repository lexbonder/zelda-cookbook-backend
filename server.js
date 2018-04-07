const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const bodyParser = require('body-parser');
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Zelda Cookbook Backend';

app.get('/ingredients', (request, response) => {
  database('ingredients')
    .select()
    .then(items => {
      if (items.length) {
        response.status(200).json(items);
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


app.listen(app.get('port'), () => {
  // eslint-disable-next-line
  console.log(`${app.locals.title} server is running on ${app.get('port')}.`);
});

module.exports = app;
