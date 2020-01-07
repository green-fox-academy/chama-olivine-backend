const { Hero } = require('../models/heroModel');

class HeroService {
  constructor(conn) {
    this.conn = conn;
  }
  getHeroes(id) {
    return new Promise((resolve, reject) => {
      if (Number.isNaN(Number(id))) {
        resolve([]);
        return;
      }
      const query = 'SELECT * FROM heroes WHERE userId = ?;';

      this.conn.query(query, [id], (err, row) => {
        err ? reject(err) : resolve(row);
      });
    });
  }

  heroExistsCheck(heroName, userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM heroes INNER JOIN users ON heroes.userId = users.id WHERE users.id = ? AND heroes.name = ?;';

      this.conn.query(query, [userId, heroName], (err, row) => {
        err ? reject(err) : resolve(row.length);
      });
    });
  }

  createHero(heroName, userId) {
    return new Promise((resolve, reject) => {
      if (heroName && userId) {
        const query = 'INSERT INTO heroes (name, userId) VALUES (?, ?);';

        this.conn.query(query, [heroName, userId], (err, row) => {
          err ? reject(err) : resolve(new Hero(row.insertId, heroName, userId));
        });
        return;
      }
      reject(new Error('DB Fail'));
    });
  }

  async addHero(heroName, userId) {
    const check = await this.heroExistsCheck(heroName, userId);

    return new Promise((resolve, reject) => {
      if (check === 1) {
        resolve({ Message: 'Sorry, this name is already in use!' });
      }
      this.createHero(heroName, userId)
        .then(newHero => resolve(newHero),
          error => reject(error));
    });
  }
}

module.exports = HeroService;
