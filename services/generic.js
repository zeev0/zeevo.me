var onlyUnique = require('../utils/utils').onlyUnique

class GenericService {

  getAuthors() {
    return this.all
      .map(post => {
        if (post.author)
          return post.author.toLowerCase();
      })
      .filter(onlyUnique);
  }

  getByAuthor(author) {
    return this.all.filter(val => val.author === author);
  }

}

module.exports = GenericService;