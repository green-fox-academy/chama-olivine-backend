const dbService = require('./regCheckDB');
const users = require('../dummy/userDB');

const createUser = item => new Promise((resolve, reject) => {
  if (!dbService.checkUserName(item.username) || !dbService.checkPassword(item.password)) {
    reject(new Error(400));
  } else if (item.password !== item.confirmPsw) {
    reject(new Error(400));
  } else if (!dbService.containsUser(item)) {
    const user = {
      userId: 1,
      username: item.username,
      password: item.password,
    };
    users.userDB.push(user);
    resolve(user.userId);
  } else {
    reject(new Error(500));
  }
});

const loginUsers = users.userDB;

const authorizeUser = input => new Promise((resolve, reject) => {
  Object.keys(loginUsers).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(loginUsers, key)) {
      const element = loginUsers[key];
      if (element.username === input.username && element.password === input.password) {
        resolve(element.userId);
        return; // eslint-disable-line
      }
    }
  });
  reject(Error(false));
});

module.exports = {
  createUser,
  authorizeUser,
};
