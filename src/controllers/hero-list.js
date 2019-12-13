const heroService = require('../services/herolist');

const getHeroes = (req, res) => {
  heroService.getHeroes(req.headers.userid)
    .then((data) => {
      res.status(200).json(data);
    });
};

module.exports = {
  getHeroes,
};
