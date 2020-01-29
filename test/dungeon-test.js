process.env.NODE_ENV = 'test';
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');
const mocha = require('mocha');

let newAccTokenHeader = '';

describe('GET /dungeon', () => {
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
  it('should respond with dungeonInstance', (done) => {
    request(app)
      .get('/dungeon')
      .set('Authorization', newAccTokenHeader)
      .set('Accept', 'application/json')
      .set('heroid', '4')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify({
          heroId: 4,
          dungeonId: 2,
          obstacles: [{ name: '?' }],
          removedObstacles: 0,
          name: 'dungeon2',
          image: null,
        }));
        return done();
      });
  });
  it('should respond new dungeonInstance', (done) => {
    request(app)
      .get('/dungeon')
      .set('Authorization', newAccTokenHeader)
      .set('Accept', 'application/json')
      .set('heroid', '2')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify({
          heroId: 2,
          dungeonId: 2,
          obstacles: [{ name: '?' }],
          removedObstacles: 0,
          name: 'dungeon2',
          image: null,
        }));
        return done();
      });
  });
  it('should respond with error message if heroId missing', (done) => {
    request(app)
      .get('/dungeon')
      .set('Accept', 'application/json')
      .set('Authorization', newAccTokenHeader)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify('Please enter a valid heroId'));
        return done();
      });
  });
  it('should respond with error message if hero doesn\'t exist', (done) => {
    request(app)
      .get('/dungeon')
      .set('Accept', 'application/json')
      .set('Authorization', newAccTokenHeader)
      .set('heroid', '300')
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify('Please enter a valid heroId'));
        return done();
      });
  });
  it('should respond with error message if heroId string', (done) => {
    request(app)
      .get('/dungeon')
      .set('Accept', 'application/json')
      .set('Authorization', newAccTokenHeader)
      .set('heroid', 'asd')
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify('Please enter a valid heroId'));
        return done();
      });
  });
});

describe('PUT /finalWords', () => {
  it('should respond with bad request', (done) => {
    request(app)
      .put('/finalWords')
      .set('Accept', 'application/json')
      .set('Authorization', newAccTokenHeader)
      .set('herd', 67)
      .set('words', 'I am dead')
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify({ error: 'Please provide final words' }));
        return done();
      });
  });
});
