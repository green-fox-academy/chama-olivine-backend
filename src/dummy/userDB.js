const userDB = [{
  userId: 0,
  username: 'Daniel',
  password: 'xxxx5555',
  heroes: ['lvl 40 Human Paladin'],
},
{
  userId: 1,
  username: 'Vivien',
  password: 'xxxx6666',
  heroes: ['lvl 45 succubus'],
}];

const getNames = (list) => {
  const array = [];
  for (let i = 0; i < list.length; i += 1) {
    array.push(list[i].username);
  }
  return array;
};

module.exports = {
  userDB,
  getNames,
};
