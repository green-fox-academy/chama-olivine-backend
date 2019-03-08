const request = require('supertest');
const app = require('../index');
const { expect } = require('chai');

describe('GET /helloworld', () => {
  it('should respond with 200 - OK', (done) => {
    request(app)
      .get('/helloworld')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.message).to.equal('Hello World!');
        return done();
      });
  });
});
