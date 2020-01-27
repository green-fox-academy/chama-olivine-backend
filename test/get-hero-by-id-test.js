process.env.NODE_ENV = 'test';
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');
const mocha = require('mocha');

let newAccTokenHeader = '';

const expectedResponses = [
  {
    id: 2,
    userId: 1,
    name: 'hero2',
    experience: 1,
    level: 1,
    healthmax: 1,
    healthact: 1,
    attackmin: 1,
    attackmax: 1,
    defense: 1,
    inventory: [
      {
        id: 2,
        name: 'Sword of major farts',
        type: 'Right Hand',
        active: false,
        modifiers: [
          {
            equipmentId: 2,
            attributeName: 'attackmax',
            value: -11,
          },
          {
            equipmentId: 2,
            attributeName: 'healthmax',
            value: 12,
          },
          {
            equipmentId: 2,
            attributeName: 'healthmax',
            value: 5,
          },
        ],
      },
      {
        id: 4,
        name: 'Spear of incompetent developers',
        type: 'Left Hand',
        active: false,
        modifiers: [
          {
            equipmentId: 4,
            attributeName: 'healthmax',
            value: 12,
          },
          {
            equipmentId: 4,
            attributeName: 'attackmin',
            value: 11,
          },
          {
            equipmentId: 4,
            attributeName: 'attackmax',
            value: -11,
          },
        ],
      },
      {
        id: 6,
        name: 'Bow of major annoyance',
        type: 'Left Hand',
        active: false,
        modifiers: [
          {
            equipmentId: 6,
            attributeName: 'attackmin',
            value: 8,
          },
        ],
      },
    ],
    finalWords: 'Fuck off!',
    smallImage: null,
    bigImage: null,
    actionType: 'rest',

  },
  {
    Error: 'The requested hero doesn\'t exist',
  },
  {
    Error: 'Please provide a Hero ID',
  },
];

describe('GET /hero/:heroId', () => {
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
  it('should respond with a JSON object containing all information on the hero', (done) => {
    request(app)
      .get('/hero/2')
      .set('Accept', 'application/json')
      .set('Authorization', newAccTokenHeader)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(expectedResponses[0]));
        return done();
      });
  });

  it('should respond with an error message if the requested heroId doesn\'t exist', (done) => {
    request(app)
      .get('/hero/90')
      .set('Accept', 'application/json')
      .set('Authorization', newAccTokenHeader)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(expectedResponses[1]));
        return done();
      });
  });

  it('should respond with an error message if the route parameter is not a number', (done) => {
    request(app)
      .get('/hero/kiscica')
      .set('Accept', 'application/json')
      .set('Authorization', newAccTokenHeader)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(expectedResponses[2]));
        return done();
      });
  });
});
