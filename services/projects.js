'use strict';
var fs = require('fs');
var firstline = require('firstline')


class ProjectService {

  constructor() {
    this._initialize();
  }

  _initialize() {
    var posts = [];
    var postDir = __dirname + '/../views/projects';
    fs.readdirSync(postDir).forEach(project => {
      let postLoc = postDir + '/' + project + '/info.json';
      posts.push(require(postLoc))
    })
    posts.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
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

module.exports = new ProjectService();