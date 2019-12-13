const dbService = require('../services/regCheckDB');
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

module.exports = {
  createUser,
};
