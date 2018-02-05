'use strict';
var fs = require('fs');

function devMode() {
  return process.NODE_ENV == undefined || process.env.NODE_ENV.toLowerCase().startsWith('dev')
}

class PostService {

  constructor() {
    this._initializePosts();
    this.blog = this._filterfor('blog');
    this.films = this._filterfor('films');
    this.other = this._filterfor('other');
    if (!devMode()) {
      console.log('Running in development mode');
      this._removeExamples();
    }
  }

  _initializePosts() {
    var posts = [];
    var postDir = __dirname + '/../views/posts';
    fs.readdirSync(postDir).forEach(parent => {
      let dir = postDir + '/' + parent
      fs.readdirSync(dir).forEach(file => {
        let post = require(dir + '/' + file + '/info.json');
        posts.push(post);
      })
    });
    posts.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    })
    this.all = posts
  }

  getByAuthor(author) {
    return this.all.filter(val => val.author === category);
  }

  _filterfor(category) {
    return this.all.filter(val => val.category === category);
  }

  _removeExamples() {
    this.all = this.all.filter(val => !val.location.toLowerCase().startsWith('example'))
    this.blog = this._filterfor('blog');
    this.films = this._filterfor('films');
    this.other = this._filterfor('other');
  }

}

module.exports = new PostService();