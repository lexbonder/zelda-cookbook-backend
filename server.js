const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.send('Yea buddy!!');
});

app.listen(app.get('port'), () => {
  // eslint-disable-next-line
  console.log('Zelda Cookbook is running.');
});
