// app/models/provider.js
// grab the mongoose module
var mongoose = require('mongoose');

// define my provider schema
var providerSchema = new Schema({
	name:  String,
	contact: 
	[
		{ 
			name: String, 
			phone: String,
			email: String
		}
	],
	brandsId: [Number]
});

// define my provider model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Provider', providerSchema);