process.env.NODE_ENV = 'test';
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');

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
        name: 'Sword of major farts',
        type: 'Right Hand',
        active: false,
        modifiers: [
          {
            attributeName: 'attackmax',
            value: -11,
          },
          {
            attributeName: 'healthmax',
            value: 12,
          },
          {
            attributeName: 'healthmax',
            value: 5,
          },
        ],
      },
      {
        name: 'Spear of incompetent developers',
        type: 'Left Hand',
        active: false,
        modifiers: [
          {
            attributeName: 'healthmax',
            value: 12,
          },
          {
            attributeName: 'attackmin',
            value: 11,
          },
          {
            attributeName: 'attackmax',
            value: -11,
          },
        ],
      },
      {
        name: 'Bow of major annoyance',
        type: 'Left Hand',
        active: false,
        modifiers: [
          {
            attributeName: 'attackmin',
            value: 8,
          },
        ],
      },
    ],
    finalWords: 'Fuck off!',
    smallImage: null,
    bigImage: null,
  },
  {
    Error: 'The requested hero doesn\'t exist',
  },
  {
    Error: 'Please provide a Hero ID',
  },
];


describe('GET /hero/:heroId', () => {
  it('should respond with a JSON object containing all information on the hero', (done) => {
    request(app)
      .get('/hero/2')
      .set('Accept', 'application/json')
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
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(expectedResponses[2]));
        return done();
      });
  });
});
