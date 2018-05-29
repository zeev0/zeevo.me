'use strict';
var fs = require('fs');
var firstline = require('firstline')
var GenericService = require('./generic')

class ProjectService extends GenericService {

  constructor() {
    super();
    this.BASE_PROJECT_LOC = '/projects/';
    this._initialize();
  }

  _initialize() {
    var posts = [];
    var postDir = __dirname + '/../views/projects';
    fs.readdirSync(postDir).forEach(project => {
      let postLoc = postDir + '/' + project + '/info.json';
      let proj = require(postLoc);
      proj.url = this.BASE_PROJECT_LOC + proj.url
      posts.push(proj)
    })
    posts.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
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

module.exports = new ProjectService();