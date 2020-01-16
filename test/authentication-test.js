process.env.NODE_ENV = 'test';
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');
const jwt = require('jsonwebtoken');

let newRefToken = '';

describe('POST /login', () => {
  it('should get back userId in accessToken in json and prepare the tokens for POST /getToken', (done) => {
    request(app)
      .post('/login')
      .send({
        username: 'Daniel',
        password: 'xxxx5555',
      })
      .end((err, data) => {
        if (err) return done(err);
        newRefToken = `${data.body.refreshToken}`;
        expect(JSON.stringify(jwt.decode(data.body.accessToken).userId)).to.equal(JSON.stringify(1));
        return done();
      });
  });
  it('should get back userId in refreshToken in json', (done) => {
    request(app)
      .post('/login')
      .send({
        username: 'Daniel',
        password: 'xxxx5555',
      })
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(jwt.decode(data.body.refreshToken).userId)).to.equal(JSON.stringify(1));
        return done();
      });
  });
});

describe('POST /getToken', () => {
  it('should get new accessToken and refreshToken', (done) => {
    request(app)
      .post('/getToken')
      .set('Token', newRefToken)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(jwt.decode(data.body.accessToken).userId)).to.equal(JSON.stringify(1));
        expect(JSON.stringify(jwt.decode(data.body.refreshToken).userId)).to.equal(JSON.stringify(1));
        return done();
      });
  });
});
