'use strict';
// app/models/brands.js
// grab the mongoose module
var mongoose = require('mongoose'),
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

// define my brands model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Brands', brandSchema);
