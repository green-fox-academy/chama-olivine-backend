const mockdb = {
  query: (qstring, values, callback) => {
    // GET /heroes
    if (qstring === 'SELECT * FROM heroes WHERE userId = ?;' && values[0] === '3') callback(null, []);
    if (qstring === 'SELECT * FROM heroes WHERE userId = ?;' && values[0] === '2') {
      callback(null, [{
        id: 3,
        name: 'hero3',
        experience: 1,
        level: 1,
        healthmax: 1,
        healthact: 1,
        attackmin: 1,
        attackmax: 1,
        defense: 1,
        finalWords: 'Fuck off!',
        userId: 2,
      },
      {
        id: 4,
        name: 'hero4',
        experience: 1,
        level: 1,
        healthmax: 1,
        healthact: 1,
        attackmin: 1,
        attackmax: 1,
        defense: 1,
        finalWords: 'Fuck off!',
        userId: 2,
      }]);
    }
    // POST /hero
    if (qstring === 'SELECT * FROM heroes INNER JOIN users ON heroes.userId = users.id WHERE users.id = ? AND heroes.name = ?;') {
      if (values[0] === 1 && values[1] === 'hero1') callback(null, [1]);
      if (values[0] === 2 && values[1] === 'Bela') callback(null, []);
    }
    if (qstring === 'INSERT INTO heroes (name, userId) VALUES (?, ?);' && values[0] === 'Bela' && values[1] === 2) {
      callback(null, {
        id: undefined,
        userId: 2,
        name: 'Bela',
        experience: 0,
        level: 1,
        healthmax: 500,
        healthact: 500,
        attackmin: 1,
        attackmax: 5,
        defense: 1,
        inventory: [],
        finalWords: 'Feck! Arse! Drink!',
      });
    }
    // POST register
    if (qstring === 'SELECT * FROM users WHERE username = ?;') {
      if (values[0] === undefined) callback(null, 123);
      if (values[0] === 'Attila') callback(null, []);
      if (values[0] === 'Attilaöüóőúűá?/!+()=ÜÖ') callback(null, []);
      if (values[0] === 'Daniel') {
        callback(null, [{
          id: 1,
          username: 'Daniel',
          password: 'xxxx5555',
        }]);
      }
    }
    if (qstring === 'INSERT INTO users (username, password) VALUES (?, ?);') callback(null, { insertId: 1 });
  },
};

module.exports = mockdb;
