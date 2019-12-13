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
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).to.deep.equal('Incorrect registration data');
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
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).to.deep.equal('Incorrect registration data');
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
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).to.deep.equal('Incorrect registration data');
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
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).to.deep.equal('Passwords don\'t match');
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
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).to.deep.equal('Incorrect registration data');
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
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).to.deep.equal('Username already exists');
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
        expect(JSON.stringify(data.body)).to.deep.equal(JSON.stringify({
          username: 'Attila',
          password: 'xxxx5555',
        }));
        return done();
      });
  });
});
