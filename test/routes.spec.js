const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API routes', () => {
  beforeEach((done) => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() => database.seed.run().then(() => {
        done();
      }));
    });
  });

  it('if the route does not exist a 404 should be returned', () => chai
    .request(server)
    .get('/mario')
    .then((response) => {
      response.should.have.status(404);
    })
    .catch((err) => {
      throw err;
    }));

  describe('GET /ingredients', () => {
    it('should return all the ingredients', () => chai
      .request(server)
      .get('/ingredients')
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
      })
      .catch((err) => {
        throw err;
      }));
  });

  describe('GET api/v1/ingredients/:id', () => {
    xit('should get a specific ingredient', () => chai
      .request(server)
      .get('/api/v1/ingredients/1')
      .then((response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body[0].id.should.equal(1);
        response.body[0].title.should.equal('The Title');
        response.body[0].topic.should.equal('TOPIC ONE');
        response.body[0].date.should.equal('2/12/2018');
      }));

    xit('should return 404 if ingredient with requested id does not exist', () => chai
      .request(server)
      .get('/api/v1/ingredients/26')
      .then((response) => {
        response.should.have.status(404);
        response.body.error.should.equal('Could not find ingredient with id 26');
      }));
  });

  describe('GET /recipes', () => {
    xit('should return all the ingredients', () => chai
      .request(server)
      .get('/ingredients')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('first item');
        response.body[0].should.have.property('packed');
        response.body[0].packed.should.equal(false);
      })
      .catch((err) => {
        throw err;
      }));
  });

  describe('GET api/v1/recipe/:id', () => {
    xit('should get a specific recipe', () => chai
      .request(server)
      .get('/api/v1/recipe/1')
      .then((response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body[0].id.should.equal(1);
        response.body[0].title.should.equal('The Title');
        response.body[0].topic.should.equal('TOPIC ONE');
        response.body[0].date.should.equal('2/12/2018');
      }));

    xit('should return 404 if remark with requested id does not exist', () => chai
      .request(server)
      .get('/api/v1/recipe/19')
      .then((response) => {
        response.should.have.status(404);
        response.body.error.should.equal('Could not find recipe with id 19');
      }));
  });
});
