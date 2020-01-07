class HeroController {
  constructor(heroService) {
    this.heroService = heroService;
    this.getHeroes = this.getHeroes.bind(this);
    this.postHero = this.postHero.bind(this);
  }

  getHeroes(req, res) {
    this.heroService.getHeroes(req.headers.userid)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json(error));
  }

  postHero(req, res) {
    const { userId, heroName } = { userId: Number(req.headers.userid), heroName: req.body.name };
    if (userId && heroName) {
      this.heroService.addHero(heroName, userId)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).json(error.message));
    } else {
      res.status(400).json({ error: 'Please provide a username and a userId' });
    }
  }
}

module.exports = HeroController;
