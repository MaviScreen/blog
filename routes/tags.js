'use strict';

const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send('TAGS PAGE');
});

module.exports = router;
