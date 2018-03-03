'use strict';
var router = require('express').Router();

var fs = require('fs');
var path = require('path');
var request = require('request');
var moment = require('moment');
var posts = require('../services/posts');

function createRoutes(map, topic) {
  posts.all.forEach(post => {
    var route = '/' + (posts.indexOf(post) + 1) + '/' + post.location;
    console.log(route)
    router.get(route, (req, res, next) => {
      res.render('posts/' + route + '/view', {
        post: post,
        title: topic.charAt(0).toUpperCase() + topic.slice(1)
      })
    })
  })
}

function getGuilds() {
  return 72;
  // request('http://amas.us.to:8888/wintermute', (err, res, body) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   return JSON.parse(body).guilds;
  // })
}

var guilds = getGuilds();

var minutes = 30;
var interval = minutes * 60 * 1000;
setInterval(getGuilds, interval);

// var flatposts = posts.all.reverse().slice(0, 5); // display a maximum of 5 posts on homepage

router.get('/', (req, res, next) => {
  var len = posts.all.length
  var latest = posts.all[len - 1]
  res.render(latest.view, {
    post: latest,
    cur: latest.number,
    prev: latest.number - 1,
    next: null
  });
});

router.get('/wintermute', (req, res, next) => {
  res.render('wintermute', {
    guilds: guilds
  });
})

router.get('/about', (req, res, next) => {
  res.render('about');
})

router.get('/posts', (req, res, next) => {
  res.render('archive', {
    posts: posts.all,
    title: "Archive"
  })
})

posts.all.forEach(post => {
  var route = '/posts/' + post.number;
  console.log(route)
  router.get(route, (req, res, next) => {
    res.render('posts/' + post.number, {
      post: post,
    })
  })
})

module.exports = router;