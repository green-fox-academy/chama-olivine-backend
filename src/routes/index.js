const express = require('express');

const router = express.Router();

const helloWorldController = require('../controllers/hello-world');
const { getHeroes, postHero } = require('../controllers/hero-list');
const registrationController = require('../controllers/registrationController');
const loginController = require('../controllers/loginController');

router.get('/helloworld', helloWorldController.helloWorldController);

router.post('/login', loginController.loginController);

router.post('/hero', postHero);

router.get('/heroes', getHeroes);

router.post('/register', registrationController.registrationController);

module.exports = router;
