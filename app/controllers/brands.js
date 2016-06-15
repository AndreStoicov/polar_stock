var express = require('express'),
	router = express.Router();
var log = require(appRoot + '/app/utils/logger');

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
	
	brand.save(function(err){		
		if(err)
		{
			console.log(log);
			log.log('fatal',err.errmsg);
			res.json({ error: err });
		}	
		//log.info('the Brand' + brand + 'was sucessfuly created.')
		res.json({ message: 'brand created!' });
	});
});

module.exports = router;