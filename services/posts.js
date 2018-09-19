'use strict';
var fs = require('fs');
var firstline = require('firstline')
var GenericService = require('./generic')

function devMode() {
  return process.env.NODE_ENV !== undefined &&
    process.env.NODE_ENV.toLowerCase().startsWith('dev');
}

function validateAndParse(line) {
  try {
    var line = line.substring(3).trim();
    var info = JSON.parse(line)
  } catch (e) {
    if (devMode()) {
      console.log(e)
    }
  }
  return info;
}

class PostService extends GenericService {

  constructor() {
    super();
    this.BASE_POST_LOC = '/posts/';
    this._initializePosts();
  }

  _initializePosts() {
    var posts = [];
    var postDir = __dirname + '/../views/posts';
    var promises = [];
    fs.readdirSync(postDir).forEach(view => {
      let post = postDir + '/' + view;
      var data = fs.readFileSync(post);
      var firstline = data.toString().split('\n')[0];
      var p = validateAndParse(firstline);
      p.view = postDir + '/' + view.slice(0, -4);
      if (!p.url) p.url = p.number;
      p.url = this.BASE_POST_LOC + p.url;
      if (p !== null) {
        posts.push(p);
      }
    })
    posts.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    posts.map((post, i) => {
      post.number = i + 1
      return posts;
    });
    posts.sort((a, b) => b.number - a.number)
    console.log(posts)
    this.all = posts;
  }

  _filterForTag(tag) {
    return this.all
      .filter(val => typeof val.tags !== 'undefined')
      .filter(val => Array.isArray(val))
      .filter(val => val.tags.indexOf(tag) >= 0)
  }

  _filterForCategory(category) {
    return this.all.filter(val => val.category && val.category === category);
  }

  _removeExamples() {
    this.all = this.all.filter(val => !val.location.toLowerCase().startsWith('example'))
  }

}

module.exports = new PostService();