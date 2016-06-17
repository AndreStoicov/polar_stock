'use strict';
// server.js

// modules =================================================
var express = require('express'),
    path = require('path'),    
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var app = express();

// configuration ===========================================

// config files
var db = require('./config/database');

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters 
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
global.appRoot = path.resolve(__dirname);

app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'jade');

// routes ==================================================
app.use('/api/brands', require('./app/controllers/brands'))

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);
console.log("App listening on port " + port);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);
    res.json({
        error: 'Not found'
    });
    return;
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// error handlers
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: err.message
    });
    return;
});

// expose app           
exports = module.exports = app;
