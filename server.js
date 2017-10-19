/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    methodOverride = require('method-override');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/img/robot.png'));
app.use(express.static(path.join(__dirname, 'public')));

routes.forEach(function (entry) {
    app.get(entry.name, entry.func)
})

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});