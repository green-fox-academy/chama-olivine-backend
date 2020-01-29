const { DungeonInstance } = require('../models/dungeonInstanceModel');
const { Dungeon } = require('../models/dungeonModel');

class DungeonService {
  constructor(conn, equipmentService, heroService) {
    this.conn = conn;
    this.equipmentService = equipmentService;
    this.heroService = heroService;
  }

  getDungeonData(dungeonId) {
    const query = 'SELECT * FROM dungeons WHERE id = ?; SELECT * FROM dungeonobstacles INNER JOIN dungeons ON dungeons.id = dungeonobstacles.dungeonId INNER JOIN obstacles ON dungeonobstacles.obstacleId = obstacles.id WHERE dungeonId = ?; SELECT * FROM dungeonrewards INNER JOIN dungeons ON dungeons.id = dungeonrewards.dungeonId INNER JOIN equipment ON dungeonrewards.equipmentId = equipment.id WHERE dungeonId = ?;'; // eslint-disable-line

    return new Promise((resolve, reject) => {
      this.conn.query(query, [dungeonId, dungeonId, dungeonId], (err, row) => {
        if (err) return reject(new Error(500));

        const dungeon = row[0][0];
        const obstacles = row[1];
        const rewards = row[2];

        obstacles.forEach((e) => {
          delete e.id;
          delete e.image;
        });
        rewards.forEach((e) => {
          delete e.image;
          delete e.id;
        });
        return resolve(new Dungeon(dungeon.id, dungeon.name, obstacles, rewards, dungeon.image));
      });
    });
  }

  async randomDungeonInstance(heroId, dungeonId) {
    const query = 'SELECT * FROM dungeons;';
    return new Promise((resolve, reject) => {
      this.conn.query(query, [], (err, row) => {
        err ? reject(new Error(500)) : resolve(row);
      });
    }).then((res) => {
      const randomDungeon = res[Math.floor(Math.random() * res.length)];
      if (dungeonId !== 0) {
        return this.updateInstance(heroId, randomDungeon.id, randomDungeon.name, randomDungeon.image);
      }
      return this.createInstance(heroId, randomDungeon.id, randomDungeon.name, randomDungeon.image);
    });
  }

  createInstance(heroId, dungeonId, name, image) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO dungeoninstance(heroId, dungeonId, scoutedObstacles, removedObstacles, name, image) VALUES(?,?,?,?,?,?);';

