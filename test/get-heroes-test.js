process.env.NODE_ENV = 'test';
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');

const jwt = require('jsonwebtoken');

let newAccTokenHeader = '';

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

describe('POST /login', () => {
  it('should get back the userId from the accessToken and the header for GET /heroes test', (done) => {
    request(app)
      .post('/login')
      .send({
        username: 'Daniel',
        password: 'xxxx5555',
      })
      .end((err, data) => {
        if (err) return done(err);
        newAccTokenHeader = `Bearer ${data.body.accessToken}`;
        expect(JSON.stringify(jwt.decode(data.body.accessToken).userId)).to.equal(JSON.stringify(1));
        return done();
      });
  });
});

describe('GET /heroes', () => {
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
