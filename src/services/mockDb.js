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
    }
    if (qstring === 'SELECT * FROM heroes INNER JOIN users ON heroes.userId = users.id WHERE users.id = ? AND heroes.name = ?;') {
      if (values[0] === 1 && values[1] === 'hero1') callback(null, [1]);
      if (values[0] === 1 && values[1] === 'Bela') callback(null, []);
    }
    if (qstring === 'INSERT INTO heroes (name, experience, level, healthmax, healthact, attackmin, attackmax, defense, finalWords, userId, smallImage, bigImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);' && values[0] === 'Bela' && values[9] === 1) { //eslint-disable-line
      callback(null, {
        id: undefined,
        userId: 1,
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
            { type: 'rest' },
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
        id: 2, name: 'dungeon2', image: 'data:image/png;base64,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', // eslint-disable-line
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
          image: 'data:image/png;base64,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' // eslint-disable-line
        }]);
      }
      if (values[0] === 1) {
        callback(null, [{
          heroId: 1,
          dungeonId: 3,
          obstacles: [{ name: '?' }],
          removedObstacles: 1,
          name: 'dungeon3',
          image: 'data:image/png;base64,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' // eslint-disable-line
        }]);
      }
      if (values[0] === 300 || values[0] === 2) callback(null, '');
    }
    if (qstring === 'SELECT * FROM dungeons WHERE id = ?; SELECT * FROM dungeonobstacles INNER JOIN dungeons ON dungeons.id = dungeonobstacles.dungeonId INNER JOIN obstacles ON dungeonobstacles.obstacleId = obstacles.id WHERE dungeonId = ?; SELECT * FROM dungeonrewards INNER JOIN dungeons ON dungeons.id = dungeonrewards.dungeonId INNER JOIN equipment ON dungeonrewards.equipmentId = equipment.id WHERE dungeonId = ?;') {// eslint-disable-line
      callback(null, [[{
        id: 2,
        name: 'dungeon2',
        image: 'data:image/png;base64,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' // eslint-disable-line
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
