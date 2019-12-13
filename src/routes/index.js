const express = require('express');

const router = express.Router();

const helloWorldController = require('../controllers/hello-world');
const heroController = require('../controllers/hero-list');

router.get('/helloworld', helloWorldController.helloWorldController);

router.get('/heroes', heroController.getHeroes);

module.exports = router;
