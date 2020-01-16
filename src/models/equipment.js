class Equipment {
  constructor(id, name, modifier, type, active) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.active = active;
    this.modifiers = modifier;
  }
}

module.exports = {
  Equipment,
};
