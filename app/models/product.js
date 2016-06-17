'use strict';
// app/models/product.js
// grab the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productsSchema = new Schema({
	name:  String,
	brandId: { type: Number, required: true }
	varieties: 
	[
		{ 
			_id: { type: Number, required: true, unique: true },
			description: String, 
			size: Number,
			sizeDescription: String
		}
	]
});

// define my product model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Products', productsSchema);