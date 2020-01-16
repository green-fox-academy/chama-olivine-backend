process.env.NODE_ENV = 'test';
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');
const jwt = require('jsonwebtoken');

let newAccTokenHeader = '';

describe('POST /login', () => {
  it('should get back the userId from the accessToken and the header for POST /hero/use tests', (done) => {
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

describe('POST /hero/use', () => {
  it('should respond with updated equipment', (done) => {
    request(app)
      .post('/hero/use')
      .set('Authorization', newAccTokenHeader)
      .send({ id: 9, actionType: 'equip' })
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify({
          changed: [{
            id: 9,
            name: 'Sword',
            type: 'Bollocks',
            active: 1,
          }],
          added: [],
          removed: [],
        }));
        return done();
      });
  });
  it('should respond with updated equipments', (done) => {
    request(app)
      .post('/hero/use')
      .set('Authorization', newAccTokenHeader)
      .send({ id: 4, actionType: 'equip' })
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify({
          changed: [
            {
              id: 1,
              name: 'Sword of minor bullshit',
              type: 'Left Hand',
              active: 0,
            },
            {
              id: 4,
              name: 'Spear of incompetent developers',
              type: 'Left Hand',
              active: 1,
            },
          ],
          added: [],
          removed: [],
        }));
        return done();
      });
  });
  it('should respond with error message if Id missing', (done) => {
    request(app)
      .post('/hero/use')
      .set('Authorization', newAccTokenHeader)
      .send({ actionType: 'equip' })
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify('Please enter a valid id and actionType'));
        return done();
      });
  });
  it('should respond with error message if actionType missing', (done) => {
    request(app)
      .post('/hero/use')
      .set('Authorization', newAccTokenHeader)
      .send({ id: 9 })
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify('Please enter a valid id and actionType'));
        return done();
      });
  });
  it('should respond with error message if id doesn\'t exist', (done) => {
    request(app)
      .post('/hero/use')
      .set('Authorization', newAccTokenHeader)
      .send({ id: 91, actionType: 'equip' })
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify('Please enter a valid id and actionType'));
        return done();
      });
  });
});
