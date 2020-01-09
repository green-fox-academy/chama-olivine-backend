const express = require('express');

const router = express.Router();
const { conn } = require('../services/connectToDB');

const helloWorldController = require('../controllers/hello-world');
const HeroController = require('../controllers/heroController');
const HeroService = require('../services/heroService');
const RegistrationController = require('../controllers/registrationController');
const RegistrationService = require('../services/registrationService');
const LoginController = require('../controllers/loginController');
const LoginService = require('../services/loginService');

let useddb = conn;

if (process.env.NODE_ENV === 'test') {
  useddb = require('../services/mockDb'); // eslint-disable-line
}

const heroService = new HeroService(useddb);
const heroController = new HeroController(heroService);
const registrationService = new RegistrationService(useddb);
const registrationController = new RegistrationController(registrationService);
const loginService = new LoginService(useddb, registrationService);
const loginController = new LoginController(loginService);

router.get('/helloworld', helloWorldController.helloWorldController);

router.post('/login', loginController.login);

router.post('/hero', heroController.postHero);

router.get('/heroes', heroController.getHeroes);

router.get('/hero/:heroId', heroController.getHeroById);

router.post('/register', registrationController.register);

module.exports = router;
