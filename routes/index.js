var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var request = require('request')

var guilds = 0;
getGuilds = function () {
    request('http://amas.us.to:8888/wintermute', (err, res, body) => {
        if (err) {
            console.log(err);
            return;
        }
        guilds = JSON.parse(body).guilds;
    })
}
getGuilds();
var minutes = 30,
    interval = minutes * 60 * 1000;
setInterval(getGuilds, interval);

var posts = []
var postDir = __dirname + '/../views/posts'
fs.readdirSync(postDir).forEach(parent => {
    try {
        let dir = postDir + '/' + parent
        fs.readdirSync(dir).forEach(file => {
            let post = require(dir + '/' + file + '/info.json');
            posts.push(post);
            let route = '/posts/' + parent;
            console.log(route + '/' + post.location);
            let template = route + '/' + file + '/view';
            template = template.splice(1);
            router.get(route + '/' + post.location, (req, res, next) => {
                res.render(template, {
                    post: post
                })
            })
        })
    } catch (e) {}
});


router.get('/', (req, res, next) => {
    res.render('index', {
        homeSelected: 'selected',
        posts: posts
    });
});

router.get('/wintermute', (req, res, next) => {
    res.render('wintermute', {
        wintermuteSelected: 'selected',
        guilds: guilds
    });
})

router.get('/about', (req, res, next) => {
    res.render('about');
})

var postmap_proper = new Map();
var years = posts.map(x => x.date.slice(-2));
years = years.filter((ele, pos) => {
    return years.indexOf(ele) == pos;
});
years.sort().reverse();
years.forEach(x => {
    postmap_proper.set(x, []);
});
posts.forEach(x => {
    var yr = x.date.slice(-2);
    postmap_proper.get(yr).push(x);
});
postmap_proper.forEach((val, key) => {
    val.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    })
});

postmap = {};
postmap_proper.forEach((v, k) => {
    postmap[k] = v;
});

function post_page(topic) {
    router.get('/posts/' + topic, (req, res, next) => {
        let map = {};
        postmap_proper.forEach((val, key) => {
            lst = val.filter(x => {
                return x.category === topic;
            })
            if (lst.length) {
                map[key] = lst;
            }
        })
        res.render('posts', {
            postmap: map,
            title: topic.charAt(0).toUpperCase() + topic.slice(1)
        })
    })
}

post_page('blog');
post_page('films');
post_page('other')

router.get('/posts', (req, res, next) => {
    res.render('posts', {
        postmap: postmap,
        title: "Archive"
    })
})

module.exports = router;