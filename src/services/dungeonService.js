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
        if (err) {
          return reject(new Error(500));
        }
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

        return resolve(new Dungeon(dungeon.id, dungeon.name, obstacles, rewards));
      });
    });
  }

  async newRandomDungeonInstance(heroId) {
    const query = 'SELECT * FROM dungeons;';
    return new Promise((resolve, reject) => {
      this.conn.query(query, [], (err, row) => {
        err ? reject(new Error(500)) : resolve(row);
      });
    }).then((res) => {
      const randomDungeon = res[Math.floor(Math.random() * res.length)];
      return this.createInstance(heroId, randomDungeon.id, 0, 0, randomDungeon.name, randomDungeon.image);
    });
  }

  createInstance(heroId, dungeonId, scouted, removed, name, image) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO dungeoninstance(heroId, dungeonId, scoutedObstacles, removedObstacles, name, image) VALUES(?,?,?,?,?,?);';

      this.conn.query(query, [heroId, dungeonId, scouted, removed, name, image], (err, res) => {
        if (err) {
          return reject(new Error(500));
        }
        if (res === undefined) {
          return reject(new Error(400));
        }

        return resolve(new DungeonInstance(parseInt(heroId, 10), parseInt(dungeonId, 10), scouted, removed, name, image));
      });
    });
  }

  async dungeonInstance(heroId) {
    if (!heroId || Number.isNaN(Number(heroId))) {
      return Promise.reject(new Error(400));
    }

    const check = await this.heroService.heroExists(heroId);
    return new Promise((resolve, reject) => {
      if (check !== 1) {
        reject(new Error(400));
        return;
      }
      const query = 'SELECT * FROM dungeoninstance WHERE heroId = ?;';
      this.conn.query(query, [heroId], (err, res) => {
        err ? reject(new Error(500)) : resolve(res[0]);
      });
    }).then((res) => {
      if (res === undefined) {
        return this.newRandomDungeonInstance(heroId);
      }
      return new DungeonInstance(res.heroId, res.dungeonId, res.scoutedObstacles, res.removedObstacles, res.name, res.image);
    }).then(async (res) => {
      const dungeon = await this.getDungeonData(res.dungeonId);
      const unknown = { name: '?' };
      const result = dungeon.obstacles.map((e, i) => {
        if (i < res.scoutedObstacles) {
          return e;
        }
        return unknown;
      });
      res.obstacles = result;
      return res;
    });
  }
}

module.exports = DungeonService;
