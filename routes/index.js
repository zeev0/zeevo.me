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

var posts = []
var postDir = __dirname + '/../views/posts'
fs.readdirSync(postDir).forEach(file => {
    // blog
    let blogDir = postDir + '/blog'
    fs.readdirSync(blogDir).forEach(file => {
        let post = require(blogDir + '/' + file + '/info.json')
        posts.push(post)
        router.get('/' + post.location, (req, res, next) => {
            res.render(post.location + '/view', {
                post: post
            })
        })
    })

    // movie reviews
    // other stuff
});


router.get('/', (req, res, next) => {
    res.render('index', {
        homeSelected: 'selected',
        posts: posts
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

router.get('/posts', (req, res, next) => {
    res.render('posts', {
        posts: posts
    })
})

module.exports = router;