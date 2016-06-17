'use strict';

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'), //used to manipulate POST
    logger = require(appRoot + '/app/utils/logger'),
    Brands = require(appRoot + '/app/models/brands');

//Any requests to this controller must pass through this 'use' function
router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}));

router.route('/')
    .get(function(req, res, next) {
        Brands.find({}, function(err, brands) {
            if (err) {
                logger.log('error', err.errmsg);
                return console.error(err);
            } else {
                console.log('teste');
                res.format({
                    /*
                    html: function() {
                        res.render('brands/index', {
                            title: 'All brands',
                            "brands": brands
                        });
                    },*/
                    json: function() {
                        logger.log('debug', JSON.stringify(brands));
                        res.json(brands);
                    }
                });
            }
        });
    })
    .post(function(req, res) {
        var name = req.body.name;
        Brands.create({
            name: name
        }, function(err, brand) {
            if (err) {
                logger.log('error', err.errmsg);
                res.send("There was a problem adding new brand to the database. Error: " + err.errmsg);
            } else {
                logger.log('debug', 'POST creating new brands: ' + JSON.stringify(brand));
                res.format({
                    /*
                    html: function() {
                        res.location("brands");
                        res.redirect("/brands");
                    },
                    */
                    json: function() {
                        res.json(brand);
                    }
                });
            }
        });
    });

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    logger.log('debug', 'validating brand-id: ' + id + ' exists');
    Brands.findById(id, function(err, brand) {
        //if it isn't found, we are going to repond with 404        
        if (!brand) {
            logger.log('error', 'brand-id: ' + id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                /*
                html: function() {
                    next(err);
                },
                */
                json: function() {
                    res.json({ message: err.status + ' ' + err });
                }
            });
        } else {
            logger.log('debug', 'brand-id exist in database: ' + brand);
            // once validation is done save the new item in the req
            req.id = id;
            next();
        }
    });
});


router.route('/:id')
    .get(function(req, res) {
        Brands.findById(req.id, function(err, brand) {
            if (err) {
                logger.log('error', 'GET Error: There was a problem retrieving brand by id: ' + err.errmsg);
                return console.error(err);
            } else {
                logger.log('debug', 'GET Retrieving brand ID: ' + brand._id);
                res.format({
                    /*
                    html: function() {
                        res.render('brands/edit', {
                            title: 'Brand ' + brand._id,
                            "brand": brand.name
                        });
                    },
                    */
                    json: function() {
                        res.json(brand);
                    }
                });
            }
        });
    })
    .put(function(req, res) {
        var name = req.body.name;
        Brands.findOneAndUpdate({ _id: req.id }, { $set: { name: name } }, { new: true }, function(err, brand) {
            if (err) {
                logger.log('error', 'PUT There was a problem editing the brand from the database: ' + err.errmsg);
                return console.error(err);
            } else {
                logger.log('debug', 'PUT updateing brand ID: ' + brand._id);
                res.format({
                    /*
                    html: function() {
                        res.render('brands/edit', {
                            title: 'Brand ' + brand._id,
                            "brand": brand.name
                        });
                    },
                    */
                    json: function() {
                        res.json(brand);
                    }
                });
            }
        });
    })
    .delete(function(req, res) {
        Brands.findOneAndRemove({ _id: req.id }, function(err, brand) {
            if (err) {
                logger.log('error', 'DELETE There was a problem deleting the brand from the database: ' + err.errmsg);
                return console.error(err);
            } else {
                logger.log('debug', 'DELETE deleting brand ID: ' + brand._id);
                res.format({
                    /*
                    html: function() {
                        res.redirect("/brands");
                    },
                    */
                    json: function() {
                        res.json({
                            message: 'deleted',
                            item: brand
                        });
                    }
                });
            }
        });
    });

module.exports = router;