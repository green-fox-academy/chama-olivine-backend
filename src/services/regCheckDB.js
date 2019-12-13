const users = require('../dummy/userDB');

const checkUserName = (input) => {
  const user = /^[A-Za-z0-9]\w{0,}$/;
  if (input && user.test(input)) {
    return true;
  }
  return false;
};

const checkPassword = (input) => {
  const passw = /^[A-Za-z0-9]\w{7,}$/;
  if (input && passw.test(input)) {
    return true;
  }
  return false;
};

const containsUser = (obj) => {
  const userNames = users.getNames(users.userDB);
  for (let i = 0; i < userNames.length; i += 1) {
    if (userNames[i] === obj.username) {
      return true;
    }
  }
  return false;
};

module.exports = {
  checkUserName,
  checkPassword,
  containsUser,
};
