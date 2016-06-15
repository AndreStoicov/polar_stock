var express = require('express'),
    router = express.Router();

var logger = require(appRoot + '/app/utils/logger');
var Brands = require(appRoot + '/app/models/brands');

router.get('/', function(req, res) {
    Brands.getAll(function(err, brands) {
        if (err) {
            logger.log('error', err.errmsg);
            res.send(err);
        }
        logger.log('debug', JSON.stringify(brands));
        res.json(brands);
    });
});

router.post('/', function(req, res) {
    const brand = new Brands({
        name: req.body.name
    });

    brand.save(function(err) {
        if (err) {
            logger.log('error', err.errmsg);
            return res.send(err);
        }

        logger.log('info', 'the Brand' + brand + ' was sucessfuly created.');
        res.json({ message: 'the Brand' + brand + ' was sucessfuly created.' });
    });
});

module.exports = router;
