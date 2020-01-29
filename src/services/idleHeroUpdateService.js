class IdleHeroUpdateService {
  constructor(conn, heroService, dungeonService) {
    this.conn = conn;
    this.heroService = heroService;
    this.dungeonService = dungeonService;
    this.characterStatUpdate = this.characterStatUpdate.bind(this);
    this.checkElapsedTime = this.checkElapsedTime.bind(this);
  }

  checkElapsedTime(heroId) {
    const currentTime = parseInt((new Date() / 1000), 10);
    const query = 'SELECT timestamp FROM idleStatus WHERE heroId = ?;';
    return new Promise((resolve, reject) => {
      this.conn.query(query, [heroId], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(parseInt(((currentTime - rows[0].timestamp) / 60), 10));
      });
    });
  }

  async characterStatUpdate(req, res, next) {
    if (process.env.NODE_ENV === 'test') {
      next();
    } else {
      const heroId = req.headers.heroid;
      const idleAction = await this.heroService.getIdleAction(heroId);
      this.checkElapsedTime(heroId).then(async (time) => {
        if (idleAction[0].type === 'rest') {
          await this.heroService.updateCurrentHp(heroId, time);
        } else if (idleAction[0].type === 'scout') {
          await this.dungeonService.updateScoutedObstacles(heroId, time);
        }
        next();
      }).catch((err) => {
        res.status(500).send(err);
      });
    }
  }
}

module.exports = IdleHeroUpdateService;
