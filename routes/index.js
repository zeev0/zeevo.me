var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var request = require('request')

var guilds = 0;
getGuilds = function () {
    request('http://amas.us.to:8888/wintermute', (err, res, body) => {
        if (err) {
            console.log(err);
            return;
        }
        guilds = JSON.parse(body).guilds;
    })
}
getGuilds();
var minutes = 30,
    interval = minutes * 60 * 1000;
setInterval(getGuilds, interval);

router.get('/', (req, res, next) => {
    res.render('index', {
        homeSelected: 'selected',
    });
});

router.get('/wintermute', (req, res, next) => {
    res.render('wintermute', {
        wintermuteSelected: 'selected',
        guilds: guilds
    });
})

router.get('/about', (req, res, next) => {
    res.render('about');
})

module.exports = router;