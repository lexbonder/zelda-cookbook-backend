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
  const token = jwt.sign({ userName: 'ganondorf ', password: 'getTheTriforce' }, process.env.KEY);

  beforeEach((done) => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() =>
        database.seed.run().then(() => {
          done();
        }));
    });
  });

  it('if the route does not exist a 404 should be returned', () =>
    chai
      .request(server)
      .get('/mario')
      .then((response) => {
        response.should.have.status(404);
      })
      .catch((err) => {
        throw err;
      }));

  describe('GET', () => {
    describe('api/v1/ingredients', () => {
      it('should return all the ingredients', () =>
        chai
          .request(server)
          .get('/api/v1/ingredients')
          .then((response) => {
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

            response.body[0].should.have.property('created_at');
            response.body[0].should.have.property('updated_at');
          })
          .catch((err) => {
            throw err;
          }));
    });

    describe('api/v1/ingredients/:id', () => {
      it('should get a specific ingredient', () =>
        chai
          .request(server)
          .get('/api/v1/ingredients/1')
          .then((response) => {
            response.should.have.status(200);
            response.body.should.be.a('array');
            response.body[0].id.should.equal(1);
            response.body[0].category.should.equal('food');
            response.body[0].duration.should.equal('0:30');
            response.body[0].hearts.should.equal('0.5');
            response.body[0].name.should.equal('Apple');
            response.body[0].resale.should.equal('3');
            response.body[0].type.should.equal('Fruit');
          }));

      it('should return 404 if ingredient with requested id does not exist', () =>
        chai
          .request(server)
          .get('/api/v1/ingredients/26')
          .then((response) => {
            response.should.have.status(404);
            response.body.error.should.equal('Could not find ingredient with id 26');
          }));
    });

    describe('api/v1/recipes', () => {
      it('should return all the recipes', () =>
        chai
          .request(server)
          .get('/api/v1/recipes')
          .then((response) => {
            response.body.length.should.equal(2);

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
            response.body[0].notes.should.equal('Tabantha Wheat, Cane Sugar & Goat Butter obtainable in Rito Village.');

            response.body[0].should.have.property('resale');
            response.body[0].resale.should.equal('30');

            response.body[0].should.have.property('type');
            response.body[0].type.should.equal('Restore Hearts');

            response.body[0].should.have.property('ingredient1');
            response.body[0].ingredient1.should.equal(1);

            response.body[0].should.have.property('ingredient2');
            response.body[0].ingredient2.should.equal(2);

            response.body[0].should.have.property('ingredient3');
            response.body[0].ingredient3.should.equal(3);

            response.body[0].should.have.property('ingredient4');
            response.body[0].ingredient4.should.equal(4);

            response.body[0].should.have.property('ingredient5');
            response.body[0].should.have.property('created_at');
            response.body[0].should.have.property('updated_at');
          })
          .catch((err) => {
            throw err;
          }));
    });

    describe('api/v1/recipes/:id', () => {
      it('should get a specific recipe', () =>
        chai
          .request(server)
          .get('/api/v1/recipes/1')
          .then((response) => {
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
            response.body[0].notes.should.equal('Tabantha Wheat, Cane Sugar & Goat Butter obtainable in Rito Village.');

            response.body[0].should.have.property('resale');
            response.body[0].resale.should.equal('30');

            response.body[0].should.have.property('type');
            response.body[0].type.should.equal('Restore Hearts');

            response.body[0].should.have.property('ingredient1');
            response.body[0].ingredient1.should.equal(1);

            response.body[0].should.have.property('ingredient2');
            response.body[0].ingredient2.should.equal(2);

            response.body[0].should.have.property('ingredient3');
            response.body[0].ingredient3.should.equal(3);

            response.body[0].should.have.property('ingredient4');
            response.body[0].ingredient4.should.equal(4);

            response.body[0].should.have.property('ingredient5');
            response.body[0].should.have.property('created_at');
            response.body[0].should.have.property('updated_at');
          }));

      it('should return 404 if remark with requested id does not exist', () =>
        chai
          .request(server)
          .get('/api/v1/recipes/19')
          .then((response) => {
            response.should.have.status(404);
            response.body.error.should.equal('Could not find recipe with id 19');
          }));
    });
  });
});
