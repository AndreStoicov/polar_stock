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

brandSchema.statics.getAll = function(cb) {
    return this.find({}, cb);
}

brandSchema.statics.findAndUpdate = function(brand_id, value, callback) {
    var q = this.where({ _id: brand_id });
    console.log(q);
q.update({ $set: { name: value }}).exec()

    


}

// define my brands model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Brands', brandSchema);
