const dbService = require('./regCheckDB');
const users = require('../dummy/userDB');

const createUser = item => new Promise((resolve) => {
  if (!dbService.checkUserName(item.username) || !dbService.checkPassword(item.password)) {
    resolve('Incorrect registration data');
  } else if (item.password !== item.confirmPsw) {
    resolve('Passwords don\'t match');
  } else if (!dbService.containsUser(item)) {
    const user = {
      username: item.username,
      password: item.password,
    };
    users.userDB.push(user);
    resolve(user);
  } else {
    resolve('Username already exists');
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
