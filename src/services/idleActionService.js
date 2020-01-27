class IdleActionService {
  constructor(conn) {
    this.conn = conn;
  }

  setIdleStatus(heroId, type) {
    if (Number.isNaN(Number(heroId))) return Promise.reject(new Error(400));
    if (type !== ('rest' || 'scout' || 'train')) {
      return Promise.reject(new Error(400));
    }
    const currentTime = new Date() / 1000;
    let query = 'SELECT * FROM idleStatus WHERE heroId = ?;';
    return new Promise((resolve, reject) => {
      this.conn.query(query, [heroId], (err, row) => {
        if (err) {
          reject(new Error(500));
          return;
        }
        resolve(row);
      });
    }).then((row) => {
      let values;
      return new Promise((resolve, reject) => {
        if (row.length === 0) {
          query =
            'INSERT INTO idleStatus(heroId, type, timestamp) VALUES(?, ?, ?);';
          values = [heroId, type, currentTime];
        } else if (row[0].type !== type) {
          query =
            'UPDATE idleStatus SET type = ?, timestamp = ? WHERE heroId = ?;';
          values = [type, currentTime, heroId];
        } else {
          resolve('ok');
          return;
        }
        this.conn.query(query, values, (err) => {
          err ? reject(new Error(500)) : resolve('idleStatus table has been successfully updated');
        });
      });
    });
  }
}

module.exports = IdleActionService;