      this.conn.query(query, [heroId, dungeonId, 0, 0, name, image], (err, res) => {
        if (err) return reject(new Error(500));
        if (res === undefined) return reject(new Error(400));

        return resolve(new DungeonInstance(parseInt(heroId, 10), parseInt(dungeonId, 10), 0, 0, name, image));
      });
    });
  }

  updateInstance(heroId, dungeonId, name, image) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM dungeoninstance WHERE heroId = ?;';
      this.conn.query(query, [heroId], (err) => {
        if (err) return reject(new Error(500));
        return resolve('ok');
      });
    }).then(() => this.createInstance(heroId, dungeonId, name, image));
  }

  async dungeonInstance(heroId) {
    if (!heroId || Number.isNaN(Number(heroId))) return Promise.reject(new Error(400));

    const check = await this.heroService.heroExists(heroId);
    return new Promise((resolve, reject) => {
      if (check !== 1) {
        reject(new Error(400));
        return;
      }
      const query = 'SELECT * FROM dungeoninstance WHERE heroId = ?;';
      this.conn.query(query, [Number(heroId)], (err, res) => {
        err ? reject(new Error(500)) : resolve(res[0]);
      });
    }).then((res) => {
      if (res === undefined) return this.randomDungeonInstance(heroId, 0);
      return new DungeonInstance(res.heroId, res.dungeonId, res.scoutedObstacles, res.removedObstacles, res.name, res.image);
    }).then(async (res) => {
      const dungeon = await this.getDungeonData(res.dungeonId);
      const unknown = { name: '?' };
      const result = dungeon.obstacles.map((e, i) => {
        delete e.dungeonId;
        if (i < res.obstacles) return e;
        return unknown;
      });
      res.obstacles = result;
      return res;
    });
  }

  async collect(heroId) {
    if (!heroId || Number.isNaN(Number(heroId))) return Promise.reject(new Error(400));
    const result = {
      changed: [],
      added: [],
      removed: [],
    };
    const dungeonInstance = await this.dungeonInstance(parseInt(heroId, 10));
    const dungeon = await this.getDungeonData(dungeonInstance.dungeonId);

    if (dungeonInstance.removedObstacles === dungeon.obstacles.length) {
      dungeon.rewards.forEach(async (e) => {
        const temp = await this.equipmentService.copyEquipment(e, heroId);
        result.added.push(temp);
      });
      await this.randomDungeonInstance(heroId, dungeon.id);
    } else {
      return Promise.reject(new Error(412));
    }
    return Promise.resolve(result);
  }

  checkFinalWords(heroId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT finalWords FROM heroes WHERE id = ?;';
      this.conn.query(query, [heroId], (err, rows) => {
        if (err) {
          reject(new Error('Please provide existing hero'));
        } else if (rows[0].finalWords) {
          reject(new Error('The hero already said his share'));
        } else {
          resolve(rows[0]);
        }
      });
    });
  }

  async updateWords(heroId, words) { //eslint-disable-line
    const check = await this.checkFinalWords(heroId);
    if (check.finalWords === null) {
      return new Promise((resolve, reject) => {
        const query = 'UPDATE heroes SET finalWords = ? WHERE id = ?;';
        this.conn.query(query, [
          words,
          heroId,
        ], (err, row) => {
          err ? reject(err) : resolve(row);
        });
      });
    }
  }

  async scoutedInstance(heroId) {
    if (!heroId || Number.isNaN(Number(heroId))) return Promise.reject(new Error(400));
    const check = await this.heroService.heroExists(heroId);
    return new Promise((resolve, reject) => {
      if (check !== 1) {
        reject(new Error(400));
        return;
      }
      const query = 'SELECT scoutedObstacles FROM dungeoninstance WHERE heroId = ?;';
      this.conn.query(query, [Number(heroId)], (err, res) => {
        err ? reject(new Error(500)) : resolve(res[0].scoutedObstacles);
      });
    });
  }

  updateInstanceDb(heroId, dungeonId, scoutedObstacles, removedOBstacles, name, image) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE dungeoninstance SET dungeonId = ?, scoutedObstacles = ?, removedOBstacles = ?, name = ?, image = ? WHERE heroId = ?;'; // eslint-disable-line
      this.conn.query(query, [
        dungeonId,
        scoutedObstacles,
        removedOBstacles,
        name,
        image,
        heroId,
      ], (err) => {
        if (err) return reject(new Error(500));
        return resolve('ok');
      });
    });
  }

  async updateScoutedObstacles(heroId, time) {
    const oldScoutedObstacles = await this.scoutedInstance(heroId);
    const oldTime = await this.heroService.getIdleTimestamp(heroId);
    let query = '';
    return new Promise((resolve, reject) => {
      if (time >= 1) {
        query = `UPDATE dungeoninstance SET scoutedObstacles = ${oldScoutedObstacles + time} WHERE (heroId = ?);`;
        this.conn.query(query, [heroId], (err) => {
          if (err) {
            reject(err);
          } else {
            query = 'UPDATE idleStatus SET timestamp = ? WHERE heroId = ?;';
            this.conn.query(query, [oldTime[0].timestamp + (time * 60), heroId], (error, row) => {
              if (error) {
                reject(new Error(500));
                return;
              }
              resolve(row);
            });
          }
        });
      } else {
        resolve(null);
      }
    });
  }
}

module.exports = DungeonService;
