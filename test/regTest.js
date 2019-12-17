const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');

describe('POST /register', () => {
  it('shouldn\'t POST user without username', (done) => {
    const user = {
      password: 'xxxx5555',
      confirmPsw: 'xxxx5555',
    };
    request(app)
      .post('/register')
      .send(user)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).to.deep.equal('You made a 400 error');
        return done();
      });
  });
  it('shouldn\'t POST user without password', (done) => {
    const user1 = {
      username: 'Attila',
      confirmPsw: 'xxxx5555',
    };
    request(app)
      .post('/register')
      .send(user1)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).to.deep.equal('You made a 400 error');
        return done();
      });
  });
  it('shouldn\'t POST because of short password', (done) => {
    const user11 = {
      username: 'Attila',
      password: 'xx55',
      confirmPsw: 'xxxx5555',
    };
    request(app)
      .post('/register')
      .send(user11)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).to.deep.equal('You made a 400 error');
        return done();
      });
  });
  it('shouldn\'t POST because of not matching passwords', (done) => {
    const user2 = {
      username: 'Attila',
      password: 'yxzx5656',
      confirmPsw: 'xxxx5555',
    };
    request(app)
      .post('/register')
      .send(user2)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).to.deep.equal('You made a 400 error');
        return done();
      });
  });
  it('shouldn\'t POST because of wrong username', (done) => {
    const user3 = {
      username: 'Attilaöüóőúűá?/!+()=ÜÖ',
      password: 'xxxx5555',
      confirmPsw: 'xxxx5555',
    };
    request(app)
      .post('/register')
      .send(user3)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).to.deep.equal('You made a 400 error');
        return done();
      });
  });
  it('shouldn\'t POST because of user already in DB', (done) => {
    const user4 = {
      username: 'Daniel',
      password: 'xxxx5555',
      confirmPsw: 'xxxx5555',
    };
    request(app)
      .post('/register')
      .send(user4)
      .expect(500)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).to.deep.equal('You made a 500 error');
        return done();
      });
  });
  it('should POST user to DB', (done) => {
    const user5 = {
      username: 'Attila',
      password: 'xxxx5555',
      confirmPsw: 'xxxx5555',
    };
    request(app)
      .post('/register')
      .send(user5)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).to.deep.equal(1);
        return done();
      });
  });
});
