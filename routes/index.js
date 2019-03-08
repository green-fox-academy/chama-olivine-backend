const express = require('express');

const router = express.Router();

router.get('/helloworld', (req, res) => {
  res.status(200).send({
    message: 'Hello World!',
  });
});

module.exports = router;
