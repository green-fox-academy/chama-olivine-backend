const heroService = require('../services/herolist');
const { addHero } = require('../services/herolist');

const getHeroes = (req, res) => {
  heroService.getHeroes(req.headers.userid)
    .then((data) => {
      res.status(200).json(data);
    });
};

const postHero = (req, res) => {
  const { userId, heroName } = { userId: Number(req.headers.userid), heroName: req.body.name };
  if (userId && heroName) {
    addHero(heroName, userId)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).json(error.message);
      });
  } else {
    res.status(400).json({ error: 'Please provide a username and a userId' });
  }
};

module.exports = {
  postHero,
  getHeroes,
};
