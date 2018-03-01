'use strict';
var fs = require('fs');
var firstline = require('firstline')

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

class PostService {

  constructor() {
    this._initializePosts();
    // if (!devMode()) {
    //   this._removeExamples();
    // }
  }

  _initializePosts() {
    var posts = [];
    var postDir = __dirname + '/../views/posts';
    var promises = [];
    fs.readdirSync(postDir).forEach(view => {
      let post = postDir + '/' + view
      var data = fs.readFileSync(post);
      var firstline = data.toString().split('\n')[0];
      var p = validateAndParse(firstline);
      p.number = view.split('.')[0]
      if (p !== null) {
        posts.push(p)
      }
    })
    this.all = posts;
  }

  getByAuthor(author) {
    return this.all.filter(val => val.author === category);
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