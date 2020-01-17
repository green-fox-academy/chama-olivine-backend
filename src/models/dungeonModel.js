class Dungeon {
  constructor(id, name, obstacles, rewards, image) {
    this.id = id;
    this.name = name;
    this.obstacles = obstacles;
    this.rewards = rewards;
    this.image = image;
  }
}

module.exports = {
  Dungeon,
};
