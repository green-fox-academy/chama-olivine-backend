const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');

const expectedResponses = [
  {
    userId: 2,
    name: 'Bela',
    experience: 0,
    level: 1,
    healthmax: 500,
    healthact: 500,
    attackmin: 1,
    attackmax: 5,
    defense: 1,
    inventory: [],
    finalWords: 'Feck! Arse! Drink!',
  },
  {
    Message: 'Sorry, this name is already in use!',
  },
  {
    error: 'Please provide a username and a userId',
  },
];

describe('POST /hero', () => {
  it('should respond with an object detailing the newly created hero', (done) => {
    request(app)
      .post('/hero')
      .set('Accept', 'application/json')
      .set('userid', '2')
      .send({ name: 'Bela' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(expectedResponses[0]));
        return done();
      });
  });
  it('should respond with a message if the hero name already exists', (done) => {
    request(app)
      .post('/hero')
      .set('Accept', 'application/json')
      .set('userid', '1')
      .send({ name: 'hero1' })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(expectedResponses[1]));
        return done();
      });
  });
  it('should respond with a message if userId is missing', (done) => {
    request(app)
      .post('/hero')
      .set('Accept', 'application/json')
      .send({ name: 'hero1' })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(expectedResponses[2]));
        return done();
      });
  });
  it('should respond with a message if userId is not a number', (done) => {
    request(app)
      .post('/hero')
      .set('Accept', 'application/json')
      .set('userid', 'ASD')
      .send({ name: 'hero1' })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(expectedResponses[2]));
        return done();
      });
  });
  it('should respond with a message if hero name is missing', (done) => {
    request(app)
      .post('/hero')
      .set('Accept', 'application/json')
      .set('userid', '2')
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(expectedResponses[2]));
        return done();
      });
  });
});
