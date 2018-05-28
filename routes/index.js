'use strict';
var router = require('express').Router();
var fs = require('fs');
var path = require('path');
var request = require('request');
var moment = require('moment');
var posts = require('../services/posts');
var projects = require('../services/projects')
var onlyUnique = require('../utils/utils').onlyUnique

const BASE_POST_LOC = '/posts/';

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
  var len = posts.all.length;
  var latest = posts.all[len - 1];
  res.render(latest.view, {
    post: latest,
    cur: latest.number,
    prev: +latest.number - 1,
    next: +latest.number + 1,
    total: posts.all.length
  });
});

router.get('/wintermute', (req, res, next) => {
  res.redirect('/projects/wintermute');
})

router.get('/about', (req, res, next) => {
  res.render('about');
})

router.get('/posts', (req, res, next) => {
  let entries = posts.all.concat(projects.all).sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  })
  res.render('archive', {
    posts: entries,
    title: "Archive"
  })
})

router.get('/projects', (req, res, next) => {
  res.render('posts', {
    posts: projects.all,
    title: "Projects"
  })
})

posts.all.forEach(post => {
  let route = BASE_POST_LOC + post.url;
  let next, prev;
  let n = posts.all.indexOf(post) + 1
  let p = posts.all.indexOf(post) - 1
  if (n < posts.all.length) next = BASE_POST_LOC + posts.all[n].url
  if (p >= 0) prev = BASE_POST_LOC + posts.all[p].url
  router.get(route, (req, res, nxt) => {
    res.render('posts/' + post.number, {
      post: post,
      cur: post.url,
      prev: prev,
      next: next,
      total: posts.all.length
    })
  })
})

posts.getAuthors()
  .concat(projects.getAuthors())
  .filter(onlyUnique)
  .forEach(author => {
    var entries = posts.getByAuthor(author)
      .concat(projects.getByAuthor(author))
      .sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      })
    router.get('/authors/' + author, (req, res, next) => {
      res.render('authors/zeevo', {
        posts: entries
      })
    })
  });

projects.all.forEach(post => {
  var route = post.location;
  router.get('/' + route, (req, res, next) => {
    res.render(route + '/view', {
      guilds: guilds,
      post: post
    })
  })
})

router.get('/posts/random', (req, res, next) => {
  var random = posts.all[Math.floor(Math.random() * posts.all.length)]
  res.redirect('/posts/' + random.number)
})

module.exports = router;