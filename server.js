// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

// configuration ===========================================
    
// config files
var db = require('./config/database');

// set our port
var port = process.env.PORT || 8080; 

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
var connection = mongoose.connect(db.url);
autoIncrement.initialize(connection);

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 
global.appRoot = path.resolve(__dirname);

// routes ==================================================
app.use('/api/brands', require('./app/controllers/brands'))

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               
console.log("App listening on port " + port);

// catch 404 and forward to error handler
app.use(function(req, res, next){
    res.status(404);
    res.json({ 
    	error: 'Not found' 
    });
    return;
});

// error handlers
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({ 
    	error: err.message 
    });
    return;
});

// expose app           
exports = module.exports = app;    