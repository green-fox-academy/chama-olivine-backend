process.env.NODE_ENV = 'test';
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');
const mocha = require('mocha');

let newAccTokenHeader = '';

const expectedOutputWithExistingUserId = [{
  id: 3,
  userId: 2,
  name: 'hero3',
  experience: 1,
  level: 1,
  healthmax: 1,
  healthact: 1,
  attackmin: 1,
  attackmax: 1,
  defense: 1,
  inventory: [],
  finalWords: 'Fuck off!',
  smallImage: null,
  bigImage: null,
  idleAction: { type: 'rest', timestamp: 0 },

},
{
  id: 4,
  userId: 2,
  name: 'hero4',
  experience: 1,
  level: 1,
  healthmax: 1,
  healthact: 1,
  attackmin: 1,
  attackmax: 1,
  defense: 1,
  inventory: [],
  finalWords: 'Fuck off!',
  smallImage: null,
  bigImage: null,
  idleAction: { type: 'rest', timestamp: 0 },
}];

describe('GET /heroes', () => {
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
  it('should respond with an array of heros', (done) => {
    request(app)
      .get('/heroes')
      .set('Authorization', newAccTokenHeader)
      .expect(200)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(expectedOutputWithExistingUserId));
        return done();
      });
  });
});
