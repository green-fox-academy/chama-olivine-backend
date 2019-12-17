class Hero {
  constructor(name, userId) {
    this.userId = userId;
    this.name = name;
    this.experience = 0;
    this.level = 1;
    this.healthmax = 500;
    this.healthact = 500;
    this.attackmin = 1;
    this.attackmax = 5;
    this.defense = 1;
    this.inventory = [];
    this.finalWords = 'Feck! Arse! Drink!';
  }
}

module.exports = {
  Hero,
};
