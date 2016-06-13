// app/models/brands.js
// grab the mongoose module
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

// define my brand schema
var brandSchema = new Schema({
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

brandSchema.plugin(autoIncrement.plugin, {
    model: 'Brands',
    field: '_id',
    startAt: 0,
    incrementBy: 1
});
// define my brands model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Brands', brandSchema);