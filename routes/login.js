'use strict';

const router = require('express').Router();
const user = require('../models/Users');

router.get('/', (req, res, next) => {
  res.render('login', {
    title: 'Giriş Yap | ' + site_settings.title,
    isLogin: req.session.login
  });
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  user.findOne(req.body, (err, response) => {
    if (err) throw err;
    if (response) {
      req.session.login = true;
      req.session.uid = response._id;
      res.redirect('/');
    } else {
      res.render('login', {
        title: 'Giriş Yap | ' + site_settings.title,
        error_message:
          'Böyle bir kullanıcı bulunamadı, bilgileri kontrol ediniz.'
      });
    }
  });
});

module.exports = router;
