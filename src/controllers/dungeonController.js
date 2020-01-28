class DungeonController {
  constructor(dungeonService) {
    this.dungeonService = dungeonService;
    this.getDungeonInstance = this.getDungeonInstance.bind(this);
    this.collectReward = this.collectReward.bind(this);
    this.postFinalWords = this.postFinalWords.bind(this);
  }

  getDungeonInstance(req, res) {
    this.dungeonService.dungeonInstance(req.headers.heroid)
      .then(data => res.status(200).json(data))
      .catch((err) => {
        const errorResponse = {
          400: 'Please enter a valid heroId',
          500: 'Unknown error, please try again later',
        };
        res.status(err.message).json(errorResponse[err.message]);
      });
  }

  collectReward(req, res) {
    this.dungeonService.collect(req.headers.heroid)
      .then(data => res.status(200).json(data))
      .catch((err) => {
        const errorResponse = {
          400: 'Please enter a valid heroId',
          412: 'Dungeon not finished yet',
          500: 'Unknown error, please try again later',
        };
        res.status(err.message).json(errorResponse[err.message]);
      });
  }

  postFinalWords(req, res) {
    if (req.headers.heroid && req.body.words) {
      this.dungeonService.updateWords(req.headers.heroid, req.body.words)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).json(error.message));
    } else {
      res.status(400).json({ error: 'Please provide final words' });
    }
  }
}

module.exports = DungeonController;
