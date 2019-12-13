const dbService = require('../services/regCheckDB');
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

module.exports = {
  createUser,
};
