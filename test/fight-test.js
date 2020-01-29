process.env.NODE_ENV = 'test';
const request = require('supertest');
const mocha = require('mocha');
const { expect } = require('chai');
const app = require('../src/index');

let newAccTokenHeader;

describe('PUT /Fight', () => {
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
  it('it should give back error if hero id is wrong', (done) => {
    request(app)
      .put('/fight')
      .set('Authorization', newAccTokenHeader)
      .set('heroid', 'a')
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify("The requested hero doesn't exist"));
        return done();
      });
  });
  it('it should give back error if hero id is missing', (done) => {
    request(app)
      .put('/fight')
      .set('Authorization', newAccTokenHeader)
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify("The requested hero doesn't exist"));
        return done();
      });
  });
  it('it should give back error if hero is already dead', (done) => {
    request(app)
      .put('/fight')
      .set('Authorization', newAccTokenHeader)
      .set('heroid', '2')
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify('Your hero is gone!'));
        return done();
      });
  });
  it('it should give back no enemy response when removed obstacles value is maximum', (done) => {
    request(app)
      .put('/fight')
      .set('Authorization', newAccTokenHeader)
      .set('heroid', '1')
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify([['No enemy left']]));
        return done();
      });
  });
  it('it should fight in the dungeon and send back full response', (done) => {
    request(app)
      .put('/fight')
      .set('Authorization', newAccTokenHeader)
      .set('heroid', '111')
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(
          [['hero111(20 HP) hits asd for 10','asd died!'],{'id':111,'userId':1,'name':'hero111','experience':10,'level':4,'healthmax':23,'healthact':20,'attackmin':23,'attackmax':23,'defense':20,'inventory':[{'id':2,'name':'Sword of major farts','type':'Right Hand','active':false,'modifiers':[{'equipmentId':2,'attributeName':'attackmax','value':-11},{'equipmentId':2,'attributeName':'healthmax','value':12},{'equipmentId':2,'attributeName':'healthmax','value':5}]},{'id':4,'name':'Spear of incompetent developers','type':'Left Hand','active':false,'modifiers':[{'equipmentId':4,'attributeName':'healthmax','value':12},{'equipmentId':4,'attributeName':'attackmin','value':11},{'equipmentId':4,'attributeName':'attackmax','value':-11}]},{'id':6,'name':'Bow of major annoyance','type':'Left Hand','active':false,'modifiers':[{'equipmentId':6,'attributeName':'attackmin','value':8}]}],'finalWords':'ok','smallImage':null,'bigImage':null,'actionType':'rest'},{'heroId':111,'dungeonId':111,'obstacles':[{'name':'?'}],'removedObstacles':0,'name':'dungeon111','image':''}] //eslint-disable-line
        ));
        return done();
      });
  });
  it('after 20 continous failed attacks from both side should break the fight', (done) => {
    request(app)
      .put('/fight')
      .set('Authorization', newAccTokenHeader)
      .set('heroid', '222')
      .end((err, data) => {
        if (err) return done(err);
        expect(JSON.stringify(data.body)).to.equal(JSON.stringify(
         [['hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0','hero222(20 HP) hits asd for 0','asd(10 HP) hits hero222 for 0'],{'id':222,'userId':1,'name':'hero222','experience':0,'level':1,'healthmax':20,'healthact':20,'attackmin':0,'attackmax':0,'defense':200,'inventory':[{'id':2,'name':'Sword of major farts','type':'Right Hand','active':false,'modifiers':[{'equipmentId':2,'attributeName':'attackmax','value':-11},{'equipmentId':2,'attributeName':'healthmax','value':12},{'equipmentId':2,'attributeName':'healthmax','value':5}]},{'id':4,'name':'Spear of incompetent developers','type':'Left Hand','active':false,'modifiers':[{'equipmentId':4,'attributeName':'healthmax','value':12},{'equipmentId':4,'attributeName':'attackmin','value':11},{'equipmentId':4,'attributeName':'attackmax','value':-11}]},{'id':6,'name':'Bow of major annoyance','type':'Left Hand','active':false,'modifiers':[{'equipmentId':6,'attributeName':'attackmin','value':8}]}],'finalWords':'ok','smallImage':null,'bigImage':null,'actionType':'rest'},{'heroId':222,'dungeonId':222,'obstacles':[{'name':'?'}],'removedObstacles':0,'name':'dungeon222','image':''}] //eslint-disable-line
        ));
        return done();
      });
  });
});
