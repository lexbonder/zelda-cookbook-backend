const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('API routes', () => {
  const token = jwt.sign(
    { userName: 'ganondorf', password: 'getTheTriforce' },
    process.env.KEY
  );

  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() =>
        database.seed.run().then(() => {
          done();
        })
      );
    });
  });

  it('if the route does not exist a 404 should be returned', () =>
    chai
      .request(server)
      .get('/mario')
      .then(response => {
        response.should.have.status(404);
      })
      .catch(err => {
        throw err;
      }));

  describe('GET', () => {
    describe('api/v1/ingredients', () => {
      it('should return all the ingredients', () =>
        chai
          .request(server)
          .get('/api/v1/ingredients')
          .then(response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('array');
            response.body.length.should.equal(4);

            response.body[0].should.have.property('category');
            response.body[0].category.should.equal('food');

            response.body[0].should.have.property('duration');
            response.body[0].duration.should.equal('0:30');

            response.body[0].should.have.property('effect');

            response.body[0].should.have.property('hearts');
            response.body[0].hearts.should.equal('0.5');

            response.body[0].should.have.property('name');
            response.body[0].name.should.equal('Apple');

            response.body[0].should.have.property('resale');
            response.body[0].resale.should.equal('3');

            response.body[0].should.have.property('type');
            response.body[0].type.should.equal('Fruit');

            response.body[0].should.have.property('image');
            response.body[0].image.should.equal('www.applepics.com');

            response.body[0].should.have.property('created_at');
            response.body[0].should.have.property('updated_at');
          })
          .catch(err => {
            throw err;
          }));
    });

    describe('api/v1/ingredients/:id', () => {
      it('should get a specific ingredient', () =>
        chai
          .request(server)
          .get('/api/v1/ingredients/1')
          .then(response => {
            response.should.have.status(200);
            response.body.should.be.a('array');
            response.body[0].id.should.equal(1);
            response.body[0].category.should.equal('food');
            response.body[0].duration.should.equal('0:30');
            response.body[0].hearts.should.equal('0.5');
            response.body[0].name.should.equal('Apple');
            response.body[0].resale.should.equal('3');
            response.body[0].type.should.equal('Fruit');
            response.body[0].image.should.equal('www.applepics.com');
          }));

      it('should return 404 if ingredient with requested id does not exist', () =>
        chai
          .request(server)
          .get('/api/v1/ingredients/26')
          .then(response => {
            response.should.have.status(404);
            response.body.error.should.equal(
              'Could not find ingredient with id 26'
            );
          }));
    });

    describe('api/v1/recipes', () => {
      it('should return all the recipes', () =>
        chai
          .request(server)
          .get('/api/v1/recipes')
          .then(response => {
            response.body.length.should.equal(3);

            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('array');

            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(1);

            response.body[0].should.have.property('category');
            response.body[0].category.should.equal('recipe');

            response.body[0].should.have.property('hearts');
            response.body[0].hearts.should.equal('3');

            response.body[0].should.have.property('notes');
            response.body[0].notes.should.equal(
              'Tabantha Wheat, Cane Sugar & Goat Butter obtainable in Rito Village.'
            );

            response.body[0].should.have.property('resale');
            response.body[0].resale.should.equal('30');

            response.body[0].should.have.property('type');
            response.body[0].type.should.equal('Restore Hearts');

            response.body[0].should.have.property('ingredient1');
            response.body[0].ingredient1.should.equal('Apple');
            response.body[0].should.have.property('ingredient2');
            response.body[0].ingredient2.should.equal('Tabantha Wheat');
            response.body[0].should.have.property('ingredient3');
            response.body[0].ingredient3.should.equal('Cane Sugar');
            response.body[0].should.have.property('ingredient4');
            response.body[0].ingredient4.should.equal('Goat Butter');

            response.body[0].should.have.property('image');
            response.body[0].image.should.equal('www.image.com');

            response.body[0].should.have.property('type_image');
            response.body[0].type_image.should.equal('https://type_image');

            response.body[0].should.have.property('ingredient1_image');
            response.body[0].ingredient1_image.should.equal(
              'https://image-link1'
            );
            response.body[0].should.have.property('ingredient2_image');
            response.body[0].ingredient2_image.should.equal(
              'https://image-link2'
            );
            response.body[0].should.have.property('ingredient3_image');
            response.body[0].ingredient3_image.should.equal(
              'https://image-link3'
            );
            response.body[0].should.have.property('ingredient4_image');
            response.body[0].ingredient4_image.should.equal(
              'https://image-link4'
            );
            response.body[0].should.have.property('ingredient5_image');

            response.body[0].should.have.property('ingredient1_id');
            response.body[0].ingredient1_id.should.equal(1);
            response.body[0].should.have.property('ingredient2_id');
            response.body[0].ingredient2_id.should.equal(2);
            response.body[0].should.have.property('ingredient3_id');
            response.body[0].ingredient3_id.should.equal(3);
            response.body[0].should.have.property('ingredient4_id');
            response.body[0].ingredient4_id.should.equal(4);
            response.body[0].should.have.property('ingredient5_id');

            response.body[0].should.have.property('created_at');
            response.body[0].should.have.property('updated_at');
          })
          .catch(err => {
            throw err;
          }));

      it('should be able to get recipes by type', () =>
        chai
          .request(server)
          .get('/api/v1/recipes?type=Movement%20Speed')
          .then(response => {
            response.body.length.should.equal(1);
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('array');

            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(3);

            response.body[0].should.have.property('category');
            response.body[0].category.should.equal('recipe');

            response.body[0].should.have.property('hearts');
            response.body[0].hearts.should.equal('4');

            response.body[0].should.have.property('notes');
            response.body[0].notes.should.equal('Restore four hearts');

            response.body[0].should.have.property('resale');
            response.body[0].resale.should.equal('0');

            response.body[0].should.have.property('type');
            response.body[0].type.should.equal('Movement Speed');

            response.body[0].should.have.property('ingredient1_id');
            response.body[0].should.have.property('ingredient2_id');
            response.body[0].should.have.property('ingredient3_id');
            response.body[0].should.have.property('ingredient4_id');
            response.body[0].should.have.property('ingredient5_id');
            
            response.body[0].should.have.property('image');
            response.body[0].image.should.equal('www.image.com');
            
            response.body[0].should.have.property('type_image');
            response.body[0].type_image.should.equal('https://type_image');
            
            response.body[0].should.have.property('created_at');
            response.body[0].should.have.property('updated_at');
          }));
    });

    describe('api/v1/recipes/:id', () => {
      it('should get a specific recipe', () =>
        chai
          .request(server)
          .get('/api/v1/recipes/1')
          .then(response => {
            response.body.length.should.equal(1);

            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('array');

            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(1);

            response.body[0].should.have.property('category');
            response.body[0].category.should.equal('recipe');

            response.body[0].should.have.property('hearts');
            response.body[0].hearts.should.equal('3');

            response.body[0].should.have.property('notes');
            response.body[0].notes.should.equal(
              'Tabantha Wheat, Cane Sugar & Goat Butter obtainable in Rito Village.'
            );

            response.body[0].should.have.property('resale');
            response.body[0].resale.should.equal('30');

            response.body[0].should.have.property('type');
            response.body[0].type.should.equal('Restore Hearts');

            response.body[0].should.have.property('ingredient1');
            response.body[0].ingredient1.should.equal('Apple');

            response.body[0].should.have.property('ingredient2');
            response.body[0].ingredient2.should.equal('Tabantha Wheat');

            response.body[0].should.have.property('ingredient3');
            response.body[0].ingredient3.should.equal('Cane Sugar');

            response.body[0].should.have.property('ingredient4');
            response.body[0].ingredient4.should.equal('Goat Butter');

            response.body[0].should.have.property('ingredient5');

            response.body[0].should.have.property('ingredient1_id');
            response.body[0].ingredient1_id.should.equal(1);
            response.body[0].should.have.property('ingredient2_id');
            response.body[0].ingredient2_id.should.equal(2);
            response.body[0].should.have.property('ingredient3_id');
            response.body[0].ingredient3_id.should.equal(3);
            response.body[0].should.have.property('ingredient4_id');
            response.body[0].ingredient4_id.should.equal(4);
            response.body[0].should.have.property('ingredient5_id');

            response.body[0].should.have.property('image');
            response.body[0].image.should.equal('www.image.com');

            response.body[0].should.have.property('type_image');
            response.body[0].type_image.should.equal('https://type_image');

            response.body[0].should.have.property('ingredient1_image');
            response.body[0].ingredient1_image.should.equal(
              'https://image-link1'
            );
            response.body[0].should.have.property('ingredient2_image');
            response.body[0].ingredient2_image.should.equal(
              'https://image-link2'
            );
            response.body[0].should.have.property('ingredient3_image');
            response.body[0].ingredient3_image.should.equal(
              'https://image-link3'
            );
            response.body[0].should.have.property('ingredient4_image');
            response.body[0].ingredient4_image.should.equal(
              'https://image-link4'
            );
            response.body[0].should.have.property('ingredient5_image');

            response.body[0].should.have.property('created_at');
            response.body[0].should.have.property('updated_at');
          }));

      it('should return 404 if recipe with requested id does not exist', () =>
        chai
          .request(server)
          .get('/api/v1/recipes/19')
          .then(response => {
            response.should.have.status(404);
            response.body.error.should.equal(
              'Could not find recipe with id 19'
            );
          }));
    });

    describe('api/v1/users/:id', () => {
      it('should get a specific user', () =>
        chai
          .request(server)
          .get('/api/v1/users/1')
          .send({ token })
          .then(response => {
            response.body.length.should.equal(1);
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('array');

            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(1);

            response.body[0].should.have.property('userName');
            response.body[0].userName.should.equal('ganondorf');

            response.body[0].should.have.property('password');
            response.body[0].password.should.equal('getTheTriforce');

            response.body[0].should.have.property('created_at');
            response.body[0].should.have.property('updated_at');
          }));

      it('should return 404 if user with requested id does not exist', () =>
        chai
          .request(server)
          .get('/api/v1/users/79')
          .send({ token })
          .then(response => {
            response.should.have.status(404);
            response.body.error.should.equal('Could not find user with id 79');
          }));
    });
  });

  describe('POST', () => {
    describe('api/v1/authenticate', () => {
      it('should return a token', () =>
        chai
          .request(server)
          .post('/api/v1/authenticate')
          .send({
            userName: 'ganondorf',
            password: 'getTheTriforce'
          })
          .then(response => {
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.token.should.a('string');
          })
          .catch(err => {
            throw err;
          }));

      it('should not return a token if required query parameters are missing', () =>
        chai
          .request(server)
          .post('/api/v1/authenticate')
          .send({
            userName: 'ganondorf'
          })
          .then(response => {
            response.should.have.status(422);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.equal('Invalid password or user name');
          })
          .catch(err => {
            throw err;
          }));
    });

    describe('api/v1/users', () => {
      it('should create a new user', () =>
        chai
          .request(server)
          .post('/api/v1/users')
          .send({
            userName: 'link',
            password: 'saveThePrincess',
            token
          })
          .then(response => {
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.id.should.equal(2);
          })
          .catch(err => {
            throw err;
          }));

      it('should not create a user with missing data', () =>
        chai
          .request(server)
          .post('/api/v1/users')
          .send({
            userName: 'link',
            token
          })
          .then(response => {
            response.should.have.status(422);
            response.body.should.have.property('error');
            response.body.error.should.equal(
              'Error you are missing password property'
            );
          }));

      it('should not create a user without a token', () =>
        chai
          .request(server)
          .post('/api/v1/users')
          .send({
            userName: 'link',
            password: 'saveThePrincess'
          })
          .then(response => {
            response.should.have.status(403);
            response.body.should.have.property('error');
            response.body.error.should.equal(
              'You must be authorized to access this endpoint.'
            );
          }));
    });
  });
});
