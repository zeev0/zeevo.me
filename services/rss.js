var posts = require('./posts');
var utils = require('../utils/utils');
var RSS = require('rss');

var base = 'https://zeevo.me';

var feed = new RSS({
  title: 'zeevo.me',
  description: '',
  feed_url: base + '/posts/feed.rss',
  site_url: base,
  image_url: base + 'img/authors/zeevo.png',
  managingEditor: 'zeevo',
  webMaster: 'zeevo',
  language: 'en',
  pubDate: 'April 5, 2018',
});

posts.all.forEach(post => {
  feed.item(utils.convertPostToRss(post));
});

module.exports = feed;