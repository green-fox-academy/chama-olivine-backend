const mockdb = {
  query: (qstring, values, callback) => {
    if (qstring === 'SELECT * FROM heroes INNER JOIN idleStatus ON heroes.id = idleStatus.heroId WHERE userId = ?;') {
      if (values[0] === 3) callback(null, []);
      if (values[0] === 1) {
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
          type: 'rest',
          timestamp: 0,
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
          type: 'rest',
          timestamp: 0,
        }]);
      }
    }
    if (qstring === 'SELECT * FROM heroes INNER JOIN users ON heroes.userId = users.id WHERE users.id = ? AND heroes.name = ?;') {
      if (values[0] === 1 && values[1] === 'hero1') callback(null, [1]);
      if (values[0] === 1 && values[1] === 'Bela') callback(null, []);
    }
    if (qstring === 'INSERT INTO heroes (name, experience, level, healthmax, healthact, attackmin, attackmax, defense, finalWords, userId, smallImage, bigImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);' && values[0] === 'Bela' && values[9] === 1) { //eslint-disable-line
      callback(null, { insertId: '5' });
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
    if (qstring === 'SELECT * FROM heroes WHERE id = ?; SELECT name, id, type, active FROM equipment WHERE heroId = ?; SELECT equipmentId, attributeName, value FROM equipment JOIN equipmentAttributes ON equipment.id = equipmentAttributes.equipmentId JOIN attributeModifier ON attributeModifier.id = equipmentAttributes.attributeId WHERE heroId = ?; SELECT * FROM idleStatus WHERE heroId = ?;') { //eslint-disable-line
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
          [
            { type: 'rest', timestamp: 0 },
          ],
        ]);
      }
      if (values[0] === 90) callback(null, [[], [], []]);
    }
    if (qstring === 'SELECT * FROM equipment WHERE id = ?;') {
      if (values[0] === undefined || values[0] === 91) callback(null, []);
      if (values[0] === 4) {
        callback(null, [{
          id: 4,
          name: 'Spear of incompetent developers',
          type: 'Left Hand',
          active: 0,
          heroId: 2,
        }]);
      }
      if (values[0] === 9) {
        callback(null, [{
          id: 9,
          name: 'Sword',
          type: 'Bollocks',
          active: 0,
          heroId: 1,
        }]);
      }
    }
    if (qstring === 'SELECT * FROM equipment WHERE heroId = ? AND type = ? AND active = 1;') {
      if (values[0] === 1 && values[1] === 'Bollocks') callback(null, []);
      if (values[0] === 2 && values[1] === 'Left Hand') {
        callback(null, [{
          id: 1,
          name: 'Sword of minor bullshit',
          type: 'Left Hand',
          active: 0,
        }]);
      }
    }
    if (qstring === 'UPDATE equipment SET active = ? WHERE id = ?;') callback(null, null);
    if (qstring === 'SELECT * FROM heroes WHERE id = ?;') {
      if (values[0] === '300') {
        callback(null, '');
      } else {
        callback(null, 'a');
      }
    }
    if (qstring === 'SELECT * FROM dungeons;') {
      callback(null, [{
        id: 2, name: 'dungeon2', image: null,
      }]);
    }
    if (qstring === 'INSERT INTO dungeoninstance(heroId, dungeonId, scoutedObstacles, removedObstacles, name, image) VALUES(?,?,?,?,?,?);') { // eslint-disable-line
      if (values[0] === 'asd') callback(null, undefined);
      callback(null, 'ok');
    }
    if (qstring === 'SELECT * FROM dungeoninstance WHERE heroId = ?;') {
      if (values[0] === 4) {
        callback(null, [{
          heroId: 4,
          dungeonId: 2,
          obstacles: [{ name: '?' }],
          removedObstacles: 0,
          name: 'dungeon2',
          image: null,
        }]);
      }
      if (values[0] === 1) {
        callback(null, [{
          heroId: 1,
          dungeonId: 3,
          obstacles: [{ name: '?' }],
          removedObstacles: 1,
          name: 'dungeon3',
          image: null,
        }]);
      }
      if (values[0] === 300 || values[0] === 2) callback(null, '');
    }
    if (qstring === 'SELECT * FROM dungeons WHERE id = ?; SELECT * FROM dungeonobstacles INNER JOIN dungeons ON dungeons.id = dungeonobstacles.dungeonId INNER JOIN obstacles ON dungeonobstacles.obstacleId = obstacles.id WHERE dungeonId = ?; SELECT * FROM dungeonrewards INNER JOIN dungeons ON dungeons.id = dungeonrewards.dungeonId INNER JOIN equipment ON dungeonrewards.equipmentId = equipment.id WHERE dungeonId = ?;') {// eslint-disable-line
      callback(null, [[{
        id: 2,
        name: 'dungeon2',
        image: null,
      }], [{
        dungeonId: 3,
        obstacleId: 1,
        name: 'asd',
        healthmax: 10,
        attackmin: 10,
        attackmax: 10,
        defense: 10,
        experience: 10,
        images: 'asd',
        id: 0,
      }], [{
        dungeonId: 3,
        equipmentId: 1,
        name: 'Sword of minor bullshit',
        type: 'LeftHand',
        active: 0,
        heroId: 2,
        images: 'asd',
        id: 0,
      }]]);
    }
    if (qstring === 'DELETE FROM dungeoninstance WHERE heroId = ?;') callback(null, '');
    if (qstring === 'INSERT INTO equipment(name, type, active, heroId) VALUES(?,?,?,?);') callback(null, { insertId: 394 });
    if (qstring === 'SELECT * FROM idleStatus WHERE heroId = ?;') {
      if (values[0] === '1') callback(null, []);
      if (values[0] === '2') callback(null, ['ok']);
      if (values[0] === '3') callback(null, [{ type: 'rest' }]);
      if (values[0] === '5') callback(null, []);
    }
    if (qstring === 'INSERT INTO idleStatus(heroId, type, timestamp) VALUES(?, ?, ?);') callback(null, 'ok');
    if (qstring === 'UPDATE idleStatus SET type = ?, timestamp = ? WHERE heroId = ?;') callback(null, 'ok');
    if (qstring === 'SELECT * FROM heroes WHERE id = ?; SELECT name, id, type, active FROM equipment WHERE heroId = ?; SELECT equipmentId, attributeName, value FROM equipment JOIN equipmentAttributes ON equipment.id = equipmentAttributes.equipmentId JOIN attributeModifier ON attributeModifier.id = equipmentAttributes.attributeId WHERE heroId = ?;') callback('error', 'a'); //eslint-disable-line
    if (qstring === 'SELECT * FROM heroes WHERE id = ?; SELECT name, id, type, active FROM equipment WHERE heroId = ?; SELECT equipmentId, attributeName, value FROM equipment JOIN equipmentAttributes ON equipment.id = equipmentAttributes.equipmentId JOIN attributeModifier ON attributeModifier.id = equipmentAttributes.attributeId WHERE heroId = ?; SELECT * FROM idleStatus WHERE heroId = ?;') { //eslint-disable-line
      if (values[0] === '1') {
        callback(null, [
          [
            {
              id: 1,
              name: 'hero1',
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
          [
            { type: 'rest' },
          ],
        ]);
      }
      if (values[0] === '2') {
        callback(null, [
          [
            {
              id: 2,
              name: 'hero2',
              experience: 1,
              level: 1,
              healthmax: 1,
              healthact: 0,
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
          [
            { type: 'rest' },
          ],
        ]);
      }
      if (values[0] === '111') {
        callback(null, [
          [
            {
              id: 111,
              name: 'hero111',
              experience: 0,
              level: 1,
              healthmax: 20,
              healthact: 20,
              attackmin: 20,
              attackmax: 20,
              defense: 20,
              finalWords: 'ok',
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
          [
            { type: 'rest' },
          ],
        ]);
      }
      if (values[0] === '222') {
        callback(null, [
          [
            {
              id: 222,
              name: 'hero222',
              experience: 0,
              level: 1,
              healthmax: 20,
              healthact: 20,
              attackmin: 0,
              attackmax: 0,
              defense: 200,
              finalWords: 'ok',
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
          [
            { type: 'rest' },
          ],
        ]);
      }
    }
    if (qstring === 'SELECT * FROM dungeoninstance WHERE heroId = ?;') {
      if (values[0] === 1) {
        callback(null, [{
          heroId: 1,
          dungeonId: 2,
          obstacles: [{ name: '?' }],
          removedObstacles: 1,
          name: 'dungeon2',
          image: '',
        }]);
      }
      if (values[0] === 2) {
        callback(null, [{
          heroId: 2,
          dungeonId: 2,
          obstacles: [{ name: '?' }],
          removedObstacles: 0,
          name: 'dungeon2',
          image: '',
        }]);
      }
      if (values[0] === 111) {
        callback(null, [{
          heroId: 111,
          dungeonId: 111,
          obstacles: [{ name: '?' }],
          removedObstacles: 0,
          name: 'dungeon111',
          image: '',
        }]);
      }
      if (values[0] === 222) {
        callback(null, [{
          heroId: 222,
          dungeonId: 222,
          obstacles: [{ name: '?' }],
          removedObstacles: 0,
          name: 'dungeon222',
          image: '',
        }]);
      }
    }
    if (qstring === 'SELECT * FROM dungeons WHERE id = ?; SELECT * FROM dungeonobstacles INNER JOIN dungeons ON dungeons.id = dungeonobstacles.dungeonId INNER JOIN obstacles ON dungeonobstacles.obstacleId = obstacles.id WHERE dungeonId = ?; SELECT * FROM dungeonrewards INNER JOIN dungeons ON dungeons.id = dungeonrewards.dungeonId INNER JOIN equipment ON dungeonrewards.equipmentId = equipment.id WHERE dungeonId = ?;') { //eslint-disable-line
      if (values[0] === '1') {
        callback(null, [[{
          id: 2,
          name: 'dungeon2',
          image: '',
        }], [{
          dungeonId: 2,
          obstacleId: 1,
          name: 'asd',
          healthmax: 10,
          attackmin: 10,
          attackmax: 10,
          defense: 10,
          experience: 10,
          images: 'asd',
          id: 0,
        }], [{
          dungeonId: 2,
          equipmentId: 1,
          name: 'Sword of minor bullshit',
          type: 'LeftHand',
          active: 0,
          heroId: 2,
          images: 'asd',
          id: 0,
        }]]);
      }
      if (values[0] === '2') {
        callback(null, [[{
          id: 2,
          name: 'dungeon2',
          image: '',
        }], [{
          dungeonId: 2,
          obstacleId: 1,
          name: 'asd',
          healthmax: 10,
          attackmin: 10,
          attackmax: 10,
          defense: 10,
          experience: 10,
          images: 'asd',
          id: 0,
        }], [{
          dungeonId: 2,
          equipmentId: 1,
          name: 'Sword of minor bullshit',
          type: 'LeftHand',
          active: 0,
          heroId: 2,
          images: 'asd',
          id: 0,
        }]]);
      }
      if (values[0] === '111') {
        callback(null, [[{
          id: 111,
          name: 'dungeon111',
          image: '',
        }], [{
          dungeonId: 111,
          obstacleId: 111,
          name: 'enemy111',
          healthmax: 20,
          attackmin: 0,
          attackmax: 0,
          defense: 0,
          experience: 20,
          images: '',
          id: 0,
        }], [{
          dungeonId: 2,
          equipmentId: 1,
          name: 'Sword of minor bullshit',
          type: 'LeftHand',
          active: 0,
          heroId: 2,
          images: '',
          id: 0,
        }]]);
      }
      if (values[0] === '222') {
        callback(null, [[{
          id: 222,
          name: 'dungeon222',
          image: '',
        }], [{
          dungeonId: 222,
          obstacleId: 222,
          name: 'enemy222',
          healthmax: 20,
          attackmin: 0,
          attackmax: 0,
          defense: 200,
          experience: 20,
          images: '',
          id: 0,
        }], [{
          dungeonId: 2,
          equipmentId: 1,
          name: 'Sword of minor bullshit',
          type: 'LeftHand',
          active: 0,
          heroId: 2,
          images: 'asd',
          id: 0,
        }]]);
      }
    }
    if (qstring === 'SELECT scoutedObstacles FROM dungeoninstance WHERE heroId = ?;') {
      if (values[0] === 1) {
        callback(null, [2]);
      }
      if (values[0] === 2) {
        callback(null, [0]);
      }
      if (values[0] === 111) {
        callback(null, [0]);
      }
      if (values[0] === 222) {
        callback(null, [0]);
      }
    }
  },
};

module.exports = mockdb;
