const { Hero } = require('../models/heroModel');

class HeroController {
  constructor(heroService, getIdFromToken) {
    this.heroService = heroService;
    this.getHeroes = this.getHeroes.bind(this);
    this.postHero = this.postHero.bind(this);
    this.getHeroById = this.getHeroById.bind(this);
    this.getIdFromToken = getIdFromToken;
  }

  getHeroes(req, res) {
    this.heroService.getHeroes(this.getIdFromToken(req))
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json(error));
  }

  postHero(req, res) {
    const heroInput = {
      userId: Number(this.getIdFromToken(req)),
      name: req.body.name,
      smallImage: req.body.smallImage,
      bigImage: req.body.bigImage,
    };
    if (heroInput.userId && heroInput.name) {
      const hero = new Hero(heroInput);
      this.heroService.addHero(hero)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).json(error.message));
    } else {
      res.status(400).json({ error: 'Please provide a username and a userId' });
    }
  }

  getHeroById(req, res) {
    const heroId = Number(req.params.heroId);
    if (!Number.isNaN(heroId)) {
      this.heroService.retrieveHeroById(heroId).then(
        (response) => {
          res.status(200).json(response);
        },
        (error) => {
          res.status(400).json({ Error: error.message });
        });
    } else {
      res.status(400).json({ Error: 'Please provide a Hero ID' });
    }
  }
}

module.exports = HeroController;
