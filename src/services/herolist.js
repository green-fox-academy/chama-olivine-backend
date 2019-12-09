const heroList = [{
  userId: 1,
  name: 'hero1',
  experience: 1,
  level: 1,
  healthmax: 1,
  healthact: 1,
  attackmin: 1,
  attackmax: 1,
  defense: 1,
  inventory: [],
  finalWords: 'Fuck off!',
},
{
  userId: 1,
  name: 'hero2',
  experience: 1,
  level: 1,
  healthmax: 1,
  healthact: 1,
  attackmin: 1,
  attackmax: 1,
  defense: 1,
  inventory: [],
  finalWords: 'Fuck off!',
},
{
  userId: 2,
  name: 'hero3',
  experience: 1,
  level: 1,
  healthmax: 1,
  healthact: 1,
  attackmin: 1,
  attackmax: 1,
  defense: 1,
  inventory: [],
  finalWords: 'Fuck off!',
},
{
  userId: 2,
  name: 'hero4',
  experience: 1,
  level: 1,
  healthmax: 1,
  healthact: 1,
  attackmin: 1,
  attackmax: 1,
  defense: 1,
  inventory: [],
  finalWords: 'Fuck off!',
}];

const getHeroes = id => new Promise((resolve) => {
  const heroesOfUser = [];

  heroList.forEach((e) => {
    if (e.userId === parseInt(id, 10)) {
      heroesOfUser.push(e);
    }
  });

  resolve(heroesOfUser);
});

module.exports = {
  getHeroes,
};
