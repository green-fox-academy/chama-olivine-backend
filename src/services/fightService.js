const modifiedAttributes = ['attackmin', 'attackmax', 'healthmax', 'defense'];

class FightService {
  constructor(conn, heroService, dungeonService) {
    this.conn = conn;
    this.heroService = heroService;
    this.dungeonService = dungeonService;
  }

  async fight(heroId) {
    if (Number.isNaN(Number(heroId))) return Promise.reject(new Error(412));
    const hero = await this.heroService.retrieveHeroById(heroId);
    const dungeonInstance = await this.dungeonService.dungeonInstance(heroId);
    const dungeon = await this.dungeonService.getDungeonData(dungeonInstance.dungeonId);
    let scoutedObstacles = await this.dungeonService.scoutedInstance(heroId);
    let fightLog = [];
    let fightResponse = [];
    if (hero.healthact === 0) return Promise.reject(new Error(410));
    if (dungeonInstance.removedObstacles === dungeon.obstacles.length) {
      return new Promise((resolve) => {
        resolve(fightResponse = [fightLog = ['No enemy left']]);
      });
    }
    let currentObstacle = dungeon.obstacles[dungeonInstance.removedObstacles];
    if (currentObstacle.healthmax <= 0) {
      currentObstacle = dungeon.obstacles[dungeonInstance.removedObstacles += 1];
      scoutedObstacles += 1;
    }
    const heroHealthAtStart = hero.healthact;
    let obstacleHealthAtStart;
    if (currentObstacle) {
      obstacleHealthAtStart = currentObstacle.healthmax;
    }
    let failFight = 0;
    let fight = true;
    let alive = true;

    do {
      if (hero.healthact > 0) {
        this.activateBonus(hero);
        const damage = Math.max(this.attack(hero.attackmin, hero.attackmax, currentObstacle.defense), 0);
        currentObstacle.healthmax -= damage;
        fightLog.push(`${hero.name}(${hero.healthact} HP) hits ${currentObstacle.name} for ${damage}`);
        this.deactivateBonus(hero);
      } else {
        fightLog.push(`${hero.name} died!`);
        fight = false;
        alive = false;
        break;
      }
      if (currentObstacle.healthmax > 0) {
        this.activateBonus(hero);
        const damage = Math.max(this.attack(currentObstacle.attackmin, currentObstacle.attackmax, hero.defense), 0);
        hero.healthact -= damage;
        fightLog.push(`${currentObstacle.name}(${currentObstacle.healthmax} HP) hits ${hero.name} for ${damage}`);
        this.deactivateBonus(hero);
      } else {
        fight = false;
        fightLog.push(`${currentObstacle.name} died!`);
        break;
      }
      if (heroHealthAtStart === hero.healthact && obstacleHealthAtStart === currentObstacle.healthmax) {
        failFight += 1;
      }
    }

    while (fight === true && failFight < 20);

    if (failFight >= 20) {
      if (scoutedObstacles === dungeonInstance.removedObstacles) {
        scoutedObstacles += 1;
      }
      this.dungeonService.updateInstanceDb(heroId, dungeonInstance.dungeonId, scoutedObstacles, dungeonInstance.removedObstacles, dungeonInstance.name, dungeonInstance.image); // eslint-disable-line
      const updatedInstance = await this.dungeonService.dungeonInstance(heroId);
      fightResponse.push(fightLog, hero, updatedInstance);
      return Promise.resolve(fightResponse);
    }
    if (alive) {
      dungeonInstance.removedObstacles += 1;
      scoutedObstacles += 1;
      hero.experience += currentObstacle.experience;
      this.levelUp(hero);
      this.heroService.updateHero(hero);
      this.dungeonService.updateInstanceDb(heroId, dungeonInstance.dungeonId, scoutedObstacles, dungeonInstance.removedObstacles, dungeonInstance.name, dungeonInstance.image); // eslint-disable-line
      const updatedInstance = await this.dungeonService.dungeonInstance(heroId);
      fightResponse.push(fightLog, hero, updatedInstance);
    } else {
      hero.healthact = 0;
      fightResponse.push(fightLog, hero, dungeonInstance);
      this.heroService.updateHero(hero);
    }

    return new Promise((resolve, reject) => {
      if (fightResponse.length > 0) {
        resolve(fightResponse);
      } else {
        reject(new Error());
      }
    });
  }

  attack(min, max, def) { // eslint-disable-line
    const damage = (Math.floor((Math.random() * ((max - min) + 1)) + min)) - def;
    return damage;
  }

  xpToLvl(level) { // eslint-disable-line
    let calced = 0;
    for (let i = 0; i <= level + 1; i += 1) {
      calced += i;
    }
    return calced;
  }

  levelUp(hero) { // eslint-disable-line
    const startingLevel = hero.level;
    let neededExp = this.xpToLvl(hero.level) - (hero.experience);
    while (neededExp <= 0) {
      hero.level += 1;
      neededExp = this.xpToLvl(hero.level) - (hero.experience);
      if (startingLevel < hero.level) {
        hero.healthmax += 1;
        hero.attackmin += 1;
        hero.attackmax += 1;
      }
    }
  }

  totalAttributeModifier(hero, attribute) { // eslint-disable-line
    return hero.inventory.filter(equipment => equipment.active === true)
      .map(equipment => equipment.modifiers.filter(modifier => modifier.attributeName === attribute)).reduce((flattenedArrays, mods) => flattenedArrays.concat(mods), []) // eslint-disable-line
      .reduce((finalValue, modifier) => finalValue + modifier.value, 0);
  }

  activateBonus(hero) {
    modifiedAttributes.forEach((attribute) => {
      hero[attribute] += this.totalAttributeModifier(hero, attribute);
    });
  }

  deactivateBonus(hero) {
    modifiedAttributes.forEach((attribute) => {
      hero[attribute] -= this.totalAttributeModifier(hero, attribute);
    });
  }
}

module.exports = FightService;
