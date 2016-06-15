'use strict';

var mongoose = require("mongoose"),
    autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.connect('mongodb://localhost:27017/Polar_test');
autoIncrement.initialize(connection);

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';


beforeEach(function (done) {


  function clearDB() {
    for (var i in mongoose.connection.collections) {      
      mongoose.connection.collections[i].remove(function() {});
    }
    return done();
  }
});


afterEach(function (done) {
  mongoose.disconnect();
  return done();
});