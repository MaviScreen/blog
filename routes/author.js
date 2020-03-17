'use strict';

const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send('AUTHOR PAGE');
});

module.exports = router;
