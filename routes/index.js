'use strict';
var router = require('express').Router();
router.get('*', (req, res, next) => {
  res.redirect(`https://shaneoneill.io${req.originalUrl}`)
})

module.exports = router;