

class Hero {
  constructor(hero) {
    const defaults = {
      experience: 1,
      level: 1,
      healthmax: 1,
      healthact: 1,
      attackmin: 1,
      attackmax: 1,
      defense: 1,
      inventory: [],
      finalWords: null,
      smallImage: null,
      bigImage: null,
    };
    const opts = Object.assign({}, defaults, hero);

    this.id = opts.id;
    this.userId = opts.userId;
    this.name = opts.name;
    this.experience = opts.experience;
    this.level = opts.level;
    this.healthmax = opts.healthmax;
    this.healthact = opts.healthact;
    this.attackmin = opts.attackmin;
    this.attackmax = opts.attackmax;
    this.defense = opts.defense;
    this.inventory = opts.inventory;
    this.finalWords = opts.finalWords;
    this.smallImage = opts.smallImage;
    this.bigImage = opts.bigImage;
  }
}

module.exports = {
  Hero,
};

