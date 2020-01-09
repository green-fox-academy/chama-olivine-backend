process.env.NODE_ENV = 'test';
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');

const expectedOutputWithExistingUserId = [{
  id: 3,
  name: 'hero3',
  experience: 1,
  level: 1,
  healthmax: 1,
  healthact: 1,
  attackmin: 1,
  attackmax: 1,
  defense: 1,
  finalWords: 'Fuck off!',
  userId: 2,
  smallImage: null,
  bigImage: null,
},
{
  id: 4,
  name: 'hero4',
  experience: 1,
  level: 1,
  healthmax: 1,
  healthact: 1,
  attackmin: 1,
  attackmax: 1,
  defense: 1,
  finalWords: 'Fuck off!',
  userId: 2,
  smallImage: null,
  bigImage: null,
}];

describe('GET /heroes', () => {
  it('should respond with an array of heros', (done) => {
    request(app)
      .get('/heroes')
      .set('Accept', 'application/json')
      .set('userid', '2')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(expectedOutputWithExistingUserId));
        return done();
      });
  });
  it('should respond with an empty array if userId doesn\'t exist', (done) => {
    request(app)
      .get('/heroes')
      .set('Accept', 'application/json')
      .set('userid', '3')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify([]));
        return done();
      });
  });
  it('should respond with an empty array if userId is invalid', (done) => {
    request(app)
      .get('/heroes')
      .set('Accept', 'application/json')
      .set('userid', 'i')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify([]));
        return done();
      });
  });
});
