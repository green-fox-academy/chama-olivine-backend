process.env.NODE_ENV = 'test';
const request = require('supertest');
const mocha = require('mocha');
const { expect } = require('chai');
const app = require('../src/index');

let newAccTokenHeader;

describe('PUT /hero/:id/action/:type', () => {
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
  it('should give back an error if the heroId is string', (done) => {
    request(app)
      .put('/hero/asd/action/rest')
      .set('Authorization', newAccTokenHeader)
      .end((err, data) => {
        if (err) return done();
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify('This is your error: 400'));
        return done();
      });
  });
  it('should give back an error if the given type is not rest/train/scout', (done) => {
    request(app)
      .put('/hero/1/action/kiscica')
      .set('Authorization', newAccTokenHeader)
      .end((err, data) => {
        if (err) return done();
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify('This is your error: 400'));
        return done();
      });
  });
  it('should insert a new line with idle action if there is no existing heroId', (done) => {
    request(app)
      .put('/hero/1/action/rest')
      .set('Authorization', newAccTokenHeader)
      .end((err, data) => {
        if (err) return done();
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify('idleStatus table has been successfully updated'));
        return done();
      });
  });
  it('should update the action type for existing heroId line in the database', (done) => {
    request(app)
      .put('/hero/2/action/rest')
      .set('Authorization', newAccTokenHeader)
      .end((err, data) => {
        if (err) return done();
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify('idleStatus table has been successfully updated'));
        return done();
      });
  });
  it('should give back an error because the type is the same', (done) => {
    request(app)
      .put('/hero/3/action/rest')
      .set('Authorization', newAccTokenHeader)
      .end((err, data) => {
        if (err) return done();
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify('same status already exist'));
        return done();
      });
  });
});
