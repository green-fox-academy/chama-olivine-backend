const registrationService = require('../services/registration');

const registrationController = (req, res) => {
  registrationService.createUser(req.body)
    .then(data => res.status(200).json(data));
};

module.exports = {
  registrationController,
};
