class DungeonInstance {
  constructor(heroId, dungeonId, obstacles, removedObstacles, name, image) {
    this.heroId = heroId;
    this.dungeonId = dungeonId;
    this.obstacles = obstacles;
    this.removedObstacles = removedObstacles;
    this.name = name;
    this.image = image;
  }
}

module.exports = {
  DungeonInstance,
};
