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
const EquipmentController = require('../controllers/equipmentController');
const EquipmentService = require('../services/equipmentService');
const Authentication = require('../services/authenticationService');

let useddb = conn;
let accTokSec = process.env.ACCESS_TOKEN_SECRET;
let refTokSec = process.env.REFRESH_TOKEN_SECRET;

if (process.env.NODE_ENV === 'test') {
  useddb = require('../services/mockDb'); //eslint-disable-line
  accTokSec = '3ca2df3b128063ce5e891075332bb143d59f9811a5143da5403029c0518beaaca0c1d837bd4ed2065529277fa9f7dda7c456ef2d72a3f20c165ed18fa20e1fb1'; //eslint-disable-line
  refTokSec = 'b59ccc3eaf3cde30e9f410a6524a8179f2962ea90f7d40b956c20412b339b3e21645dfd9c5d3397b58f2adcd6e9e3c40c5293e9749c7ee340eb264b8ff27ca31'; //eslint-disable-line
}

const auth = new Authentication(accTokSec, refTokSec);
const heroService = new HeroService(useddb);
const heroController = new HeroController(heroService, Authentication.getIdFromToken);
const registrationService = new RegistrationService(useddb);
const registrationController = new RegistrationController(registrationService);
const loginService = new LoginService(useddb, registrationService, auth.generateAccessToken, auth.generateRefreshToken);
const loginController = new LoginController(loginService);
const equipmentService = new EquipmentService(useddb);
const equipmentController = new EquipmentController(equipmentService);

router.get('/helloworld', helloWorldController.helloWorldController);

router.post('/login', loginController.login);

router.post('/hero', auth.authenticateToken, heroController.postHero);

router.get('/heroes', auth.authenticateToken, heroController.getHeroes);

router.get('/hero/:heroId', auth.authenticateToken, heroController.getHeroById);

router.post('/register', registrationController.register);

router.post('/hero/use', auth.authenticateToken, equipmentController.use);

router.post('/getToken', auth.RefreshedToken);

module.exports = router;
