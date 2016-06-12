var express = require('express');
var router = express.Router();

var db = require(appRoot +'/config/database');
var Brands = require(appRoot +'/app/models/brands');

router.get('/all', function(req, res) {
	
	Brands.find(function (err, brands) {
		console.log('routes brand');
		if (!err) {
			return res.json(brands);
		} else {
			res.statusCode = 500;
							
			return res.json({ 
				error: 'Server error' 
			});
		}
	});
});

module.exports = router;