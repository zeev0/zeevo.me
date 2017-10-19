var fs = require('fs');
var path = require('path');

var BLOG_PATH = __dirname + '/../views/blog';

var blogPath = path.join(BLOG_PATH);

if (fs.existsSync(blogPath)) {
    var files = fs.readdirSync(blogPath);
    files = files.filter(ele => {
        return fs.statSync(BLOG_PATH + '/' + ele).isFile();
    })
}

if (!process.env.NODE_ENV || process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'development') {
    // we're in dev
} else {
    // we're in prod
    // filter our wip blog posts
    files = files.filter((ele) => {
        return ele.substr('.wip') > -1;
    })
}

var routes = [];

var blogs = [];
var max = 0;
var latest = null;

if (files)
    files.forEach(function (ele) {
        var cur = parseInt(ele.charAt(0));
        var name = path.parse(ele).name;
        if (cur > max) {
            max = cur;
            latest = ele;
        }
        blogs.push({
            name: '/blog/' + name,
            func: function (req, res) {
                res.render('blog/' + ele, {
                    blogSelected: 'selected',
                    blogs: files
                })
            }
        })
    })

routes = [{
        name: '/',
        func: function (req, res) {
            res.render('index', {
                homeSelected: 'selected',
                blogs: files
            });
        }
    },
    {
        name: '/wintermute',
        func: function (req, res) {
            res.render('wintermute', {
                wintermuteSelected: 'selected',
                blogs: files
            });
        }
    },
    {
        name: '/about',
        func: function (req, res) {
            res.render('about')
        }
    }
]

routes = routes.concat(blogs);

module.exports = routes;