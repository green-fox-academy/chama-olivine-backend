const { Hero } = require('../models/heroModel');
const { Equipment } = require('../models/equipment');

class HeroService {
  constructor(conn, idleActionService) {
    this.conn = conn;
    this.idleActionService = idleActionService;
  }
  getHeroes(id) {
    return new Promise((resolve, reject) => {
      if (Number.isNaN(Number(id))) {
        resolve([]);
        return;
      }

      const query = 'SELECT * FROM heroes INNER JOIN idleStatus ON heroes.id = idleStatus.heroId WHERE userId = ?;';
      this.conn.query(query, [id], (err, row) => {
        if (err) return reject(new Error(500));
        const result = [];
        row.forEach((e, i) => {
          e.idleAction = { type: row[i].type, timestamp: row[i].timestamp };
          result.push(new Hero(e));
        });
        return resolve(result);
      });
    });
  }

  heroExistsCheck(hero) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM heroes INNER JOIN users ON heroes.userId = users.id WHERE users.id = ? AND heroes.name = ?;';
      this.conn.query(query, [hero.userId, hero.name], (err, row) => {
        err ? reject(err) : resolve(row.length);
      });
    });
  }

  heroExists(heroId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM heroes WHERE id = ?;';
      this.conn.query(query, [heroId], (err, row) => {
        err ? reject(err) : resolve(row.length);
      });
    });
  }

  createHero(hero) {
    return new Promise((resolve, reject) => {
      if (hero.name && hero.userId) {
        const query = 'INSERT INTO heroes (name, experience, level, healthmax, healthact, attackmin, attackmax, defense, finalWords, userId, smallImage, bigImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'; //eslint-disable-line
        this.conn.query(query, [
          hero.name,
          hero.experience,
          hero.level,
          hero.healthmax,
          hero.healthact,
          hero.attackmin,
          hero.attackmax,
          hero.defense,
          hero.finalWords,
          hero.userId,
          hero.smallImage,
          hero.bigImage,
        ], (err, row) => {
          if (err) return reject(err);
          hero.id = row.insertId;
          hero.idleAction = { type: 'rest', timestamp: Number((Date.now() / 1000).toFixed(0)) };
          this.idleActionService.setIdleStatus(row.insertId, 'rest').catch(error => reject(error));
          return resolve(new Hero(hero));
        });
        return;
      }
      reject(new Error('DB Fail'));
    });
  }

  async addHero(hero) {
    const check = await this.heroExistsCheck(hero);
    return new Promise((resolve, reject) => {
      if (check !== 0) {
        resolve({ Message: 'Sorry, this name is already in use!' });
        return;
      }
      this.createHero(hero)
        .then(resHero => resolve(resHero),
          error => reject(error));
    });
  }

  retrieveHeroById(heroId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM heroes WHERE id = ?; SELECT name, id, type, active FROM equipment WHERE heroId = ?; SELECT equipmentId, attributeName, value FROM equipment JOIN equipmentAttributes ON equipment.id = equipmentAttributes.equipmentId JOIN attributeModifier ON attributeModifier.id = equipmentAttributes.attributeId WHERE heroId = ?; SELECT * FROM idleStatus WHERE heroId = ?;'; //eslint-disable-line
      this.conn.query(query, [heroId, heroId, heroId, heroId], (err, rows) => {
        if (err) {
          reject(err);
        } else if (rows[0].length > 0) {
          const equipment = rows[1];
          const modifiers = rows[2];
          const hero = rows[0][0];
          const inventory = [];
          const idleAction = rows[3][0];

          equipment.forEach((element) => {
            const sortedModifiers = modifiers.filter(e => e.equipmentId === element.id);
            const activeState = Boolean(Number(element.active));
            const equipmentItem = new Equipment(element.id, element.name, sortedModifiers, element.type, activeState);
            inventory.push(equipmentItem);
          });
          hero.inventory = inventory;
          const resHero = new Hero(hero);

          if (idleAction) {
            delete rows[3][0].heroId;
            resHero.idleAction = idleAction;
          }
          resolve(resHero);
        } else {
          reject(new Error('The requested hero doesn\'t exist'));
        }
      });
    });
  }

  updateHero(hero) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE heroes SET experience = ?, level = ?, healthmax = ?, healthact = ?, attackmin = ?, attackmax = ?, defense = ?, finalWords = ?, smallImage = ?, bigImage = ? WHERE id = ?;'; //eslint-disable-line
      this.conn.query(query, [
        hero.experience,
        hero.level,
        hero.healthmax,
        hero.healthact,
        hero.attackmin,
        hero.attackmax,
        hero.defense,
        hero.finalWords,
        hero.smallImage,
        hero.bigImage,
        hero.id,
      ], (err, row) => {
        err ? reject(err) : resolve(row);
      });
    });
  }
}

module.exports = HeroService;
