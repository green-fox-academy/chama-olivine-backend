class DeadOrAliveSerice {
  constructor(getIdFromToken, conn) {
    this.getIdFromToken = getIdFromToken;
    this.conn = conn;
    this.toBeOrNotToBe = this.toBeOrNotToBe.bind(this);
    this.toBeOrNotToBeSoft = this.toBeOrNotToBeSoft.bind(this);
  }

  toBeOrNotToBe(req, res, next) {
    const heroId = Number(req.headers.heroid);
    new Promise(() => {
      const query = 'SELECT healthact FROM heroes WHERE id = ?;';
      this.conn.query(query, [heroId], (err, rows) => { //eslint-disable-line
        if (err) {
          return res.status(400).json(err);
        } else if (rows[0].healthact === 0) {
          res.status(400).json(err);
        } else {
          return next();
        }
      });
    }).catch(error => res.status(400).json(error.message));
  }

  toBeOrNotToBeSoft(req, res, next) {
    const heroId = Number(req.headers.heroid);
    new Promise(() => {
      const query = 'SELECT healthact FROM heroes WHERE id = ?;';
      this.conn.query(query, [heroId], (err, rows) => { //eslint-disable-line
        if (err) {
          return res.status(400).json(err);
        } else if (rows[0].healthact === 0) {
          req.headers.idleActionIsDisabled = true;
          return next();
        } else {
          return next();
        }
      });
    }).catch(error => res.status(400).json(error.message));
  }
}

module.exports = DeadOrAliveSerice;
