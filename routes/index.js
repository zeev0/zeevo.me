'use strict';
var router = require('express').Router();
var fs = require('fs');
var path = require('path');
var request = require('request');
router.get('*', (req, res, next) => {
  res.render('index', {
    href: 'https://zeevo.io' + req.path,
  })
})

module.exports = router;