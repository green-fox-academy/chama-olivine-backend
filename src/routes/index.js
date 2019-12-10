const express = require('express');

const router = express.Router();

const helloWorldController = require('../controllers/hello-world');
const heroController = require('../controllers/hero-list');
const registrationController = require('../controllers/registrationController');

router.get('/helloworld', helloWorldController.helloWorldController);

router.get('/heroes', heroController.getHeroes);

router.post('/register', registrationController.registrationController);

module.exports = router;
