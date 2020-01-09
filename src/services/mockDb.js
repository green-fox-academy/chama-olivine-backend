const mockdb = {
  query: (qstring, values, callback) => {
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
        smallImage: null,
        bigImage: null,
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
        smallImage: null,
        bigImage: null,
      }]);
    }
    if (qstring === 'SELECT * FROM heroes INNER JOIN users ON heroes.userId = users.id WHERE users.id = ? AND heroes.name = ?;') {
      if (values[0] === 1 && values[1] === 'hero1') callback(null, [1]);
      if (values[0] === 2 && values[1] === 'Bela') callback(null, []);
    }
    if (qstring === 'INSERT INTO heroes (name, experience, level, healthmax, healthact, attackmin, attackmax, defense, finalWords, userId, smallImage, bigImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);' && values[0] === 'Bela' && values[9] === 2) { //eslint-disable-line
      callback(null, {
        id: undefined,
        userId: 2,
        name: 'Bela',
        experience: 1,
        level: 1,
        healthmax: 1,
        healthact: 1,
        attackmin: 1,
        attackmax: 1,
        defense: 1,
        inventory: [],
        finalWords: null,
        smallImage: null,
        bigImage: null,
      });
    }
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
    if (qstring === 'SELECT * FROM heroes WHERE id = ?; SELECT name, id, type, active FROM equipment WHERE heroId = ?; SELECT equipmentId, attributeName, value FROM equipment JOIN equipmentAttributes ON equipment.id = equipmentAttributes.equipmentId JOIN attributeModifier ON attributeModifier.id = equipmentAttributes.attributeId WHERE heroId = ?;') { //eslint-disable-line
      if (values[0] === 2) {
        callback(null, [
          [
            {
              id: 2,
              name: 'hero2',
              experience: 1,
              level: 1,
              healthmax: 1,
              healthact: 1,
              attackmin: 1,
              attackmax: 1,
              defense: 1,
              finalWords: 'Fuck off!',
              userId: 1,
              smallImage: null,
              bigImage: null,
            },
          ],
          [
            {
              name: 'Sword of major farts',
              id: 2,
              type: 'Right Hand',
              active: 0,
            },
            {
              name: 'Spear of incompetent developers',
              id: 4,
              type: 'Left Hand',
              active: 0,
            },
            {
              name: 'Bow of major annoyance',
              id: 6,
              type: 'Left Hand',
              active: 0,
            },
          ],
          [
            { equipmentId: 2, attributeName: 'attackmax', value: -11 },
            { equipmentId: 2, attributeName: 'healthmax', value: 12 },
            { equipmentId: 2, attributeName: 'healthmax', value: 5 },
            { equipmentId: 4, attributeName: 'healthmax', value: 12 },
            { equipmentId: 4, attributeName: 'attackmin', value: 11 },
            { equipmentId: 4, attributeName: 'attackmax', value: -11 },
            { equipmentId: 6, attributeName: 'attackmin', value: 8 },
          ],
        ]);
      }
      if (values[0] === 90) callback(null, [[], [], []]);
    }
  },
};

module.exports = mockdb;
