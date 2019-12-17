const loginService = require('../services/registration');

const loginController = (req, res) => {
  if (req.body.username && req.body.password) {
    const reqUsernamePw = {
      username: req.body.username,
      password: req.body.password,
    };
    loginService.authorizeUser(reqUsernamePw)
      .then((data) => {
        const dataJSON = {
          userId: data,
        };
        res.status(200).json(dataJSON);
      }).catch((error) => {
        error = {
          message: 'Incorrect Username and/or Password!',
        };
        res.status(400).send(error);
      });
  } else {
    const notEnteredDataError = {
      message: 'Please enter a Username and a Password!',
    };
    res.status(400).send(notEnteredDataError);
  }
};

module.exports = {
  loginController,
};
