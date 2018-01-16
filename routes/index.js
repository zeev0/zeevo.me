'use strict';
var router = require('express').Router();

var fs = require('fs');
var path = require('path');
var request = require('request');
var moment = require('moment');
var posts = require('../services/posts');

var guilds = 0;

function createRoutes(map, topic) {
  posts.all.forEach(post => {
    var route = '/' + topic + '/' + post.location;
    router.get(route, (req, res, next) => {
      res.render('posts/' + route + '/view', {
        post: post,
        title: topic.charAt(0).toUpperCase() + topic.slice(1)
      })
    })
  })
}

function getGuilds() {
  request('http://amas.us.to:8888/wintermute', (err, res, body) => {
    if (err) {
      console.log(err);
      return;
    }
    guilds = JSON.parse(body).guilds;
  })
}

getGuilds();
var minutes = 30;
var interval = minutes * 60 * 1000;
setInterval(getGuilds, interval);

var flatposts = posts.all.reverse().slice(0, 5); // display a maximum of 5 posts on homepage

router.get('/', (req, res, next) => {
  res.render('index', {
    posts: flatposts
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
  res.render('posts', {
    posts: posts.all,
    title: "Archive"
  })
})

router.get('/films', (req, res, next) => {
  res.render('posts', {
    posts: posts.films,
    title: "Films"
  })
})

router.get('/blog', (req, res, next) => {
  res.render('posts', {
    posts: posts.blog,
    title: "Blog"
  })
})

router.get('/other', (req, res, next) => {
  res.render('posts', {
    posts: posts.other,
    title: "Other"
  })
})

createRoutes(posts.other, 'other');
createRoutes(posts.films, 'films');
createRoutes(posts.blog, 'blog');

module.exports = router;