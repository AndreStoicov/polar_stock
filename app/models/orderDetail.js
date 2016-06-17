'use strict';
// app/models/orderDetail.js
// grab the mongoose module
var mongoose = require('mongoose');
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);

var Currency = mongoose.Types.Currency;

// define my orderDetail schema
var orderDetailSchema = new Schema({
	orderId:  { type: Number, required: true, unique: true},
	products:
	[
		{
			productId: Number,
			productVarietyId: Number,
			quantity: Number,
			details:
			[
				{
					dueDate: Date,
					ncm: Number,
					cfop: Number,
					soldStatus: Boolean
				}
			],
			totalQuantity: Number,
			basePrice: { type: Currency },
			Pricetaxes: { type: Currency },
			sellingPrice: { type: Currency },
			promotionPrice: { type: Currency },
			promotionApplied : Boolean,
			discountCredcard: Number,
			discountBankSlip: Number,
			finalPriceCredcard: { type: Currency },
			finalPriceBankSlip: { type: Currency },
			profitMarginCredcard: Number,
			profitMarginBankSlip: Number
		}
	]  
});

// define my orderDetail model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('orderDetail', orderDetailSchema);