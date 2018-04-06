var moment = require('moment');

module.exports = {

  onlyUnique: function (value, index, self) {
    return self.indexOf(value) === index;
  },

  convertPostToRss: function (post) {
    base = 'https://zeevo.me';
    return {
      title: post.title,
      description: post.description || post.summary || post.tagline,
      url: base + '/posts/' + post.number,
      author: post.author,
      date: moment(post.date).format('MMM D, YYYY'),
    }
  }

}