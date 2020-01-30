process.env.NODE_ENV = 'test';
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');
const mocha = require('mocha');

let newAccTokenHeader = '';

const expectedResponses = [
  {
    id: '5',
    userId: 1,
    name: 'Bela',
    experience: 0,
    level: 1,
    healthmax: 20,
    healthact: 20,
    attackmin: 3,
    attackmax: 5,
    defense: 15,
    inventory: [],
    finalWords: null,
    smallImage: null,
    bigImage: null,
    idleAction: { type: 'rest' },
  },
  {
    Message: 'Sorry, this name is already in use!',
  },
  {
    error: 'Please provide a username and a userId',
  },
];

describe('POST /hero', () => {
  mocha.before((done) => {
    request(app)
      .post('/login')
      .send({
        username: 'Daniel',
        password: 'xxxx5555',
      })
      .end((err, data) => {
        if (err) return done(err);
        expect(data.statusCode).to.equal(200);
        newAccTokenHeader = `Bearer ${data.body.accessToken}`;
        return done();
      });
  });
  it('should respond with an object detailing the newly created hero', (done) => {
    request(app)
      .post('/hero')
      .set('Accept', 'application/json')
      .set('Authorization', newAccTokenHeader)
      .send({
        name: 'Bela',
        smallImage: expectedResponses[0].smallImage,
        bigImage: expectedResponses[0].bigImage,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, data) => {
        if (err) return done(err);
        delete data.body.idleAction.timestamp;
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(expectedResponses[0]));
        return done();
      });
  });
  it('should respond with a message if the hero name already exists', (done) => {
    request(app)
      .post('/hero')
      .set('Accept', 'application/json')
      .set('Authorization', newAccTokenHeader)
      .send({ name: 'hero1' })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(expectedResponses[1]));
        return done();
      });
  });
  it('should respond with a message if hero name is missing', (done) => {
    request(app)
      .post('/hero')
      .set('Accept', 'application/json')
      .set('Authorization', newAccTokenHeader)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(expectedResponses[2]));
        return done();
      });
  });
});
