var express = require('express'),
	router = express.Router();

var Brands = require(appRoot +'/app/models/brands');

router.get('/all', function(req, res) {
  
  console.log('chamada');
  
  Brands.getAll(function(err, brands) {
        console.log(brands);
        //res.render('brands', {brands: docs})
  });
  
});

module.exports = router;