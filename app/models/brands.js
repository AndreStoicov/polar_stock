// app/models/brands.js
// grab the mongoose module
var mongoose = require('mongoose');

// define my brand schema
var brandSchema = new mongoose.Schema({
	name:  
	{
		type: String,
		unique: true,
		required: true
	}	
});

brandSchema.statics.getAll = function (cb) {
  return this.find({}, cb);
}

// define my brands model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Brands', brandSchema);