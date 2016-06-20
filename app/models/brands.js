'use strict';
// app/models/brands.js
// grab the mongoose module
var mongoose = require('mongoose'),
    Promise = require('bluebird'),
    Schema = mongoose.Schema,
    AutoIncrement = require('mongoose-sequence');

// define my brand schema
var brandSchema = new Schema({
    _id: Number,
    name: {
        type: String,
        unique: true,
        required: true
    }
}, { _id: false });

brandSchema.plugin(AutoIncrement);

var Brands = mongoose.model('Brands', brandSchema);
Promise.promisifyAll(Brands);
Promise.promisifyAll(Brands.prototype);

exports.Brands = Brands;