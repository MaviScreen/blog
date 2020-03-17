'use strict';

const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send(req.query.s);
  console.log(req.query.s);
});

module.exports = router;
