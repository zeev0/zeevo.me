fs = require('fs');

class PostService {

    constructor() {
        var posts = [];
        var postDir = __dirname + '/../views/posts';
        fs.readdirSync(postDir).forEach(parent => {
            let dir = postDir + '/' + parent
            fs.readdirSync(dir).forEach(file => {
                let post = require(dir + '/' + file + '/info.json');
                posts.push(post);
            })
        });
        var postmap = {};
        var years = posts.map(x => x.date.slice(-2));
        years = years.filter((ele, pos) => {
            return years.indexOf(ele) == pos;
        });
        years.sort().reverse();
        years.forEach(x => {
            postmap[x] = [];
        });
        posts.forEach(x => {
            var yr = x.date.slice(-2);
            postmap[yr].push(x);
        });

        Object.keys(postmap).forEach(key => {
            postmap[key].sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            })
        });

        this.posts = postmap;
        this.blog = this._filterfor(postmap, 'blog');
        this.films = this._filterfor(postmap, 'films');
        this.other = this._filterfor(postmap, 'other');
    }

    _filterfor(map, category) {
        var result = {};
        Object.keys(map).forEach(key => {
            var yr = this.posts[key];
            var entry = yr.filter(val => val.category === category)
            if (entry.length) {
                result[key] = entry
            }
        });
        return result;
    }

}

module.exports = new PostService();