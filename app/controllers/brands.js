var express = require('express'),
	router = express.Router();

var Brands = require(appRoot +'/app/models/brands');

router.get('/', function(req, res) {  
	Brands.getAll(function(err, brands) {
	    if (err)
	    	res.send(err);
	    res.json(brands);
	});  
});

router.post('/', function(req, res){	
	const brand = new Brands({
		name : req.body.name
	});
	
	brand.save(function(err, brand){		
		if(err)
			res.send(err);
		res.json({ message: 'brand created!' });
	});
});

module.exports = router;