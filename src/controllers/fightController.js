class FightController {
  constructor(fightService) {
    this.fightService = fightService;
    this.fight = this.fight.bind(this);
  }

  fight(req, res) {
    this.fightService.fight(req.headers.heroid)
      .then(data => res.status(200).json(data))
      .catch((err) => {
        if (err === 'Error: The requested hero doesn\'t exist') {
          err.message = 412;
        }
        const errorResponse = {
          400: 'Please enter a valid heroId',
          412: 'The requested hero doesn\'t exist',
          410: 'Your hero is gone!',
          500: 'Unknown error, please try again later',
        };
        res.status(err.message).json(errorResponse[err.message]);
      });
  }
}

module.exports = FightController;
