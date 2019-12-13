const registrationService = require('../services/registration');

const registrationController = (req, res) => {
  registrationService.createUser(req.body)
    .then(data => res.status(200).json(data), rejected =>
      res.status(rejected.message).json(`You made a ${rejected.message} error`));
};

module.exports = {
  registrationController,
};
