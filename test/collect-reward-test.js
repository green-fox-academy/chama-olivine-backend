process.env.NODE_ENV = 'test';
const request = require('supertest');
const mocha = require('mocha');
const { expect } = require('chai');
const app = require('../src/index');

let newAccTokenHeader;

describe('PUT /collect', () => {
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
  it('should respond with added equipment', (done) => {
    request(app)
      .put('/collect')
      .set('Authorization', newAccTokenHeader)
      .set('heroid', '1')
      .end((err, data) => {
        if (err) return done();
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify({
          changed: [],
          added: [{
            id: 394,
            name: 'Sword of minor bullshit',
            type: 'LeftHand',
            active: 0,
          }],
          removed: [],
        }));
        return done();
      });
  });
  it('should respond with error message if dungeon not yet finished', (done) => {
    request(app)
      .put('/collect')
      .set('Authorization', newAccTokenHeader)
      .set('heroId', '4')
      .set('Accept', 'application/json')
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify('Dungeon not finished yet'));
        return done();
      });
  });
  it('should respond with error message if heroId missing', (done) => {
    request(app)
      .put('/collect')
      .set('Authorization', newAccTokenHeader)
      .set('Accept', 'application/json')
      .end((err, data) => {
        if (err) return done();
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify('Please enter a valid heroId'));
        return done();
      });
  });
  it('should respond with error message if heroId not num', (done) => {
    request(app)
      .put('/collect')
      .set('Authorization', newAccTokenHeader)
      .set('heroid', 'asd')
      .end((err, data) => {
        if (err) return done();
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify('Please enter a valid heroId'));
        return done();
      });
  });
});
