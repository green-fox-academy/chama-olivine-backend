const { heroes } = require('../dummy/heroes');
const { Hero } = require('../models/heroModel');

const getHeroes = id => new Promise((resolve) => {
  const heroesOfUser = [];

  heroes.forEach((e) => {
    if (e.userId === parseInt(id, 10)) {
      heroesOfUser.push(e);
    }
  });

  resolve(heroesOfUser);
});

const createHero = (heroName, userId) => new Promise((resolve, reject) => {
  if (heroName && userId) {
    const newHero = new Hero(heroName, userId);
    heroes.push(newHero);
    resolve(newHero);
  } else {
    reject(new Error('DB Fail'));
  }
});

const heroExistsCheck = (heroName, userId) =>
  heroes.some(
    e => heroName === e.name && userId === e.userId);

const addHero = (heroName, userId) => new Promise((resolve, reject) => {
  if (heroExistsCheck(heroName, userId) === true) {
    resolve({ Message: 'Sorry, this name is already in use!' });
  } else {
    createHero(heroName, userId)
      .then((newHero) => {
        resolve(newHero);
      },
      (error) => {
        reject(error);
      });
  }
});

module.exports = {
  addHero,
  getHeroes,
  heroExistsCheck,
};
