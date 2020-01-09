class Equipment {
  constructor(name, modifier, type, active) {
    this.name = name;
    this.type = type;
    this.active = active;
    this.modifiers = modifier;
  }
}

module.exports = {
  Equipment,
};
