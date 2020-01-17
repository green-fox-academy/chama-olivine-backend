class DungeonController {
  constructor(dungeonService) {
    this.dungeonService = dungeonService;
    this.getDungeonInstance = this.getDungeonInstance.bind(this);
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
}

module.exports = DungeonController;
