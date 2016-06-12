// app/models/order.js
// grab the mongoose module
var mongoose = require('mongoose');
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);

var Currency = mongoose.Types.Currency;

// define my order schema
var orderSchema = new Schema({
	purchaseDate:  
	{
		type: Date,
		default: Date.now
	},
	ProviderId:  
	{
		type: Number,
		required: true
	}
	brandsId:  [Number],
	orderPrice:  { type: Currency },
	taxes:  { type: Currency },
	totalOrderPrice:  { type: Currency },
	paymentForm: String,
	dueDates: 
	[
		{ 
			date: Date, 
			value: { type: Currency },
			paymentStatus: Boolean
		}
	]	
});

// define my order model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Order', orderSchema);