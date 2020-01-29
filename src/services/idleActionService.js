class IdleActionService {
  constructor(conn) {
    this.conn = conn;
  }

  setIdleStatus(heroId, type) {
    const currentTime = Number((new Date() / 1000).toFixed(0));

    return new Promise((resolve, reject) => {
      if (Number.isNaN(Number(heroId))) reject(new Error(400));
      if (type !== 'rest' && type !== 'scout' && type !== 'train') reject(new Error(400));
      const query = 'SELECT * FROM idleStatus WHERE heroId = ?;';

      this.conn.query(query, [heroId], (err, row) => {
        if (err) reject(new Error(500));
        resolve(row);
      });
    }).then((row) => {
      let values;
      let query;
      return new Promise((resolve, reject) => {
        if (row.length === 0) {
          query = 'INSERT INTO idleStatus(heroId, type, timestamp) VALUES(?, ?, ?);';
          values = [heroId, type, currentTime];
        } else if (row[0].type !== type) {
          query = 'UPDATE idleStatus SET type = ?, timestamp = ? WHERE heroId = ?;';
          values = [type, currentTime, heroId];
        } else {
          resolve('same status already exist');
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
